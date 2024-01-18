import type { Ref } from 'vue'
import { ref, isRef, watch } from 'vue'
import { isPromise, isFunction, isArray, toRawType } from '@plus-pro-components/components/utils'
import type { OptionsRow, PlusColumn } from '@plus-pro-components/types'

const throwError = (data: unknown) => {
  if (!isArray(data)) {
    console.error('Uncaught TypeError: ', `options expected Array but got ${toRawType(data)}`)
  }
}

export const useGetOptions = (props: PlusColumn): Ref<OptionsRow[]> => {
  const options = ref<OptionsRow[]>([])

  if (!props.options) {
    options.value = []
  } else if (isRef(props.options)) {
    // computed
    watch(
      props.options,
      val => {
        options.value = val
      },
      {
        immediate: true
      }
    )
  } else if (isArray(props.options)) {
    // 数组
    options.value = [...props.options]
  } else if (isFunction(props.options)) {
    // 函数或Promise
    const getValue = props.options as
      | ((props: PlusColumn) => Promise<OptionsRow[]>)
      | ((props: PlusColumn) => OptionsRow[])
    const result = getValue(props)
    // 函数返回一个Promise
    if (isPromise(result)) {
      // eslint-disable-next-line @typescript-eslint/no-extra-semi
      ;(result as Promise<OptionsRow[]>)
        .then((res: OptionsRow[]) => {
          options.value = res
          throwError(options.value)
        })
        .catch((err: unknown) => {
          throw err
        })
    } else {
      // 函数
      options.value = result as OptionsRow[]
    }
  } else if (isPromise(props.options)) {
    // 本身是一个Promise
    const getValue = props.options as Promise<OptionsRow[]>
    getValue
      .then((res: OptionsRow[]) => {
        options.value = res
        throwError(options.value)
      })
      .catch((err: unknown) => {
        throw err
      })
  } else {
    throwError(props.options)
  }

  return options
}
