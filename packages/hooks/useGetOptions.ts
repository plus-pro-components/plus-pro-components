import type { Ref } from 'vue'
import { ref } from 'vue'
import { isPromise, isFunction, isArray, toRawType } from '@plus-pro-components/utils'
import type { OptionsRow, PlusColumn } from '@plus-pro-components/types'
import { cloneDeep } from 'lodash-es'

const throwError = (data: any) => {
  if (!isArray(data)) {
    console.error('Uncaught TypeError: ', `options expected Array but got ${toRawType(data)}`)
  }
}

const useGetOptions = (column: PlusColumn): Ref<OptionsRow[]> => {
  const props = cloneDeep(column)
  const options = ref<OptionsRow[]>([])

  if (!props.options) {
    options.value = []
  } else if (isArray(props.options)) {
    options.value = [...props.options]
  } else if (isFunction(props.options)) {
    const getValue = props.options as any
    const result = getValue(props)
    // 函数返回一个Promise
    if (isPromise(result)) {
      result
        .then((res: OptionsRow[]) => {
          options.value = res
          throwError(options.value)
        })
        .catch((err: any) => {
          throw err
        })
    } else {
      // 函数
      options.value = result
    }
  } else if (isPromise(props.options)) {
    // 本身是一个Promise
    const getValue = props.options as any
    getValue
      .then((res: OptionsRow[]) => {
        options.value = res
        throwError(options.value)
      })
      .catch((err: any) => {
        throw err
      })
  } else {
    throwError(props.options)
  }

  return options
}

export default useGetOptions

/**
 *
 */
