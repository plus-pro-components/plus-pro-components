import { resolve } from 'path'
import consola from 'consola'
import { rollup } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import glob from 'fast-glob'
import vuePlugin from 'rollup-plugin-vue'
import type { OutputOptions, ModuleFormat } from 'rollup'
import { ecOutput, ecRoot } from './paths'
import { excludeFiles, writeBundles, external } from './utils'

const buildConfig = {
  esm: {
    module: 'ESNext',
    format: 'esm',
    ext: 'mjs',
    output: {
      name: 'es',
      path: resolve(ecOutput, 'es')
    }
  },
  cjs: {
    module: 'CommonJS',
    format: 'cjs',
    ext: 'js',
    output: {
      name: 'lib',
      path: resolve(ecOutput, 'lib')
    }
  }
}
const buildConfigEntries = Object.entries(buildConfig)

const buildModules = async () => {
  const input = excludeFiles(
    await glob('**/*.{js,ts,vue}', {
      cwd: ecRoot,
      absolute: true,
      onlyFiles: true
    })
  )

  const bundle = await rollup({
    input,
    external: external,
    plugins: [
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
        sourcemap: false,
        preserveModulesRoot: ecRoot,
        entryFileNames: `[name].${config.ext}`
      }
    })
  )
  consola.success('Successfully built into modules!')
}

export default [buildModules()]
