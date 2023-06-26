import { excludeFiles } from './excludeFiles'

export { excludeFiles }

export const external = ['vue', 'element-plus']

export const externalModules = [
  ...external,
  '@plus-pro-components/utils',
  '@element-plus/icons-vue',
  'sortablejs'
]
