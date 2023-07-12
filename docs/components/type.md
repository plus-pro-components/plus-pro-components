# 基础 Ts 类型

## ElementRefType

```ts
/**
 * ref 绑定的元素类型
 */
export type ElementRefType = HTMLElement | null
```

## Timeout

```ts
/**
 * setTimeout 类型
 */
export type Timeout = ReturnType<typeof setTimeout>
```

## Interval

```ts
/**
 * setInterval 类型
 */
export type Interval = ReturnType<typeof setInterval>
```

## RecordType

```ts
/**
 * 普通的对象的泛型
 */
export type RecordType = {
  [index: string]: any
}
```

## Nullable

```ts
/**
 * 允许null的泛型
 */
export type Nullable<T> = T | null
```

## PageInfo

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

## PlusImagePreviewRow

```ts
/**
 * 表格图片预览类型
 */
export interface PlusImagePreviewRow {
  url: string
  name?: string
}
```

## ActionBarProps

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

## TableValueType

```ts
/**
 * 所有表格的类型 默认是 ''
 */
export type TableValueType = 'img' | 'link' | 'money' | 'tag' | 'progress' | 'copy' | 'code' | ''
```

## FormItemValueType

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

```ts
/**
 *  自定义props类型
 */
export type PropsItemType = RecordType | ((value?: any, row?: any) => RecordType)
```

## OptionsRow

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

```ts
/**
 * 选择类型
 */
export type OptionsType =
  | OptionsRow[]
  | ((props?: PlusColumn) => OptionsRow[] | Promise<OptionsRow[]>)
```
