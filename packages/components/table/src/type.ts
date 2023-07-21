import type { RecordType, PageInfo } from '@plus-pro-components/types'
import type { ComponentSize } from 'element-plus/es/constants'

/**
 * 按钮配置项的值的类型
 */
export interface ButtonsNameKeyRow {
  /**
   * 操作唯一code
   *
   */
  code?: string | number
  /**
   * 操作按钮国际化文本
   */
  text: string
  /**
   * 禁用
   */
  disabled?: boolean
  /**
   * iconfont 的图标名称
   */
  iconfont?: string
  /**
   * 按钮显示大小
   */
  size?: 'small' | 'default' | 'large'
  /**
   * 权限标识
   */
  perms?: string
  /**
   * 按钮显示类型
   */
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
}

/**
 * 点击按钮回调的参数的类型
 */
export interface ButtonsCallBackParams {
  /**
   * 表格行数据
   */
  row: RecordType
  /**
   * 点击按钮数据
   */
  buttonRow: ButtonsNameKeyRow
  /**
   * 表格索引
   */
  index: number
  /**
   * 按钮点击事件数据
   */
  e: MouseEvent
  /**
   * 可编辑表单的行form
   */
  formRefs?: any
}

/**
 * 按钮配置项的类型
 */
export interface ButtonsNameRow {
  /**
   * 按钮对应的key值
   */
  [key: string]: ButtonsNameKeyRow[]
}

/**
 * 操作栏的整体类型
 */
export interface ActionBarProps {
  /**
   * 是否显示操作栏
   */
  show?: boolean
  /**
   * 操作栏名称 默认 '操作栏'
   */
  label?: string
  /**
   * 操作栏固定  默认固定在 right
   */
  fixed?: string
  /**
   * 操作栏宽度定  默认固定在 200
   */
  optionColumnWidth?: number
  /**
   * 操作栏默认显示数量，多余的隐藏 默认3
   */
  buttonCount?: number
  /**
   * 操作栏按钮的key值
   */
  buttonsName?: ButtonsNameRow
}

/**
 * 表格自身状态
 */
export interface TableState {
  size?: ComponentSize

  /**
   * 分页参数供表格自身使用
   */
  subPageInfo: PageInfo
}

/**
 * 排序回调参数
 */
export type SortParams = { order: string; prop: string; column: RecordType }
