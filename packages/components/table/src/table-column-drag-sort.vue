<template>
  <el-table-column
    key="dragSort"
    :label="t('plus.table.sort')"
    width="60"
    class-name="plus-table-column-drag-sort"
    v-bind="dragSortableTableColumnProps"
  >
    <span class="plus-table-column-drag-icon">
      <slot name="drag-sort-icon">☷</slot>
    </span>
  </el-table-column>
</template>

<script lang="ts" setup>
import type { SortableEvent, Options as SortableOptions } from 'sortablejs'
import Sortable from 'sortablejs'
import { isPlainObject } from '@plus-pro-components/components/utils'
import { watch } from 'vue'
import { useLocale } from '@plus-pro-components/hooks'
import type { RecordType } from '@plus-pro-components/types'
import { ElTableColumn } from 'element-plus'

export interface PlusTableColumnDragSortProps {
  sortable: SortableOptions | boolean
  tableInstance: any
  dragSortableTableColumnProps: RecordType
}
export interface PlusTableColumnDragSortEmits {
  (e: 'dragSortEnd', newIndex: number, oldIndex: number): void
}

defineOptions({
  name: 'PlusTableColumnDragSort'
})

const props = withDefaults(defineProps<PlusTableColumnDragSortProps>(), {
  sortable: true,
  tableInstance: null,
  dragSortableTableColumnProps: () => ({})
})
const emit = defineEmits<PlusTableColumnDragSortEmits>()

const { t } = useLocale()

watch(
  () => props.tableInstance,
  val => {
    if (val && props.sortable) {
      rowDrop()
    }
  }
)

// 行拖拽
const rowDrop = () => {
  const tbody = props.tableInstance?.$el?.querySelector('.el-table__body-wrapper tbody')
  if (!tbody) return

  let config: Sortable.Options = {
    handle: '.plus-table-column-drag-icon',
    animation: 150,
    group: 'box',
    easing: 'cubic-bezier(1, 0, 0, 1)',
    chosenClass: 'sortable-chosen',
    forceFallback: true,
    onEnd({ newIndex, oldIndex }: SortableEvent) {
      emit('dragSortEnd', newIndex as number, oldIndex as number)
    }
  }
  if (isPlainObject(props.sortable)) {
    config = { ...config, ...(props.sortable as Sortable.Options) }
  }

  Sortable.create(tbody as HTMLElement, config)
}
</script>
