import type { FieldValueType, RecordType, PlusColumn } from '@plus-pro-components/types'
import { cloneDeep, get, set } from 'lodash-es'
import type { SetupContext } from 'vue'
import { isPromise, isFunction, isPlainObject, isEmptyObject, toRawType, isString } from './is'

export * from './format'
export * from './is'

/**
 * 获取table key
 * @param item
 * @returns
 */
export const getTableKey = (item: PlusColumn, hasEditable = false) =>
  hasEditable ? item.label + item.prop + item.editable : item.label + item.prop

/**
 *  获取tooltip
 * @param tooltip
 * @returns
 */
export const getTooltip = (tooltip: PlusColumn['tooltip']) => {
  if (isString(tooltip)) {
    return { content: tooltip }
  }
  if (isPlainObject(tooltip)) {
    return tooltip as RecordType
  }
}

const throwError = (data: any, type: string) => {
  if (!isPlainObject(data)) {
    throw new Error(`${type} expected Object but got ${toRawType(data)}`)
  }
}

/**
 * 获取自定义的props 支持对象 函数 和 Promise
 * @param props
 * @param value
 * @param row
 * @returns
 */
export const getCustomProps = async (
  props:
    | Record<string, any>
    | ((...arg: any) => Record<string, any> | Promise<Record<string, any>>)
    | undefined,
  value: FieldValueType | undefined,
  row: Record<string, any>,
  index: number,
  type: 'formItemProps' | 'fieldProps'
): Promise<any> => {
  try {
    let data: any = {}
    const params = cloneDeep({ row, index })

    if (!props) {
      data = {}
    } else if (isPlainObject(props)) {
      data = { ...props }
    } else if (isFunction(props)) {
      // 函数 和  函数返回一个Promise
      data = await (props as any)(value, params)
    } else if (isPromise(props)) {
      // 本身是一个Promise
      data = await (props as any)
    } else {
      data = props
    }

    throwError(data, type)

    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * 处理slots
 */
export const handleSlots = (
  slots: PlusColumn['slots'],
  value: FieldValueType | undefined,
  params: RecordType
) => {
  /** `
   * `不存在` 或者 `不是对象` 或者  `对象为空 ` 全部返回空对象
   */
  if (!slots || !isPlainObject(slots) || isEmptyObject(slots)) {
    return {}
  }
  const slotsRes: RecordType = {}
  if (slots && !isEmptyObject(slots)) {
    Object.keys(slots).forEach(key => {
      const temp = (...arg: any) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return () => slots[key](...arg)
      }
      slotsRes[key] = temp(value, params)
    })
  }
  return slotsRes
}

/**
 * 处理slot名称
 */
export const getSlotName = (type: string, prop?: string | number) => {
  return prop ? `plus-${type}-${prop}` : `plus-${type}`
}

/**
 * 处理form-item中的slot名称
 */
export const getFieldSlotName = (prop?: string | number) => {
  return `${getSlotName('field', prop)}`
}

/**
 *   处理form-item中的label slot名称
 */
export const getLabelSlotName = (prop?: string | number) => {
  return `${getSlotName('label', prop)}`
}
/**
 *   处理form-item中的 extra slot名称
 */
export const getExtraSlotName = (prop?: string | number) => {
  return `${getSlotName('extra', prop)}`
}

/**
 * 处理table中的 header slot名称
 */
export const getTableHeaderSlotName = (prop?: string | number) => {
  return `${getSlotName('header', prop)}`
}

/**
 * 处理table中的 cell slot名称
 */
export const getTableCellSlotName = (prop?: string | number) => {
  return `${getSlotName('cell', prop)}`
}

/**
 * 过滤slots
 * @param slots
 * @param name
 * @returns
 */
export const filterSlots = (slots: RecordType, name: string): SetupContext['slots'] => {
  const data: Record<string, any> = {}
  Object.keys(slots || {}).forEach(key => {
    if (key.startsWith(name)) {
      data[key] = slots[key]
    }
  })

  return data
}

/**
 *  获取值  支持 x.y.z
 * @param target
 * @param key
 * @returns
 */
export const getValue = (target: RecordType, key: string) => {
  return get(target, key)
}

/**
 *  设置值  支持 x.y.z
 * @param target
 * @param key
 * @returns
 */
export const setValue = (target: RecordType, key: string, value: any) => {
  return set(target, key, value)
}
