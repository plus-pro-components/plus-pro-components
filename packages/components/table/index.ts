import PlusTable from './src/index.vue'

export type {
  TableConfigRow,
  ButtonsNameRow,
  ButtonsNameKeyRow,
  ButtonsCallBackParams,
  ActionBarProps,
  SortParams
} from './src/type'

type PlusTableInstance = InstanceType<typeof PlusTable>

export type { PlusTableInstance }

export { PlusTable }
export default PlusTable
