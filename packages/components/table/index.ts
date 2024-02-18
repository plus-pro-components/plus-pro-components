import type { PlusTableProps } from './src/index.vue'
import Table from './src/index.vue'

export type PlusTableInstance = InstanceType<typeof Table>
export * from './src/type'
export type { PlusTableProps }

export const PlusTable = Table
