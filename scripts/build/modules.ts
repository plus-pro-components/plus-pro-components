import { resolve } from 'path'
import consola from 'consola'
import { rollup } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import glob from 'fast-glob'
import vuePlugin from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import DefineOptions from 'unplugin-vue-define-options/rollup'
import type { OutputOptions, ModuleFormat } from 'rollup'
import { pcOutput, pcRoot, pkgRoot } from '../utils/paths'
import { writeBundles } from '../utils'
import { externalModules, excludeFiles } from '../utils/main'

const buildConfig = {
  esm: {
    module: 'ESNext',
    format: 'esm',
    ext: 'mjs',
    output: {
      name: 'es',
      path: resolve(pcOutput, 'es')
    }
  },
  cjs: {
    module: 'CommonJS',
    format: 'cjs',
    ext: 'js',
    output: {
      name: 'lib',
      path: resolve(pcOutput, 'lib')
    }
  }
}
const buildConfigEntries = Object.entries(buildConfig)

const buildModules = async () => {
  const input = excludeFiles(
    await glob('**/*.{js,ts,vue}', {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true
    })
  )

  const bundle = await rollup({
    input,
    external: externalModules,
    plugins: [
      DefineOptions(),
      vuePlugin(),
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts']
      }),
      commonjs(),
      esbuild({
        sourceMap: false,
        target: 'es2018',
        loaders: {
          '.vue': 'ts'
        }
      }),
      postcss({
        namedExports: true,
        extract: true,
        plugins: [autoprefixer(), cssnano()]
      })
    ],
    treeshake: false
  })
  await writeBundles(
    bundle,
    buildConfigEntries.map(([module, config]): OutputOptions => {
      return {
        format: config.format as ModuleFormat,
        dir: config.output.path,
        exports: module === 'cjs' ? 'named' : undefined,
        preserveModules: true,
        preserveModulesRoot: pcRoot,
        sourcemap: false,
        entryFileNames: `[name].${config.ext}`
      }
    })
  )
  consola.success('Successfully built into modules!')
}

export default [buildModules()]
