export const toTypeString = (value: any) => objectToString.call(value)
export const isArray = Array.isArray
export const isMap = (val: any) => toTypeString(val) === '[object Map]'
export const isSet = (val: any) => toTypeString(val) === '[object Set]'
export const isDate = (val: any) => toTypeString(val) === '[object Date]'
export const isRegExp = (val: any) => toTypeString(val) === '[object RegExp]'
export const isFunction = (val: any) => typeof val === 'function'
export const isString = (val: any) => typeof val === 'string'
export const isSymbol = (val: any) => typeof val === 'symbol'
export const isObject = (val: any) => val !== null && typeof val === 'object'
export const isPromise = (val: any) => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}
export const objectToString = Object.prototype.toString
export const toRawType = (value: any) => {
  return toTypeString(value).slice(8, -1)
}
export const isPlainObject = (val: any) => toTypeString(val) === '[object Object]'
