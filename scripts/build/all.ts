import { resolve } from 'path'
import vuePlugin from '@vitejs/plugin-vue'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import fs from 'fs'
import cssnano from 'cssnano'
import { rollup, Plugin } from 'rollup'
import consola from 'consola'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild, { minify as minifyPlugin } from 'rollup-plugin-esbuild'
import { pcOutput, pcRoot, projPackage } from '../utils/paths'
import { writeBundles, formatBundleFilename, PKG_CAMEL_CASE_NAME, PKG_NAME } from '../utils'
import { external } from '../utils/main'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import banner2 from 'rollup-plugin-banner2'

const buildAll = async (minify?: boolean) => {
  const pkg = JSON.parse(fs.readFileSync(projPackage, 'utf-8'))

  const plugins = [
    vuePlugin() as Plugin,
    nodeResolve({
      extensions: ['.mjs', '.js', '.json', '.ts']
    }),
    commonjs(),
    banner2(() => `/*! ${PKG_NAME} v${pkg.version} */\n`),
    esbuild({
      sourceMap: false,
      target: 'es2018',
      loaders: {
        '.vue': 'ts'
      }
    })
  ]

  if (minify) {
    plugins.push(
      minifyPlugin({
        target: 'es2018',
        sourceMap: false
      })
    )
    plugins.push(
      postcss({
        extract: true,
        plugins: [autoprefixer(), cssnano()]
      })
    )
  } else {
    plugins.push(
      postcss({
        extract: true,
        plugins: [autoprefixer()]
      })
    )
  }

  const bundle = await rollup({
    input: resolve(pcRoot, 'index.ts'),
    plugins,
    external: external,
    treeshake: true
  })

  await writeBundles(bundle, [
    {
      format: 'umd',
      file: resolve(pcOutput, formatBundleFilename('index', minify, 'js')),
      exports: 'named',
      name: PKG_CAMEL_CASE_NAME,
      globals: {
        vue: 'Vue',
        'element-plus': 'ElementPlus'
      },
      sourcemap: false
    },
    {
      format: 'esm',
      file: resolve(pcOutput, formatBundleFilename('index', minify, 'mjs')),
      sourcemap: false
    }
  ])
  const msg = minify
    ? 'Successfully built compressed umd and esm!'
    : 'Successfully built into umd and esm!'
  consola.success(msg)
}

const task = [buildAll(false), buildAll(true)]

export default task
