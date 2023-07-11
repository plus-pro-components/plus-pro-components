import type { Ref } from 'vue'
import { ref } from 'vue'
import { isPromise, isFunction, isArray } from '@plus-pro-components/utils'
import type { OptionsRow, PlusColumn } from '@plus-pro-components/types'

const useGetOptions = (props: PlusColumn): Ref<OptionsRow[]> => {
  const options = ref<OptionsRow[]>([])

  if (isArray(props.options)) {
    options.value = [...props.options]
  } else if (isPromise(props.options)) {
    const getValue = props.options as (props?: PlusColumn | undefined) => Promise<OptionsRow[]>
    getValue(props)
      .then(data => {
        options.value = data || []
      })
      .catch(err => {
        throw err
      })
  } else if (isFunction(props.options)) {
    const getValue = props.options as (props?: PlusColumn | undefined) => OptionsRow[]
    options.value = getValue(props) || []
  }
  return options
}

export default useGetOptions
