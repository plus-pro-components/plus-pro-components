import type { Ref } from 'vue'
import { ref } from 'vue'
import { isPromise, isFunction, isPlainObject } from '@plus-pro-components/utils'
import type { RecordType } from '@plus-pro-components/types'

const useGetCustomProps = (fieldProps?: RecordType, value?: any, row?: any): Ref<any> => {
  const data = ref<any>({})
  if (!fieldProps) {
    data.value = {}
  } else if (isPromise(fieldProps)) {
    const getValue = fieldProps as any
    getValue(value, row)
      .then((data: any) => {
        data.value = data || {}
      })
      .catch((err: any) => {
        throw err
      })
  } else if (isFunction(fieldProps)) {
    const getValue = fieldProps as any
    data.value = getValue(value, row) || {}
  } else if (isPlainObject(fieldProps)) {
    data.value = fieldProps
  }
  return data
}

export default useGetCustomProps
