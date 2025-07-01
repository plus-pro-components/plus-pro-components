# 基础 Ts 类型

::: tip 提示

本页面类型会互相引用，请注意上下文!

:::

## ElementRefType

ref 绑定的元素类型

```ts
/**
 * ref 绑定的元素类型
 */
export type ElementRefType = HTMLElement | null
```

## Timeout

setTimeout 类型

```ts
/**
 * setTimeout 类型
 */
export type Timeout = ReturnType<typeof setTimeout>
```

## Interval

setInterval 类型

```ts
/**
 * setInterval 类型
 */
export type Interval = ReturnType<typeof setInterval>
```

## RecordType

普通的对象的泛型

```ts
/**
 * 普通的对象的类型
 */
export type RecordType = {
  [index: string]: any
}
```

## Nullable

允许 null 的泛型

```ts
/**
 * 允许null的泛型
 */
export type Nullable<T> = T | null
```

## Mutable

去除只读状态

```ts
/**
 * 去除只读状态
 */
export type Mutable<T extends Record<string, any>> = {
  -readonly [K in keyof T]: T[K]
}
```

## PageInfo

分页参数

```ts
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
}
```

## ActionBarButtonsRow

表格操作栏按钮配置项的值的类型

```ts
import type { ElMessageBoxOptions } from 'element-plus'
import type { Component, Ref, ComputedRef, AppContext, DirectiveArguments } from 'vue'
import type { RecordType, ButtonsCallBackParams } from 'plus-pro-components'

/**
 * 按钮属性的类型
 */
export type ButtonRowProps = Partial<
  Mutable<ButtonProps & LinkProps & IconProps & { [index: string]: any }>
>

/**
 * 表格操作栏按钮配置项的值的类型
 */
export interface ActionBarButtonsRow {
  /**
   * 操作文本
   * @version v0.0.8 新增函数类型
   */
  text:
    | string
    | Ref<string>
    | ComputedRef<string>
    | ((
        row: any,
        index: number,
        button: ActionBarButtonsRow
      ) => string | Ref<string> | ComputedRef<string>)
  /**
   * 操作按钮唯一code，可用来判断按钮类型
   */
  code?: string | number

  /**
   * `@element-plus/icons-vue` 的图标名称，对ElButton,ElLink 和ElIcon 组件同时生效
   */
  icon?: Component
  /**
   * ElButton,ElLink和ElIcon 组件对应的props
   *  @version v0.1.16 新增函数类型和计算属性
   */
  props?:
    | ButtonRowProps
    | ((row: any, index: number, button: ActionBarButtonsRow) => ButtonRowProps)
    | ComputedRef<ButtonRowProps>
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
         * ElMessageBox.confirm 的title  默认 `提示`
         */
        title?: string | ((data: ButtonsCallBackParams) => string)
        /**
         * ElMessageBox.confirm  的message  默认 `确定执行本次操作`
         *
         * @version v0.1.17 新增   当ActionBarProps.confirmType为 `popconfirm` 时 ， 版本中 message 会作为 ElPopconfirm 的title
         */
        message?: string | ((data: ButtonsCallBackParams) => string)

        /**
         *  ElMessageBox.confirm 的options
         */
        options?: ElMessageBoxOptions

        /**
         * ElPopconfirm的props
         *
         * 当ActionBarProps.confirmType为 `popconfirm` 时生效
         * @version v0.1.17
         * @see https://element-plus.org/zh-CN/component/popconfirm.html#attributes
         */
        popconfirmProps?: Partial<Mutable<PopconfirmProps>>
        /**
         *  ElMessageBox.confirm 的appContext
         */
        appContext?: AppContext | null
      }

  /**
   * 指令，可以用来控制权限，数据类型是二维数组
   * @version v0.1.7
   * @see https://cn.vuejs.org/guide/extras/render-function.html#custom-directives
   *
   */
  directives?: DirectiveArguments

  /**
   * 点击当前按钮时触发，可与PlusTable的事件 `clickAction`  同时触发；
   * 操作需要二次确认时：PlusTable的事件 `clickAction`会在确认时触发，而当前的onClick是在点击时触发；
   * @version v0.1.8
   * @param params
   * @returns
   */
  onClick?: (params: ButtonsCallBackParams) => void
  /**
   * 操作需要二次确认时，点击确认时触发
   * @version v0.1.8
   * @param params
   * @returns
   */
  onConfirm?: (params: ButtonsCallBackParams) => void
  /**
   * 操作需要二次确认时，点击取消时触发， 可与PlusTable的事件 `clickActionConfirmCancel`  同时触发
   * @version v0.1.8
   * @param params
   * @returns
   */
  onCancel?: (params: ButtonsCallBackParams) => void
}
```

