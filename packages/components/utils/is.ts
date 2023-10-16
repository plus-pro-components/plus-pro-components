/* eslint-disable vue/prefer-import-from-vue */
import { isPlainObject } from '@vue/shared'
export {
  objectToString,
  toTypeString,
  toRawType,
  isArray,
  isMap,
  isSet,
  isDate,
  isRegExp,
  isFunction,
  isString,
  isSymbol,
  isObject,
  isPromise,
  isPlainObject
} from '@vue/shared'

/**
 * 是否是空对象
 * @param val
 * @returns
 */
export const isEmptyObject = (val: any) => isPlainObject(val) && Object.keys(val).length === 0
