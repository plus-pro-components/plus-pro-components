import type { ElTooltipProps } from 'element-plus'
import type { VNode } from 'vue'
import type { RecordType } from './global'
import type { TableValueType, TableColumnProps } from './table'
import type { FormItemValueType, FormColumnProps } from './form'

export {}

/**
 * 分页参数
 */
export interface PageInfo {
  /**
   * 默认为1
   */
  page: number
  /**
   * 默认为10
   */
  pageSize: number
  /**
   * 总数
   */
  total?: number
}

/**
 *  自定义props类型
 */
export type PropsItemType = RecordType | ((value?: any, row?: any) => RecordType)

/**
 * 选择框类型
 */
export interface OptionsRow {
  label: number | string
  value: number | string
  color?: string
  /**
   * 表单子项的props  如 el-checkbox-group下的el-checkbox的props
   */
  fieldItemProps?: PropsItemType
  children?: OptionsRow[]
}
/**
 * 选择类型
 */
export type OptionsType =
  | OptionsRow[]
  | ((props?: PlusColumn) => OptionsRow[] | Promise<OptionsRow[]>)

export interface CommentType {
  [index: string]: any
  /**
   * 表格表头显示的标题 ；在form 中是 el-form-item的label；在descriptions 是 el-descriptions-item的label；
   */
  label: string
  /**
   * 表格对应列内容的字段名 ；在form 中是 el-input等所有表单项的双向绑定的值；在descriptions 是 el-descriptions-item的值对应的字段；
   */
  prop: string

  /**
   *  表格宽
   */
  width?: string | number
  /**
   *  表格最小宽
   */
  minWidth?: string | number

  /**
   * @desc 当开启时  valueType 为 `FormItemValueType` 其中之一时 表格中显示的是对应的可编辑的表单
   * @default false
   */
  editable?: boolean

  /**
   * @desc 值的类型
   */
  valueType?: TableValueType | FormItemValueType

  /** @desc 在 PlusDescriptions组件中 隐藏 */
  hideInDescriptions?: boolean

  /** @desc 在 PlusForm 组件中隐藏 */
  hideInForm?: boolean

  /** @desc 在 PlusTable 组件中隐藏 */
  hideInTable?: boolean

  /** @desc 在 table的查询表单 中隐藏 */
  hideInSearch?: boolean

  /**
   * 描述行，el-descriptions-item 的props
   */
  descriptionsItemProps?: RecordType

  /**
   * @desc 支持类似el-input，el-select等所有表单项的props 以及 表格显示的每行 props
   */
  fieldProps?: PropsItemType

  /**
   * el-select，el-radio-group，el-checkbox-group 选项 ，支持数组，函数，和Promise
   */
  options?: OptionsType

  /** @desc 展示一个 icon，hover 是展示一些提示信息 */
  tooltip?: ElTooltipProps | string

  /**
   *
   * 自定义渲染表格单行显示内容 需要返回一个 VNode，`render`的优先级最高
   *
   * 示例：
   * ```js
   *import { h } from 'vue'
   *import { ElTag } from 'element-plus'
   *
   * const tableColumns = [
   *  {
   *     label: 'tag',
   *     prop: 'tag',
   *     render: value => {
   *       const item = statusOptions.find(item => item.value === value)
   *        return h(ElTag, { type: item.type }, () => item.label)
   *     }
   *  }
   * ]
   * ```
   */
  render?: (value?: any, row?: RecordType, column?: PlusColumn) => VNode

  /**
   * 自定义渲染单行显示内容 需要返回一个 html字符串，`renderHTML`的优先级低于`render`，高于`valueType`。
   *
   * 注意：renderHTML 内部使用`v-html`渲染，使用时需要保证 html字符串 可信。
   *
   * 示例：
   * ```js
   *  const tableColumns = [
   *    {
   *       label: '自定义',
   *       prop: '',
   *       renderHTML: (_, row) => {
   *         return `
   *          <div>自定义: ${row.number || 0}</div>
   *         `
   *      }
   *    }
   *  ]
   *```
   *
   */
  renderHTML?: (value?: any, row?: RecordType, column?: PlusColumn) => string
}

/**
 * 表格，表单，详情，搜索公共的类型
 */
export interface PlusColumn extends CommentType, TableColumnProps, FormColumnProps {
  /** */
}
