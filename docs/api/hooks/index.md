# plus-pro-components 内置 hooks

## useTable

初始化表格基本数据，配合 [PlusTable](/components/table.html) 组件使用

```ts
import type { ActionBarButtonsRow } from 'plus-pro-components/es/components/table'
/**
 * 初始化表格基本数据
 *
 */
declare function useTable<T extends Record<string, any>[] = any>(): {
  tableData: import('vue').Ref<import('vue').UnwrapRef<T>>
  pageInfo: import('vue').Ref<{
    page: number
    pageSize: number
    total?: number | undefined
  }>
  total: import('vue').Ref<number>
  loadingStatus: import('vue').Ref<boolean>
  buttons: import('vue').ShallowRef<ActionBarButtonsRow[]>
}
export default useTable
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

## useAppendTag

在页面 head 中添加标签

```ts
/**
 * 在页面head中添加标签
 * @param tag
 * @param attrs
 * @returns
 */
declare function useAppendTag(
  tag: string | undefined,
  attrs: Record<string, unknown>
): () => Promise<HTMLElement | unknown>
export default useAppendTag
```

使用示例

```ts
import { useAppendTag } from 'plus-pro-components'

useAppendTag('script', { src: 'https://www.api.com/test.js' })
```

## useIsEnterKeyboard

判断是否按住某键

```ts
import type { Ref } from 'vue'
/**
 * 判断是否按住某键  默认判断shift按键
 * @param key `Shift`
 * @returns
 */
export default function useIsEnterKeyboard(key?: string): { isEnterKeyboard: Ref<boolean> }
```

使用示例

```ts
import { useIsEnterKeyboard } from 'plus-pro-components'

const isEnterKeyboard = useIsEnterKeyboard()
```

## useIsOperation

是否在指定时间内操作页面

```ts
import type { Ref } from 'vue'
/**
 *  判断用户是否在操作页面
 * @param duration 秒 默认 10, 最小1
 * @return `{ isOperation: Ref<boolean> }`  是否在指定时间内操作页面
 */
declare function useIsOperation(duration = 10): { isOperation: Ref<boolean> }
export default useIsOperation
```

使用示例

```ts
import { useIsOperation } from 'plus-pro-components'

const { isOperation } = useIsOperation()
```
