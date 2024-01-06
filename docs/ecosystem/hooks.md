# plus-pro-components 内置 hooks

## useTable

初始化表格基本数据，配合 [PlusTable](/components/table.html) 组件使用

```ts
import type { Ref } from 'vue'
import type { ActionBarButtonsRow } from 'plus-pro-components/es/components/table'
import type { PageInfo } from 'plus-pro-components/es/types'
/**
 * 初始化表格基本数据
 *
 */
export declare function useTable<T extends Record<string, any>[] = any>(
  _pageInfo: PageInfo | Ref<PageInfo>
): {
  tableData: Ref<import('vue').UnwrapRef<T>>
  pageInfo: Ref<{
    page: number
    pageSize: number
  }>
  total: Ref<number>
  loadingStatus: Ref<boolean>
  buttons: import('vue').ShallowRef<ActionBarButtonsRow[]>
}
```

使用示例

```ts
import { useTable } from 'plus-pro-components'

interface TableRow {
  index: number
  id: number
  name: string
  status: string
  tag: string
  progress: number
}

const { tableData, pageInfo, total, buttons, loadingStatus } = useTable<TableRow[]>()
```
