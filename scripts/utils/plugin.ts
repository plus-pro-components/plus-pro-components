import type { Plugin, OutputOptions } from 'rollup'
import { PKG_NAME, PKG_PREFIX } from './index'

/**
 * 替换 style/*.ts中导入.css/.scss的文件名称后缀。
 * @returns
 */
export function PlusProComponentsAlias(): Plugin {
  const themeChalk = 'theme-chalk'
  const sourceThemeChalk = `${PKG_PREFIX}/${themeChalk}` as const
  const bundleThemeChalk = `${PKG_NAME}/${themeChalk}` as const

  return {
    name: 'plus-pro-components-alias-plugin',
    resolveId(id) {
      if (!id.startsWith(sourceThemeChalk)) return
      return {
        id: id.replaceAll(sourceThemeChalk, bundleThemeChalk),
        external: 'absolute'
      }
    }
  }
}

/**
 *
 * 替换 style/*.ts中导入element-plus外部样式。
 * @returns
 */
export function PlusProComponentsExternal(options: OutputOptions): Plugin {
  const sourceStyle = `@external` as const
  const module = options.format === 'esm' ? 'es' : 'lib'
  const ext = options.format === 'esm' ? '.mjs' : '.js'
  const bundleStyle = `element-plus/${module}/components` as const

  return {
    name: 'plus-pro-components-external-plugin',
    resolveId(id) {
      if (!id.startsWith(sourceStyle)) return
      return {
        id: id.replaceAll(sourceStyle, bundleStyle) + ext,
        external: 'absolute'
      }
    }
  }
}
