import PlusTable from './src/index.vue'

export type { ActionBarButtonsRow, ButtonsCallBackParams, ActionBarProps } from './src/type'

type PlusTableInstance = InstanceType<typeof PlusTable>

export type { PlusTableInstance }

export { PlusTable }
export default PlusTable
