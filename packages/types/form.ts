import type { ElFormItem } from 'element-plus'
import type { VNode } from 'vue'
import type { PropsItemType } from './plus'

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
   * @desc 支持所有 el-form的props
   */
  formProps?: PropsItemType
  /**
   * @desc 支持所有 el-form-item的props
   */
  formItemProps?: PropsItemType

  /**
   * 自定义渲染   el-form-item 下的field-item组件
   * @param props
   * @param onChange
   * @param formItemInstance
   * @returns
   */
  renderFormFieldItem?: (
    props: any,
    onChange: (value: any) => void,
    formItemInstance: InstanceType<typeof ElFormItem>
  ) => VNode
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
