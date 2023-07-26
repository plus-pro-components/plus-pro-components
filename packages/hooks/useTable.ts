import { ref, shallowRef } from 'vue'
import { DefaultPageInfo } from '@plus-pro-components/constants'
import type { ActionBarButtonsRow } from '@plus-pro-components/components/table'
import type { PageInfo } from '@plus-pro-components/types'

/**
 * 初始化表格基本数据
 *
 */
function useTable<T extends Record<string, any>[] = any>() {
  const tableData = ref<T>([] as any)
  const pageInfo = ref<PageInfo>({ ...DefaultPageInfo })
  const total = ref<number>(0)
  const loadingStatus = ref<boolean>(false)
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
