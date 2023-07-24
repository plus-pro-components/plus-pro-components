import { ref, shallowRef } from 'vue'
import { DefaultPageInfo } from '@plus-pro-components/constants'
import type { ActionBarButtonsRow } from '@plus-pro-components/components/table'
import type { PageInfo } from '@plus-pro-components/types'

/**
 * 初始化表格基本数据
 *
 */
function useTable<T = any>() {
  const tableData = ref<T>()
  const pageInfo = ref<PageInfo>({ ...DefaultPageInfo })
  const total = shallowRef<number>(0)
  const loadingStatus = shallowRef<boolean>(false)
  const buttons = shallowRef<ActionBarButtonsRow[]>([])

  return {
    tableData,
    pageInfo,
    total,
    loadingStatus,
    buttons
  }
}

export default useTable
