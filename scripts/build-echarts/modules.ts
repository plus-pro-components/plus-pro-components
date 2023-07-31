import { resolve } from 'path'
import consola from 'consola'
import { rollup } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import glob from 'fast-glob'
import vuePlugin from '@vitejs/plugin-vue'
import type { OutputOptions, ModuleFormat, Plugin } from 'rollup'
import { ecOutput, ecRoot } from '../utils/paths'
import { writeBundles, target } from '../utils'
import { external, excludeFiles } from '../utils/echarts'

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
      vuePlugin() as Plugin,
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts']
      }),
      commonjs(),
      esbuild({
        sourceMap: false,
        target: target,
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
