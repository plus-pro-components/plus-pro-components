import { isPromise, isFunction, isPlainObject } from './is'

/**
 * 获取自定义的props 支持对象 函数 和 Promise
 * @param props
 * @param value
 * @param row
 * @returns
 */
export const getCustomProps = async (
  props: any,
  value: any,
  row: any,
  index: number
): Promise<any> => {
  try {
    let data: any = {}

    if (isPromise(props)) {
      const getValue = props as any
      data = await getValue(value, row, index)
    } else if (isFunction(props)) {
      const getValue = props as any
      data = getValue(value, row, index) || {}
    } else if (isPlainObject(props)) {
      data = { ...props }
    } else {
      data = {}
    }

    return data
  } catch (error) {
    return Promise.reject(error)
  }
}
