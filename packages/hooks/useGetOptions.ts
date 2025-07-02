import type { Ref } from 'vue'
import { ref, isRef, watch, isReactive } from 'vue'
import {
  isPromise,
  isFunction,
  isArray,
  toRawType,
  isPlainObject
} from '@plus-pro-components/components/utils'
import type { OptionsRow, PlusColumn } from '@plus-pro-components/types'

const throwError = (data: unknown) => {
  if (!isArray(data)) {
    console.error('Uncaught TypeError: ', `options expected Array but got ${toRawType(data)}`)
  }
}

/**
 * 映射options
 * @version v0.1.15
 * @param options
 * @param optionsMap
 * @returns
 */
export const getOptionsByOptionsMap = (options: OptionsRow[], props: PlusColumn): OptionsRow[] => {
  const optionsMap = props.optionsMap || {}
  const valueType = props.valueType

  // 不处理级联，optionsMap不存在处理
  if (valueType === 'cascader' || !isPlainObject(optionsMap)) {
    return options
  }

  const data = options.map(item => {
    const temp = item
    const label = optionsMap?.label || 'label'
    const value = optionsMap?.value || 'value'
    const __origin = {
      [label]: temp[label],
      [value]: temp[value]
    }

    return { ...temp, __origin, label: item[label], value: item[value] }
  })

  return data || []
}

export const useGetOptions = (
  props: PlusColumn
): {
  customOptions: Ref<OptionsRow[]>
  customOptionsIsReady: Ref<boolean>
} => {
  const options = ref<OptionsRow[]>([])
  const optionsIsReady = ref<boolean>(false)

  if (!props.options) {
    options.value = []
    optionsIsReady.value = true
  } else if (isRef(props.options) || isReactive(props.options) || isArray(props.options)) {
    // computed或者数组
    watch(
      () => props.options,
      val => {
        const value = isRef(val) ? (val.value as OptionsRow[]) : (val as OptionsRow[])
        options.value = getOptionsByOptionsMap(value, props)
        optionsIsReady.value = true
      },
      {
        immediate: true,
        deep: true
      }
    )
  } else if (isFunction(props.options)) {
    // 函数或Promise
    const getValue = props.options
    const result = getValue(props)
    // 函数返回一个Promise
    if (isPromise(result)) {
      // eslint-disable-next-line @typescript-eslint/no-extra-semi
      result
        .then((value: OptionsRow[]) => {
          options.value = getOptionsByOptionsMap(value, props)
          optionsIsReady.value = true
          throwError(options.value)
        })
        .catch((err: unknown) => {
          throw err
        })
    } else {
      // 函数
      options.value = getOptionsByOptionsMap(result, props)
      optionsIsReady.value = true
    }
  } else if (isPromise(props.options)) {
    // 本身是一个Promise
    const getValue = props.options
    getValue
      .then(value => {
        options.value = getOptionsByOptionsMap(value, props)
        optionsIsReady.value = true
        throwError(options.value)
      })
      .catch((err: unknown) => {
        throw err
      })
  } else {
    optionsIsReady.value = true
    throwError(props.options)
  }

  return { customOptions: options, customOptionsIsReady: optionsIsReady }
}
