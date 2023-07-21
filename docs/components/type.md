# 基础 Ts 类型

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
  /**
   * 总数
   */
  total?: number
}
```

## ActionBarProps

表格操作栏数据类型

```ts
/**
 * 表格操作栏数据类型
 */
export interface PlusTableActionBarProps {
  show?: boolean
  buttonCount?: number
  buttonType?: 'icon' | 'button' | 'link'
  buttonsName?: Partial<ButtonsNameRow>
  optionColumnWidth?: number
  /**
   * 表格操作栏 el-table-column 的其他props
   */
  actionBarProps?: RecordType
}
```

## ButtonsCallBackParams

表格点击按钮回调的参数的类型

```ts
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
```

## TableValueType

所有表格列显示的类型 默认是 ''

```ts
/**
 * 所有表格列显示的类型 默认是 ''
 */
export type TableValueType = 'img' | 'link' | 'money' | 'tag' | 'progress' | 'copy' | 'code' | ''
```

## FormItemValueType

所有表单的类型 默认是 text

```ts
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
  | 'time-select'
  | 'textarea'
  | 'text'
```

## PropsItemType

自定义 props 类型

```ts
/**
 *  自定义props类型
 */
export type PropsItemType = RecordType | ((value?: any, row?: any) => RecordType)
```

## OptionsRow

选择框类型

```ts
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
}
```

## OptionsType

选择类型

```ts
/**
 * 选择类型
 */
export type OptionsType =
  | OptionsRow[]
  | ((props?: PlusColumn) => OptionsRow[] | Promise<OptionsRow[]>)
```
