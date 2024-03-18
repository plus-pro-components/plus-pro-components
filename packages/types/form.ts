import type { VNode, Ref, ComputedRef } from 'vue'
import type { FormItemProps, ColProps } from 'element-plus'
import type { PlusFormProps } from '@plus-pro-components/components/form'
import type { PropsItemType, PlusColumn } from './plus'
import type { Mutable } from './global'

export {}

/**
 * 所有表单的类型 默认是  input
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
  | 'input'
  | 'text'
  | 'plus-radio'
  | 'plus-date-picker'
  | 'plus-input-tag'
  | undefined

/**
 * 表单项的props
 */
export interface FormColumnProps {
  /**
   * @desc 传递给 PlusForm的配置， 支持所有 el-form的props。值支持对象object。
   */
  formProps?: PropsItemType<PlusFormProps>
  /**
   * @desc 传递给 el-form-item 的配置， 支持所有 el-form-item的props。值支持对象 object，computed，函数和 Promise。
   */
  formItemProps?: PropsItemType<Mutable<FormItemProps>>

  /**
   * @desc 支持类似el-input，el-select等所有表单项的props 以及 表格显示的每行 props。值支持对象 object，computed，函数和 Promise。
   */
  fieldProps?: PropsItemType

  /**
   * @desc 自定义渲染 el-form-item 下的field-item组件。 
   * @example
   * ```ts
   * import { h } from 'vue'
   * import { ElTag } from 'element-plus'
   * import type { PlusColumn } from 'plus-pro-components'

   * const columns:PlusColumn[]= [
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
   * ]
   * 
   * ```
   */
  renderField?: (
    value: FieldValueType,
    onChange: (value: FieldValueType) => void,
    props: PlusColumn
  ) => VNode | string

  /**
   * @desc el-col 的 props
   */
  colProps?: Partial<Mutable<ColProps>>

  /**
   * 表单中单个项目是否需要 label，默认undefined，优先级高于表单的整体 hasLabel
   */
  hasLabel?: boolean | Ref<boolean> | ComputedRef<boolean>

  /**
   * @desc 渲染form表单的label
   * @example
   * ```ts
   * import { ref, h } from 'vue'
   * import { ElButton } from 'element-plus'
   * import type { PlusColumn } from 'plus-pro-components'
   *
   * const columns: PlusColumn[] = [
   *   {
   *    label: '名称',
   *    prop: 'name',
   *    renderLabel:() => 'renderExtra'
   *   },
   *   {
   *    label: '标签',
   *    prop: 'tag',
   *    renderLabel: () => h(ElButton,'tag')
   *   }
   * ]
   *
   * ```
   */
  renderLabel?: (label: string, props: PlusColumn) => VNode | string

  /**
   * @desc  渲染el-form-item 下一行额外的内容
   * @example
   * ```ts
   * import { ref, h } from 'vue'
   * import { ElButton } from 'element-plus'
   * import type { PlusColumn } from 'plus-pro-components'
   *
   * const columns: PlusColumn[] = [
   *   {
   *    label: '名称',
   *    prop: 'name',
   *    renderExtra:() => 'renderExtra'
   *   },
   *   {
   *    label: '标签',
   *    prop: 'tag',
   *    renderExtra: () => h(ElButton,'tag')
   *   }
   * ]
   *
   * ```
   */
  renderExtra?: (column: PlusColumn) => VNode | string

  /**
   * @desc 表单（表格）单个项目的插槽，支持类似el-input，el-select， el-image ，el-link等所有表单（表格）单项的插槽
   * @example
   * ```ts
   * import { ref, h } from 'vue'
   * import { Search } from '@element-plus/icons-vue'
   * import { ElIcon } from 'element-plus'
   * import type { PlusColumn } from 'plus-pro-components'
   *
   * const columns: PlusColumn[] = [
   *  {
   *   label: '名称',
   *   prop: 'name',
   *   fieldSlots: {
   *     suffix: () => h(ElIcon, null, () => h(Search)),
   *     prefix: () => 'prefix',
   *     prepend: () => 'prepend',
   *     append: () => 'append'
   *   }
   *  },
   *  {
   *   label: '链接',
   *   prop: 'place',
   *   valueType: 'link',
   *   linkText: 'link',
   *   fieldSlots: {
   *     default: () => 'prefix'
   *   }
   *  },
   * ]
   *
   * ```
   */
  fieldSlots?: { [slotName: string]: (data?: any) => VNode | string }
}

/**
 * 通用的单个表单值的类型
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
  | string[][]
  | number[][]

/**
 * 通用的整体表单值的类型
 */
export type FieldValues = Record<keyof any, FieldValueType>
