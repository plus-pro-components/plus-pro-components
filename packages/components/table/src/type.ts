import type { RecordType, PageInfo } from '@plus-pro-components/types'
import type { ComponentSize } from 'element-plus/es/constants'
import type { ElForm, ElFormItem } from 'element-plus'
import type { DefineComponent } from 'vue'

/**
 * 按钮配置项的值的类型
 */
export interface ButtonsNameKeyRow {
  /**
   * 操作文本
   */
  text: string
  /**
   * 操作唯一code
   *
   */
  code?: string | number

  /**
   * 禁用
   */
  disabled?: boolean

  /**
   * @element-plus/icons-vue 的图标名称，对ElButton,ElLink 和ElIcon 组件同时生效
   */
  icon?: DefineComponent
  /**
   * ElButton 和ElIcon 组件对应的props
   */
  props?: RecordType
  /**
   * ElTooltip组件的props， buttonType 为icon 时生效
   */
  tooltipProps?: RecordType
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
  formRefs?: {
    /**
     * 单元格的表单实例
     */
    formInstance: InstanceType<typeof ElForm>
    /**
     * 单元格的表单单项实例
     */
    formItemInstance: InstanceType<typeof ElFormItem>
    /**
     * 获取显示组件实例
     */
    getDisplayItemInstance: () => {
      index: number
      prop: string
      formInstance: InstanceType<typeof ElForm>
      formItemInstance: InstanceType<typeof ElFormItem>
    }
    /**
     * 表格的行索引
     */
    index: number
    /**
     * 表格的列字段
     */
    prop: string
    /**
     * 单元格的表单开启编辑
     * @returns
     */
    startCellEdit: () => void
    /**
     * 单元格的表单停止编辑
     * @returns
     */
    stopCellEdit: () => void
  }[]
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
