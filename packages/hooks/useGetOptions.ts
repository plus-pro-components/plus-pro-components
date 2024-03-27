import type { Ref } from 'vue'
import { ref, isRef, watch } from 'vue'
import { isPromise, isFunction, isArray, toRawType } from '@plus-pro-components/components/utils'
import type { OptionsRow, PlusColumn } from '@plus-pro-components/types'

const throwError = (data: unknown) => {
  if (!isArray(data)) {
    console.error('Uncaught TypeError: ', `options expected Array but got ${toRawType(data)}`)
  }
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
  } else if (isRef(props.options)) {
    // computed
    watch(
      props.options,
      val => {
        options.value = val
        optionsIsReady.value = true
      },
      {
        immediate: true
      }
    )
  } else if (isArray(props.options)) {
    // 数组
    options.value = [...props.options]
    optionsIsReady.value = true
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
          optionsIsReady.value = true
          throwError(options.value)
        })
        .catch((err: unknown) => {
          throw err
        })
    } else {
      // 函数
      options.value = result as OptionsRow[]
      optionsIsReady.value = true
    }
  } else if (isPromise(props.options)) {
    // 本身是一个Promise
    const getValue = props.options as Promise<OptionsRow[]>
    getValue
      .then((res: OptionsRow[]) => {
        options.value = res
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
