import type { RollupBuild, OutputOptions } from 'rollup'

export function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
  return Promise.all(options.map(option => bundle.write(option)))
}

export function formatBundleFilename(name: string, minify?: boolean, ext?: string) {
  return `${name}${minify ? '.min' : ''}.${ext}`
}

export const PKG_NAME = 'plus-pro-components'

export const PKG_CAMEL_CASE_NAME = 'PlusProComponents'

export const PKG_PREFIX = '@plus-pro-components'

export const PKG_CAMEL_CASE_LOCAL_NAME = 'PlusProComponentsLocale'

export const target = 'es2018'

export const pathRewriter = (id: string) => {
  id = id.replaceAll(`${PKG_PREFIX}/`, `${PKG_NAME}/es/`)
  return id
}
