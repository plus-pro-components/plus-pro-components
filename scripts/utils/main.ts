import { excludeFiles } from './excludeFiles'

export { excludeFiles }

export const external = ['vue', 'element-plus']

export const externalModules = [
  'element-plus/es/version',
  ...external,
  '@element-plus/icons-vue',
  '@vue/shared',
  'sortablejs',
  'dayjs',
  'lodash-es',
  'vue-router'
]
