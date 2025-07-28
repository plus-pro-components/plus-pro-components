import type {
  PlusColumn,
  FieldValues,
  PlusColProps,
  PlusRowProps
} from '@plus-pro-components/types'
import type { PlusFormProps } from '@plus-pro-components/components'

export type PlusSearchSelfProps = {
  modelValue?: FieldValues
  defaultValues?: FieldValues
  columns?: PlusColumn[]
  hasFooter?: boolean
  hasReset?: boolean
  hasUnfold?: boolean
  /**
   * 默认是否展开
   * @version 0.1.24
   * @default false
   */
  defaultUnfold?: boolean
  searchText?: string
  resetText?: string
  retractText?: string
  expandText?: string
  searchLoading?: boolean
  inline?: boolean
  showNumber?: number
  labelPosition?: 'left' | 'right' | 'top'
  rowProps?: PlusRowProps
  colProps?: PlusColProps
  /**
   * 搜索是否需要校验 ，默认不需要校验表单
   * @variation v0.1.15
   * @default  false
   */
  needValidate?: boolean
}

export type PlusSearchProps = PlusSearchSelfProps & PlusFormProps

export interface PlusSearchEmits {
  (e: 'update:modelValue', values: FieldValues): void
  (e: 'search', values: FieldValues): void
  (e: 'change', values: FieldValues, column: PlusColumn): void
  (e: 'reset', values: FieldValues): void
  (e: 'collapse', isShowUnfold: boolean): void
}
