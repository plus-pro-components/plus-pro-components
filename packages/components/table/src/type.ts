import type { RecordType, PageInfo, Mutable } from '@plus-pro-components/types'
import type { ComponentSize } from 'element-plus/es/constants'
import type {
  ElForm,
  ElFormItem,
  ElMessageBoxOptions,
  ButtonProps,
  LinkProps,
  IconProps,
  ElTooltipProps,
  TableColumnCtx
} from 'element-plus'
import type { DefineComponent, Ref, ComputedRef, AppContext } from 'vue'
import type { Options as SortableOptions } from 'sortablejs'

/**
 * 表格操作栏按钮配置项的值的类型
 */
export interface ActionBarButtonsRow {
  /**
   * 操作文本
   */
  text: string | Ref<string> | ComputedRef<string>
  /**
   * 操作唯一code
   *
   */
  code?: string | number

  /**
   * `@element-plus/icons-vue` 的图标名称，对ElButton,ElLink 和ElIcon 组件同时生效
   */
  icon?: DefineComponent
  /**
   * ElButton,ElLink和ElIcon 组件对应的props
   */
  props?: Partial<Mutable<ButtonProps & LinkProps & IconProps>>
  /**
   * ElTooltip组件的props， type 为icon 时生效
   */
  tooltipProps?: Partial<ElTooltipProps>

  /**
   * 按钮显示的逻辑 默认 true 显示， 不需要显示给 false
   *
   * 可以用来控制权限
   */
  show?:
    | boolean
    | Ref<boolean>
    | ComputedRef<boolean>
    | ((
        row: any,
        index: number,
        button: ActionBarButtonsRow
      ) => boolean | Ref<boolean> | ComputedRef<boolean>)

  /**
   * 操作是不是需要二次确认  默认值为 `false`
   */
  confirm?:
    | boolean
    | {
        /**
         * 默认 `提示`
         */
        title?: string | ((data: ButtonsCallBackParams) => string)
        /**
         * 默认 `确定执行本次操作`
         */
        message?: string | ((data: ButtonsCallBackParams) => string)

        /**
         *  ElMessageBox.confirm 的options
         */
        options?: ElMessageBoxOptions
        /**
         *  ElMessageBox.confirm 的appContext
         */
        appContext?: AppContext | null
      }
}

/**
 * 表格可编辑表单的行form 的参数类型
 */
export interface TableFormRefRow {
  /**
   * 单元格的表单实例
   */
  formInstance: Ref<InstanceType<typeof ElForm>>
  /**
   * 单元格的表单单项实例
   * @deprecated v0.0.1-beta.34
   */
  formItemInstance: Ref<InstanceType<typeof ElFormItem>>
  /**
   * 获取显示组件实例
   */
  getDisplayItemInstance: () => {
    index: number
    prop: string
    formInstance: Ref<InstanceType<typeof ElForm>>
    /**
     * 单元格的表单单项实例
     * @deprecated v0.0.1-beta.34
     */
    formItemInstance: Ref<InstanceType<typeof ElFormItem>>
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
  buttonRow: ActionBarButtonsRow
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
  formRefs?: TableFormRefRow[]
}

/**
 * 操作栏的整体类型
 */
export interface ActionBarProps {
  /**
   * 操作栏名称  默认值为 `'操作栏'`
   *
   */
  label?: string
  /**
   * 操作栏固定   默认值为 `'right'`
   */
  fixed?: string
  /**
   * 显示出来的按钮个数  默认值为 `3`
   */
  showNumber?: number
  /**
   * 操作按钮的类型   默认值为 `'link'`
   */
  type?: 'icon' | 'button' | 'link'
  /**
   * 操作按钮集合   默认值为 `[]`
   */
  buttons?: ActionBarButtonsRow[]
  /**
   * 表格操作栏 el-table-column 的其width   默认值为 `200`
   */
  width?: string | number
  /**
   * 表格操作栏 el-table-column 的其他props   默认值为 `{}`
   */
  actionBarTableColumnProps?: Partial<TableColumnCtx<any>>
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
 * 标题栏
 */
export type TitleBar = Partial<{
  /**
   * 标题  使用title插槽则此配置不生效
   */
  title?: string

  /**
   *  是否需要刷新  默认false
   */
  refresh?: boolean

  /**
   *  是否需要密度控制  默认true
   */
  density?: boolean
  /**
   * 是否需要列设置 默认true
   */
  columnSetting?: boolean | { dragSort?: boolean | Partial<SortableOptions> }

  /**
   * 工具栏 icon 的大小和颜色配置
   */
  icon?: {
    /**
     * icon 的大小  默认 18
     */
    size?: string
    /**
     * icon 的颜色  默认 #606266
     */
    color?: string
  }
}>
