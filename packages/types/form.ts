import type { VNode, Ref, ComputedRef, ExtractPropTypes, CSSProperties } from 'vue'
import type {
  FormItemProps,
  ColProps,
  // 表单
  AutocompleteProps,
  cascaderProps,
  CheckboxGroupProps,
  ColorPickerProps,
  DatePickerProps,
  InputProps,
  InputNumberProps,
  RadioGroupProps,
  RateProps,
  ISelectProps,
  SliderProps,
  SwitchProps,
  TimePickerDefaultProps,
  // 显示
  TextProps,
  ImageProps,
  LinkProps,
  TagProps,
  ProgressProps
} from 'element-plus'
import type { TimeSelectProps } from 'element-plus/es/components/time-select/src/time-select'
import type { PlusFormProps } from '@plus-pro-components/components/form'
import type { PlusRadioProps } from '@plus-pro-components/components/radio'
import type { PlusDatePickerProps } from '@plus-pro-components/components/date-picker'
import type { PlusInputTagProps } from '@plus-pro-components/components/input-tag'
import type { PropsItemType, PlusColumn, OptionsRow } from './plus'
import type { Mutable } from './global'

export {}

/**
 * 级联类型
 */
export type CascaderProps = ExtractPropTypes<typeof cascaderProps>
/**
 * 原生input所有的type类型
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
 */
export type InputType =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'

/**
 * 需要去除或者需要重新定义的类型
 */
export type OmitTypes =
  // 去除的
  | 'modelValue'
  | 'src'
  // 重新定义过的
  | 'autocomplete'
  | 'type'
  | 'loading'
  | 'step'
  | 'format'
  | 'filterMethod'
  | 'id'
  | 'effect'
  | 'height'

/**
 * 表单和现实组件所有字段类型
 */
export type FieldProps = Partial<
  {
    [key: string]: any
    style: CSSProperties
    /**
     * @desc 输入框行数，仅 type 为 'textarea' 时有效
     * @desc 补充element-plus input:type='textarea' 时的ts类型缺失
     */
    rows: number
    autocomplete: string
    /**
     * type 类型
     */
    type:
      | DatePickerProps['type']
      | TextProps['type']
      | LinkProps['type']
      | ProgressProps['type']
      | InputType
      | 'textarea'
    /**
     *@desc `valueType` 为 `img `时是 `"lazy" | "eager"`，其余是`boolean`类型
     */
    loading: SwitchProps['loading'] | ImageProps['loading']
    /**
     * @desc `valueType` 为 `time-select` 时是`string`类型， 其余是`number`类型
     */
    step: SliderProps['step'] | TimeSelectProps['step'] | InputNumberProps['step']
    /**
     *@desc `valueType` 为 `progress` 时是函数类型，其余是字符串类型
     */
    format:
      | DatePickerProps['format']
      | TimePickerDefaultProps['format']
      | TimeSelectProps['format']
      | ProgressProps['format']

    /**
     * @desc `valueType` 为 `cascader` 时是`(node: Node, keyword: string) => boolean`类型
     * @desc `valueType` 为 `select` 时是`() => void`类型
     */
    filterMethod: CascaderProps['filterMethod'] | ISelectProps['filterMethod']
    /**
     * @desc `valueType` 为 `date-picker` 时**可能**是`[string, string]`类型，其余是`string`类型
     */
    id: string | [string, string]
    /**
     * @desc el-select，el-time-select 的 effect
     */
    effect: ISelectProps['effect']
    /**
     * @desc `valueType` 为 `slider` 时是`string`类型，其余是`number`类型
     */
    height: string | number
  } & Mutable<
    // 表单
    Omit<AutocompleteProps, OmitTypes> &
      Omit<CascaderProps, OmitTypes> &
      Omit<CheckboxGroupProps, OmitTypes> &
      Omit<ColorPickerProps, OmitTypes> &
      Omit<DatePickerProps, OmitTypes> &
      Omit<InputProps, OmitTypes> &
      Omit<InputNumberProps, OmitTypes> &
      Omit<RadioGroupProps, OmitTypes> &
      Omit<RateProps, OmitTypes> &
      Omit<ISelectProps, OmitTypes> &
      Omit<SliderProps, OmitTypes> &
      Omit<SwitchProps, OmitTypes> &
      Omit<TimePickerDefaultProps, OmitTypes> &
      Omit<TimeSelectProps, OmitTypes> &
      // 内置组件表单
      Omit<PlusRadioProps, OmitTypes> &
      Omit<PlusDatePickerProps, OmitTypes> &
      Omit<PlusInputTagProps, OmitTypes> &
      // 显示
      Omit<TextProps, OmitTypes> &
      Omit<ImageProps, OmitTypes> &
      Omit<LinkProps, OmitTypes> &
      Omit<TagProps, OmitTypes> &
      Omit<ProgressProps, OmitTypes>
  >
>

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
  formItemProps?: PropsItemType<
    Mutable<FormItemProps> & { [key: string]: any; style?: CSSProperties }
  >

  /**
   * @desc 支持类似el-input，el-select等所有表单项的props 以及 表格显示的每行 props。值支持对象 object，computed，函数和 Promise。
   */
  fieldProps?: PropsItemType<FieldProps>

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

  /**
   *
   * 自定义表单每一项子项的插槽 valueType 为 `checkbox` | `radio` | `select` |`plus-radio` 之一时生效。
   * el-checkbox-group下的，所有el-checkbox的内容整体插槽(即el-checkbox的default插槽)。
   * el-radio-group下的，所有el-checkbox的内容整体插槽(即el-radio的default插槽)。
   * el-select下的，所有el-option的内容整体插槽(即el-option的default插槽)。
   *
   * @see https://element-plus.org/zh-CN/component/checkbox.html#checkbox-slots
   * @see https://element-plus.org/zh-CN/component/radio.html#radio-slots
   * @see https://element-plus.gitee.io/zh-CN/component/select.html#option-slots
   */
  fieldChildrenSlot?: (option?: OptionsRow) => VNode | string
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
