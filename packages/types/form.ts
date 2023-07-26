import type { VNode } from 'vue'
import type { FormItemProps } from 'element-plus'
import type { PlusSearchProps } from '@plus-pro-components/components/search'
import type { PropsItemType, PlusColumn } from './plus'
import type { Mutable } from './global'

export {}

/**
 * 所有表单的类型 默认是 text
 */
export type FormItemValueType =
  | 'autocomplete'
  | 'cascader'
  | 'checkbox'
  | 'color-picker'
  | 'date-picker'
  | 'input-number'
  | 'radio'
  | 'rate'
  | 'select'
  | 'slider'
  | 'switch'
  | 'time-select'
  | 'textarea'
  | 'text'
  | 'plus-radio'
  | 'plus-date-picker'

/**
 * 表单项的props
 */
export interface FormColumnProps {
  /**
   * @desc 传递给 PlusForm的配置， 支持所有 el-form的props
   */
  formProps?: PropsItemType<PlusSearchProps>
  /**
   * @desc 传递给 el-form-item 的配置， 支持所有 el-form-item的props
   */
  formItemProps?: PropsItemType<Mutable<FormItemProps>>

  /**
   * 自定义渲染   el-form-item 下的field-item组件，自定义渲染同步表单的值的核心方法是调用onChange回调把值传给表单
   * @param props
   * @param onChange
   * @param formItemInstance
   * @returns
   */
  renderFormFieldItem?: (value: any, onChange: (value: any) => void, props: PlusColumn) => VNode
}

/**
 * 单个表单值的类型
 */
export type FieldValueType =
  | string
  | number
  | boolean
  | Date
  | string[]
  | number[]
  | boolean[]
  | Date[]
  | [Date, Date]
  | [number, number]
  | [string, string]
  | null
  | ''

/**
 * 整体表单值的类型
 */
export type FieldValues = Record<string, FieldValueType>
