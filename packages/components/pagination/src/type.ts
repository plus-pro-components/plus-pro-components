import type { PageInfo } from '@plus-pro-components/types'

export interface PlusPaginationProps {
  total: number
  show?: boolean
  pageSizeList?: number[]
  modelValue?: PageInfo
}
