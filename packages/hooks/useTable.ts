import { ref } from 'vue'
import type { ButtonsNameRow } from '@plus-pro-components/components/table'
import { defaultPageInfo } from '@plus-pro-components/constants'

/**
 * 初始化表格基本数据
 *
 */
function useTable<T = any>() {
  const tableData = ref<T>()
  const pageInfo = ref<PageInfo>({ ...defaultPageInfo })
  const total = ref<number>(0)
  const loadingStatus = ref<boolean>(false)
  const buttonsName = ref<ButtonsNameRow>({})

  return {
    tableData,
    pageInfo,
    total,
    loadingStatus,
    buttonsName
  }
}

export default useTable
