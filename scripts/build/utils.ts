import type { RollupBuild, OutputOptions } from 'rollup'

export const excludeFiles = (files: string[]) => {
  const excludes = [
    'node_modules',
    'test',
    'mock',
    'dist',
    'eslint-config',
    'utils',
    'echarts',
    'play'
  ]
  return files.filter(path => !excludes.some(exclude => path.includes(exclude)))
}

export function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
  return Promise.all(options.map(option => bundle.write(option)))
}

export function formatBundleFilename(name: string, minify?: boolean, ext?: string) {
  return `${name}${minify ? '.min' : ''}.${ext}`
}

export const PKG_NAME = 'plus-pro-components'

export const PKG_CAMEL_CASE_NAME = 'PlusProComponents'

export const PKG_PREFIX = '@plus-pro-components'

export const pathRewriter = (id: string) => {
  id = id.replaceAll(`${PKG_PREFIX}/`, `${PKG_NAME}/es/`)
  return id
}

export const external = ['vue', 'element-plus']
export const externalModules = [
  ...external,
  '@plus-pro-components/utils',
  '@element-plus/icons-vue'
]
