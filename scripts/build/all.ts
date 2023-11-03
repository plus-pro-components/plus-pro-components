import { resolve, basename } from 'path'
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
import glob from 'fast-glob'
import { camelCase, upperFirst } from 'lodash'
import { pcOutput, pcRoot, projPackage, localesRoot } from '../utils/paths'
import {
  writeBundles,
  formatBundleFilename,
  PKG_CAMEL_CASE_NAME,
  PKG_NAME,
  PKG_CAMEL_CASE_LOCAL_NAME,
  target
} from '../utils'
import { external } from '../utils/main'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import banner2 from 'rollup-plugin-banner2'
import { PlusProComponentsAlias } from '../utils/plugin'

const pkg = JSON.parse(fs.readFileSync(projPackage, 'utf-8'))

const banner = `/*! ${PKG_NAME} v${pkg.version} */\n`

const buildAll = async (minify?: boolean) => {
  const plugins = [
    PlusProComponentsAlias(),
    vuePlugin() as Plugin,
    nodeResolve({
      extensions: ['.mjs', '.js', '.json', '.ts']
    }),
    commonjs(),
    banner2(() => banner),
    esbuild({
      sourceMap: false,
      target: target,
      loaders: {
        '.vue': 'ts'
      }
    })
  ]

  if (minify) {
    plugins.push(
      minifyPlugin({
        target: target,
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
        'element-plus': 'ElementPlus',
        'vue-router': 'VueRouter'
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
    ? 'Successfully build compressed umd and esm!'
    : 'Successfully build into umd and esm!'
  consola.success(msg)
}

async function buildLocale(minify: boolean) {
  const files = await glob(`**/*.ts`, {
    cwd: resolve(localesRoot, 'lang'),
    absolute: true
  })
  return Promise.all(
    files.map(async file => {
      const filename = basename(file, '.ts')
      const name = upperFirst(camelCase(filename))

      const bundle = await rollup({
        input: file,
        plugins: [
          esbuild({
            minify,
            sourceMap: false,
            target
          })
        ]
      })
      await writeBundles(bundle, [
        {
          format: 'umd',
          file: resolve(pcOutput, 'locale', formatBundleFilename(filename, minify, 'js')),
          exports: 'default',
          name: `${PKG_CAMEL_CASE_LOCAL_NAME}${name}`,
          sourcemap: false,
          banner
        },
        {
          format: 'esm',
          file: resolve(pcOutput, 'locale', formatBundleFilename(filename, minify, 'mjs')),
          sourcemap: false,
          banner
        }
      ])
    })
  ).then(() => {
    const msg = minify ? 'Successfully build compressed locale!' : 'Successfully build into locale!'
    consola.success(msg)
  })
}

const task = [buildAll(false), buildAll(true), buildLocale(false), buildLocale(true)]

export default task
