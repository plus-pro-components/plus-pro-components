import installer from './defaults'

export * from '@plus-pro-components/components'
export * from '@plus-pro-components/hooks'
export * from '@plus-pro-components/types'
export * from '@plus-pro-components/constants'

export { version } from './version'

export const install = installer.install
export default installer
