import type { ComputedRef } from 'vue'
import type { PlusImagePreviewRow } from '@plus-pro-components/components/image-preview'

/**
 * 表格表头配置
 */
export interface TableConfigRow {
  /**
   * 表格显示的标题
   */
  label: string
  /**
   * 对应列内容的字段名，也可以使用 property 属性
   */
  prop: string
  /**
   * 对应列的宽度
   */
  width?: number | string
  /**
   * 对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列
   */
  minWidth?: string | number
  /**
   * 特殊格式显示
   */
  valueType?:
    | 'img'
    | 'link'
    | 'date'
    | 'money'
    | 'input'
    | 'custom'
    | 'formatter'
    | 'status'
    | 'is'
    | 'tag'
    | 'progress'
    | 'rate'
    | 'switch'
    | 'copy'
    | 'code'
  /**
   * valueType='link' 时链接的文字
   */
  linkText?: string
  /**
   * format='link' 时链接的Loading 字段 用于下载等耗时操作
   */
  linkLoadingField?: string

  /**
   * format='link' 时点击事件
   */
  click?: (Row: RecordType) => void
  /**
   * 格式化单行显示内容
   */
  formatter?: <T = null | string | number | (string | number)[] | RecordType>(
    cellValue: T,
    Row: RecordType
  ) => any
  /**
   * 排序，默认需要排序
   */
  sortable?: boolean | string
  /**
   * 省略显示
   */
  showOverflowTooltip?: boolean

  /**
   * format='input' 时 `change` 事件
   */
  change?: (value: string, Row: RecordType) => void
  /**
   * 相应格式的参数
   */
  formatProps?: RecordType
  /**
   * 禁用表格的输入框和链接
   */
  disabled?: boolean | ComputedRef<boolean>

  /**
   *  禁止表头过滤 默认`false`
   */
  disableHeaderFilter?: boolean
  /**
   *  format = 'status' 时状态颜色字段  默认取的是表格数据`tableData`的`statusColor`
   */
  // statusColorField?: string
  /**
   * 权限
   */
  perms?: string
  /**
   * 固定
   */
  fixed?: boolean | 'left' | 'right'

  /**
   * 是否必须  用于表头生成表单
   */
  required?: boolean
  /**
   * 表单类型
   */
  type?: 'select' | 'inputNumber' | 'textarea' | 'text'

  attrs?: RecordIndexType
  // switch开关打开颜色
  elSwitchOnColor?: string
  // switch开关关闭颜色
  elSwitchOffColor?: string
  // 自定义文字 颜色的obj
  valueEnum?: Record<
    string,
    {
      text: string
      color: string
    }
  >
}
/**
 * 按钮配置项的值的类型
 */
export interface ButtonsNameKeyRow {
  /**
   * 操作唯一code
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
export interface ButtonsCallBackParams<R = RecordType> {
  /**
   * 表格行数据
   */
  row: R
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
  /**
   * 显示大图预览
   */
  bigImageVisible: boolean
  /**
   * 图片预览列表
   */
  srcList: PlusImagePreviewRow[]
  /**
   * 分页参数供表格自身使用
   */
  subPageInfo: PageInfo
  /**
   * 过滤表头弹窗
   */
  filterTableDialogVisible: boolean
  /**
   * 过滤后的表头配置
   */
  subConfig: TableConfigRow[]
  /**
   * 表头选择项
   */
  checkList: any[]
}

/**
 * 排序回调参数
 */
export type SortParams = { order: string; prop: string; column: RecordType }
