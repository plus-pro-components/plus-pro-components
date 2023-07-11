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
  | 'custom'
  | 'text'

/**
 * 表单项的props
 */
export interface FormColumnProps {
  /**
   * @desc 支持所有 el-form-item的props
   */
  formItemProps?: PropsItemType

  renderFormItem?: (props: any, formItemInstance: InstanceType<typeof ElFormItem>) => VNode
}
