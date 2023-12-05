import type { Ref } from 'vue'
import { ref, shallowRef, unref } from 'vue'
import { DefaultPageInfo } from '@plus-pro-components/constants'
import type { ActionBarButtonsRow } from '@plus-pro-components/components/table'
import type { PageInfo } from '@plus-pro-components/types'

/**
 * 初始化表格基本数据
 *
 */
export function useTable<T extends Record<string, any>[] = any>(
  _pageInfo?: PageInfo | Ref<PageInfo>
) {
  const defaultPageInfo = unref(_pageInfo) || DefaultPageInfo
  const tableData = ref<T>([] as any)
  const pageInfo = ref<PageInfo>({ ...defaultPageInfo })
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
