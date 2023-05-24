/**
 * ref 绑定的元素类型
 */
declare type ElementRefType = HTMLElement | null

/**
 * setTimeout 类型
 */
declare type Timeout = ReturnType<typeof setTimeout>

/**
 * setInterval 类型
 */
declare type Interval = ReturnType<typeof setInterval>

/**
 * 普通的对象的泛型
 */
declare type RecordType<T = any> = Record<string, T>

/**
 * 带签名的对象的泛型
 */
declare type RecordIndexType<T = any> = {
  [index: string]: T
}

/**
 * 允许null的泛型
 */
declare type Nullable<T> = T | null

/**
 * 分页参数
 */
declare interface PageInfo {
  /**
   * 默认为1
   */
  page: number
  /**
   * 默认为10
   */
  pageSize: number
}

/**
 * 选择框类型
 */
declare interface OptionsRaw {
  label: number | string
  value: number | string
  color?: string
}
