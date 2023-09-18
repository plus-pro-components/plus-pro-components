import type { ComponentResolver, SideEffectsInfo, ComponentInfo } from 'unplugin-vue-components'

function kebabCase(key: string) {
  const result = key.replace(/([A-Z])/g, ' $1').trim()
  return result.split(' ').join('-').toLowerCase()
}

export interface PlusProComponentsResolverOptions {
  /**
   * @default false
   */
  ssr?: boolean
  /**
   * import style css or less with components
   *
   * @default 'css'
   */
  importStyle?: boolean | 'css' | 'scss'

  /**
   * exclude component name, if match do not resolve the name
   */
  exclude?: RegExp

  /**
   * a list of component names that have no styles, so resolving their styles file should be prevented
   */
  noStylesComponents?: string[]
}

function getSideEffects(
  name: string,
  options: PlusProComponentsResolverOptions,
  module: 'es' | 'lib'
): SideEffectsInfo | undefined {
  const { importStyle } = options
  const componentsFolder = `plus-pro-components/${module}`

  const filename = kebabCase(name)
  const noPrefixFilename = filename.replace('plus-', '')

  if (importStyle === 'scss') {
    return `${componentsFolder}/${noPrefixFilename}/style/index`
  } else if (importStyle === 'css') {
    return `${componentsFolder}/${noPrefixFilename}/style/css`
  }
}

function resolveComponent(
  name: string,
  options: PlusProComponentsResolverOptions
): ComponentInfo | undefined {
  /**
   * exclude
   */
  if (options.exclude && name.match(options.exclude)) return
  /**
   * Exclusion of non-compliance with the plus-pro-components naming convention
   */
  if (!name.match(/^Plus[A-Z]/)) return

  /**
   * module
   */
  const module = options.ssr ? 'lib' : 'es'

  return {
    name,
    from: `plus-pro-components/${module}`,
    sideEffects: getSideEffects(name, options, module)
  }
}

export function PlusProComponentsResolver(
  options: PlusProComponentsResolverOptions = {}
): ComponentResolver {
  let optionsResolved: PlusProComponentsResolverOptions
  function resolveOptions() {
    if (optionsResolved) return optionsResolved
    optionsResolved = {
      importStyle: 'css',
      ssr: false,
      exclude: undefined,
      noStylesComponents: options.noStylesComponents || [],
      ...options
    }
    return optionsResolved
  }

  return (name: string) => {
    const options = resolveOptions()
    if ([...(options.noStylesComponents as string[])].includes(name)) {
      /**
       * Components without styles, importStyle default is `false`
       */
      return resolveComponent(name, { ...options, importStyle: false })
    } else {
      return resolveComponent(name, options)
    }
  }
}