## ActionBarProps

表格操作栏数据类型

```ts
import type { ComputedRef } from 'vue'
import type { ActionBarButtonsRow } from 'plus-pro-components'

/**
 * 表格操作栏数据类型
 */
export interface ActionBarProps {
  /**
   * 操作栏名称  默认值为 `'操作栏'`
   *
   * @version v0.1.0 类型新增ComputedRef<string>
   */
  label?: string | ComputedRef<string>
  /**
   * 操作栏固定   默认值为 `'right'`
   */
  fixed?: string
  /**
   * 显示出来的按钮个数  默认值为 `3`
   * @version 0.1.23 新增函数类型
   * @default 3
   */
  showNumber?: number | ((row: RecordType, index: number) => number)
  /**
   * 更多按钮展示策略
   * true时,showNumber限制的包括更多按钮在内,即包括更多按钮在内,总按钮个数为showNumber
   * false时,showNumber限制的不包括更多按钮在内，即总按钮个数为showNumber+1,+1是因为'更多'按钮不在showNumber的限制内
   * @default false
   * @version v0.1.20
   */
  showLimitIncludeMore?: boolean
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
  actionBarTableColumnProps?: Partial<import('element-plus')['TableColumnCtx']>

  /**
   * 表格操作栏 需要二次确认的类型，默认是 messageBox
   * @version v0.1.17
   */
  confirmType?: 'messageBox' | 'popconfirm'
}
```

## TableFormRefRow

表格可编辑表单的行 form 的参数类型

```ts
import { ElForm, ElFormItem } from 'element-plus'
import type { Ref } from 'vue'

/**
 * 表格可编辑表单的行form 的参数类型
 */
export interface TableFormRefRow {
  /**
   * 单元格的表单实例
   */
  formInstance: Ref<InstanceType<typeof ElForm>>

  /**
   * 表格的行索引
   */
  index: number

  /**
   * 表格的行索引, 同 index
   * @version 0.1.20
   */
  rowIndex: number

  /**
   * 单元格的列索引
   *  @version 0.1.20
   */
  cellIndex: number

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

  /**
   *  当前单元格是否可编辑
   * @version v0.1.8
   */
  isEdit: Ref<boolean>
}
```

## TableCellParams

表格单元格回调参数

```ts
import type { RecordType } from 'plus-pro-components'

/**
 * 表格单元格回调参数
 */
export type TableCellParams = {
  /**
   * 表格行数据
   */
  row: RecordType

  /**
   * 表格行索引
   */
  index: number

  /**
   * 表格列数据
   */
  column?: RecordType
  /**
   * 表格行索引 同 index
   * @version v0.1.7
   */
  rowIndex: number
  /**
   * 表格列索引
   * @version v0.1.7
   */
  cellIndex: number
  /**
   * 表格store
   * @version v0.1.7
   */
  store: RecordType
  /**
   * 表格 expanded
   * @version v0.1.7
   */
  expanded: boolean
  /**
   * 表格  _self
   * @version v0.1.7
   */
  _self: RecordType
}
```

## ButtonsCallBackParams

表格点击按钮回调的参数的类型

```ts
import type { TableFormRefRow, TableCellParams, ActionBarButtonsRow } from 'plus-pro-components'

/**
 * 点击按钮回调的参数的类型
 */
export interface ButtonsCallBackParams extends TableCellParams {
  /**
   * 点击按钮数据
   */
  buttonRow: ActionBarButtonsRow

  /**
   * 解析后的按钮数据中的text
   * @version v0.1.17
   */
  text: string

  /**
   * 按钮点击事件数据
   */
  e: MouseEvent
  /**
   * 可编辑表单的行form
   */
  formRefs?: TableFormRefRow[]
}
```

## FormChangeCallBackParams

表格表单回调参数

