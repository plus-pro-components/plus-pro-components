/**
 * Object.prototype.toString 别名
 */
export const objectToString = Object.prototype.toString

/**
 * 获取类型
 * @param value
 * @returns
 */
export const toTypeString = (value: any) => objectToString.call(value)

/**
 * 拿到类型字符串
 * @param value
 * @returns
 */
export const toRawType = (value: any) => {
  return toTypeString(value).slice(8, -1)
}

/**
 * 判断是否是数组
 */
export const isArray = Array.isArray

/**
 * 判断是否是Map
 * @param val
 * @returns
 */
export const isMap = (val: any) => toTypeString(val) === '[object Map]'

/**
 * 判断是否是Set
 * @param val
 * @returns
 */
export const isSet = (val: any) => toTypeString(val) === '[object Set]'

/**
 * 判断是否是Date
 * @param val
 * @returns
 */
export const isDate = (val: any) => toTypeString(val) === '[object Date]'

/**
 * 判断是否是Reg
 * @param val
 * @returns
 */
export const isRegExp = (val: any) => toTypeString(val) === '[object RegExp]'

/**
 * 判断是否是函数
 * @param val
 * @returns
 */
export const isFunction = (val: any) => typeof val === 'function'

/**
 * 判断是否是字符串
 * @param val
 * @returns
 */
export const isString = (val: any) => typeof val === 'string'

/**
 * 判断是否是Symbol
 * @param val
 * @returns
 */
export const isSymbol = (val: any) => typeof val === 'symbol'

/**
 * 判断是否是boolean
 * @param val
 * @returns
 */
export const isBoolean = (val: any) => typeof val === 'boolean'

/**
 * 判断是否是object
 * @param val
 * @returns
 */
export const isObject = (val: any) => val !== null && typeof val === 'object'

/**
 * 判断是否是Promise
 * @param val
 * @returns
 */
export const isPromise = (val: any) => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

/**
 * 判断是否是 纯对象 object
 * @param val
 * @returns
 */
export const isPlainObject = (val: any) => toTypeString(val) === '[object Object]'

/**
 * 是否是空对象
 * @param val
 * @returns
 */
export const isEmptyObject = (val: any) => isPlainObject(val) && Object.keys(val).length === 0

/**
 * 是否是链接
 * @param url
 * @returns
 */
export function isUrl(url: string) {
  const regex = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  )
  return regex.test(url)
}
