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
 * 普通的对象的泛型
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
import type { DefineComponent, Ref, ComputedRef } from 'vue'
import type { RecordType, ButtonsCallBackParams } from 'plus-pro-components'
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
   * 禁用
   */
  disabled?: boolean

  /**
   * `@element-plus/icons-vue` 的图标名称，对ElButton,ElLink 和ElIcon 组件同时生效
   */
  icon?: DefineComponent
  /**
   * ElButton,ElLink和ElIcon 组件对应的props
   */
  props?: RecordType
  /**
   * ElTooltip组件的props， type 为icon 时生效
   */
  tooltipProps?: RecordType

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
      }
}
```

## ActionBarProps

表格操作栏数据类型

```ts
import type { ActionBarButtonsRow } from 'plus-pro-components'

/**
 * 表格操作栏数据类型
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
  actionBarTableColumnProps?: Partial<import('element-plus')['TableColumnCtx']>
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
   * 单元格的表单单项实例
   */
  formItemInstance: Ref<InstanceType<typeof ElFormItem>>
  /**
   * 获取显示组件实例
   */
  getDisplayItemInstance: () => {
    index: number
    prop: string
    formInstance: Ref<InstanceType<typeof ElForm>>
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
```

## ButtonsCallBackParams

表格点击按钮回调的参数的类型

```ts
import type { RecordType, buttonsKeyRow, TableFormRefRow } from 'plus-pro-components'

/**
 * 表格点击按钮回调的参数的类型
 */
export interface ButtonsCallBackParams {
  /**
   * 表格行数据
   */
  row: RecordType
  /**
   * 点击按钮数据
   */
  buttonRow: buttonsKeyRow
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
  | undefined
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
  | undefined
```

## FieldValueType

单个表单值的类型

```ts
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
import type { FieldValueType } from 'plus-pro-components'
/**
 *  自定义props类型  支持对象object ，函数，Promise
 */
export type PropsItemType<T extends Record<string, any> = any> =
  | Partial<T>
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
import type { PropsItemType } from 'plus-pro-components'
/**
 * 选择框类型
 */
export interface OptionsRow {
  label: number | string
  value: number | string
  /**
   * 小圆点背景色，
   * color 优先级 高于 type
   */
  color?: string
  /**
   * 小圆点背景色，
   * type 优先级 低于 color，
   * 支持 'success' | 'warning' | 'info' | 'primary' | 'danger'
   */
  type?: 'success' | 'warning' | 'info' | 'primary' | 'danger'
  /**
   * 表单子项的props  如 el-checkbox-group下的el-checkbox的props
   */
  fieldItemProps?: PropsItemType
}
```

## OptionsType

选择类型 支持数组，函数和 Promise

```ts
import type { OptionsRow } from 'plus-pro-components'
/**
 * 选择类型
 */
 */
export type OptionsType =
  | OptionsRow[]
  | ((props?: PlusColumn) => OptionsRow[] | Promise<OptionsRow[]>)
  | Promise<OptionsRow[]>
```

## PlusFormGroupRow

```ts
import type { DefineComponent } from 'vue'
import type { PlusColumn } from 'plus-pro-components'

/**
 * 分组表单配置项
 */
export interface PlusFormGroupRow {
  title: string
  icon?: DefineComponent
  columns: PlusColumn[]
}
```

## PlusStepFrom

```ts
import type { Component } from 'vue'
import type { PlusFormProps } from 'plus-pro-components'

/**
 * 分步表单配置项
 */
export interface PlusStepFrom {
  title: string
  description?: string
  icon?: string | Component
  status?: '' | 'wait' | 'process' | 'finish' | 'error' | 'success'
  form: PlusFormProps
}
```

## TitleBar

表格标题栏

```ts
/**
 * 标题栏
 */
export type TitleBar = {
  /**
   * 标题   使用title插槽则此配置不生效
   */
  title?: string

  /**
   *  是否需要密度控制  默认true
   */
  density?: boolean

  /**
   * 是否需要列设置 默认true
   */
  columnSetting?: boolean
}
```