```ts
import type { FieldValueType, TableCellParams } from 'plus-pro-components'

/**
 * formChange回调的参数的类型
 */
export interface FormChangeCallBackParams extends TableCellParams {
  /**
   * 表单的值
   */
  value: FieldValueType
  /**
   * 当前单元格的prop
   */
  prop: string
}
```

## TableValueType

所有表格列显示的类型 默认是 `undefined`

```ts
/**
 * 所有表格列显示的类型 默认是 `undefined`
 */
export type TableValueType =
  | 'img'
  | 'link'
  | 'money'
  | 'tag'
  | 'progress'
  | 'copy'
  | 'code'
  // v0.1.0 新增
  | 'divider'
  // v0.1.0 新增
  | 'avatar'
  | ''
```

## FormItemValueType

所有表单的类型 默认是 `input` (`undefined`)

```ts
/**
 * 所有表单的类型 默认是 `input` (`undefined`)
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
  /**
   * @version 0.1.1 新增
   */
  | 'transfer'
  /**
   * @version 0.1.1 新增
   */
  | 'tree-select'
  /**
   * @version 0.1.21 新增
   */
  | 'select-v2'
  | undefined
```

## FieldValueType

单个表单值的类型

```ts
import type { RecordType } from 'plus-pro-components'

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
  // v0.1.7 新增
  | RecordType
```

## FieldValues

整体表单值的类型

```ts
import type { FieldValueType } from 'plus-pro-components'

/**
 * 整体表单值的类型
 */
export type FieldValues = Record<string, FieldValueType>
```

## PropsItemType

自定义 props 类型

```ts
import type { ComputedRef } from 'vue'
import type { FieldValueType } from 'plus-pro-components'
/**
 *  自定义props类型  值支持对象 object，computed，函数和 Promise。
 */
export type PropsItemType<T extends Record<string, any> = any> =
  | Partial<T>
  | ComputedRef<Partial<T>>
  | ((
      value: FieldValueType,
      data: {
        row: Record<string, any>
        index: number
      }
    ) => Partial<T> | Promise<Partial<T>>)
  | Promise<Partial<T>>
```

## OptionsRow

选择框类型

```ts
import type { PropsItemType, RecordType } from 'plus-pro-components'
import type { ButtonType } from 'element-plus'
import type { VNode } from 'vue'
/**
 * 选择框类型
 */
export interface OptionsRow<T = undefined> {
  /**
   * @version v0.1.15 新增索引类型，用来支持optionsMap @see /components/config.html
   */
  [index: keyof any]: any
  /**
   * @version v0.1.15 变更为可选，用来支持optionsMap @see /components/config.html
   */
  label?: number | string
  /**
   * @version v0.1.7 新增 RecordType 类型
   * @version v0.1.15 变更为可选，用来支持optionsMap @see /components/config.html
   */
  value?: Exclude<number | string | boolean | RecordType, T>
  /**
   * 小圆点背景色，仅在表格和描述列表中生效
   * color 优先级 高于 type
   */
  color?: string
  /**
   * 小圆点颜色类型，仅在表格和描述列表中生效
   * type 优先级 低于 color，
   * 只支持 'success' | 'warning' | 'info' | 'primary' | 'danger'
   */
  type?: Exclude<ButtonType, 'default' | 'text' | ''>
  /**
   * 表单子项的props  如 el-checkbox-group下的el-checkbox的props
   * @version v0.1.25 新增函数类型支持 ((item: OptionsRow) => RecordType)
   */
  fieldItemProps?: RecordType | ((item: OptionsRow) => RecordType)
  /**
   * el-checkbox-group下的，每一项el-checkbox的各自插槽(即el-checkbox的default插槽)。
   * el-radio-group下的，每一项el-checkbox的内容各自插槽(即el-radio的default插槽)。
   * el-select下的，每一项el-option的内容整体插槽(即el-option的default插槽)。
   *
   * @see https://element-plus.org/zh-CN/component/checkbox.html#checkbox-slots
   * @see https://element-plus.org/zh-CN/component/radio.html#radio-slots
   */
  fieldSlot?: (option?: OptionsRow) => RenderTypes
  /**
   * 子选项，仅valueType 为 `cascader` 时生效
   */
  children?: OptionsRow[]
}
```

