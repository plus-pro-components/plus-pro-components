import type { VNode, Component } from 'vue'
import type { FormItemProps, ColProps } from 'element-plus'
import type { PlusFormProps } from '@plus-pro-components/components/form'
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
  | 'time-picker'
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
   * @desc 传递给 PlusForm的配置， 支持所有 el-form的props。值支持对象object。
   */
  formProps?: PropsItemType<PlusFormProps>
  /**
   * @desc 传递给 el-form-item 的配置， 支持所有 el-form-item的props。值支持对象object，函数和 Promise。
   */
  formItemProps?: PropsItemType<Mutable<FormItemProps>>

  /**
   * @desc 支持类似el-input，el-select等所有表单项的props 以及 表格显示的每行 props。值支持对象object，函数和 Promise。
   */
  fieldProps?: PropsItemType

  /**
   * 自定义渲染 el-form-item 下的field-item组件。
   * @param props
   * @param onChange
   * @param formItemInstance
   * @returns
   * 示例：
   * ```js
   *import { h } from 'vue'
   *import { ElTag } from 'element-plus'
   *
   *const columns = [
   *  {
   *    label: '自定义el-input',
   *    prop: 'elData',
   *    fieldProps: {
   *     // 优先级低于 renderField 的props
   *      placeholder: '请输入'
   *    },
   *     renderField: (value, onChange) => {
   *        return h(ElInput as any, {
   *         // 优先级高于 fieldProps
   *           placeholder: '请输入自定义el-input',
   *           type: 'textarea',
   *           onChange
   *      })
   *  }
   *]
   * ```
   */
  renderField?: (
    value: FieldValueType,
    onChange: (value: FieldValueType) => void,
    props: PlusColumn
  ) => VNode | Component | string
  /**
   * @desc el-col 的 props
   */
  colProps?: Partial<Mutable<ColProps>>
}

/**
 * 单个表单值的类型
 */
export type FieldValueType =
  | string
  | number
  | boolean
  | null
  | undefined
  | Date
  | string[]
  | number[]
  | boolean[]
  | Date[]
  | [Date, Date]
  | [number, number]
  | [string, string]

/**
 * 整体表单值的类型
 */
export type FieldValues = Record<string, FieldValueType>