## OptionsType

选择类型

```ts
import type { OptionsRow } from 'plus-pro-components'
/**
 * 选择类型   支持数组，computed，函数和Promise
 */
 */
export type OptionsType =
  | OptionsRow[]
  | ComputedRef<OptionsRow[]>
  | ((props?: PlusColumn) => OptionsRow[] | Promise<OptionsRow[]>)
  | Promise<OptionsRow[]>
```

## PlusFormGroupRow

分步表单配置项

```ts
import type { Component, ComputedRef } from 'vue'
import type { PlusColumn, Mutable } from 'plus-pro-components'
import type { CardProps } from  from 'element-plus'

/**
 * 分组表单配置项
 */
export interface PlusFormGroupRow {
  /**
   * 分组标题
   * @version v0.1.17  新增 ComputedRef<string> 类型
   */
  title: string | ComputedRef<string>
  icon?: Component
  /**
   * @desc 分组表单el-card的props，优先级高于整体的cardProps
   * @version v0.1.1
   */
  cardProps?: Partial<Mutable<CardProps>>
  /**
   * @desc 分组表单隐藏显示Group, 默认值 false(显示状态)
   * @version v0.1.4
   */
  hideInGroup?: boolean | ComputedRef<boolean>
  columns: PlusColumn[]
}
```

## PlusStepFromRow

<el-tag>v0.1.8</el-tag>

分步表单配置项

```ts
import type { Component } from 'vue'
import type { PlusFormProps } from 'plus-pro-components'

/**
 * 分步表单配置项
 */
export interface PlusStepFromRow {
  title: string

  /**
   * @version 0.1.22 变更为可选
   */
  form: PlusFormProps
  description?: string
  icon?: string | Component
  status?: '' | 'wait' | 'process' | 'finish' | 'error' | 'success'
}
```

## TitleBar

表格标题栏

```ts
import type { Options as SortableOptions } from 'sortablejs'
import type { LinkProps } from 'element-plus'
import type { Mutable } from 'element-plus/es/utils'

export type ColumnSetting = {
  dragSort?: boolean | Partial<SortableOptions>
  /**
   * 列设置是否需要重置按钮，当值为对象时是el-link按钮的props
   * @version v0.1.20
   * @default true
   */
  reset?: boolean | Partial<Mutable<LinkProps>>
  /**
   * 列设置popover的宽度
   * @version v0.1.23
   * @default 100
   */
  popoverWidth?: number | string
  /**
   * 列设置 checkbox label 隐藏的长度
   *  @version v0.1.23
   * @default 6
   */
  overflowLabelLength?: number
}

/**
 * 标题栏
 */
export type TitleBar = {
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
  columnSetting?: boolean | ColumnSetting

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
}
```

## PlusRouteRecordRaw

扩展的路由类型

```ts
import type { RouteRecordRaw } from 'vue-router'
import type { VNode, Component } from 'vue'
/**
 * 路由配置类型
 *
 * @description 继承自 vue-router 的 RouteRecordRaw，无侵入，仅仅只扩展 meta，meta除了扩展的属性外，同时支持添加任意自定义属性，
 * 外链的话  path给   '/'+链接   例： `/https://element-plus.org`
 *
 */
export type PlusRouteRecordRaw = Partial<Omit<RouteRecordRaw, 'children'>> & {
  /**
   * meta除了扩展的属性外，同时支持添加任意自定义属性
   *
   */
  meta?: {
    /**
     * 页面标题   标题存在面包屑和菜单名称显示标题  不存在显示路由的 name  name不存在显示路由的 path
     */
    title?: string
    /**
     * 图标
     */
    icon?: Component | VNode | ((route: PlusRouteRecordRaw) => VNode)
    /**
     * 排序，默认为0 只对第一级有效
     */
    sort?: number
    /**
     * 在侧边栏菜单中隐藏，默认false 不隐藏
     */
    hideInMenu?: boolean
    /**
     * 隐藏面包屑，默认false 不隐藏
     */
    hideInBreadcrumb?: boolean
    /**
     * 菜单是否禁用
     * @see https://element-plus.org/zh-CN/component/menu.html#menu-item-attributes
     */
    disabled?: boolean
  }
  children?: PlusRouteRecordRaw[]
}
```
