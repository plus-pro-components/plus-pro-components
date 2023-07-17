<template>
  <el-table-column
    v-if="sortable"
    key="dragSort"
    label="排序"
    width="60"
    class-name="plus-table-column-drag-sort"
  >
    <span class="plus-table-column-drag-icon">☷</span>
  </el-table-column>
</template>

<script lang="ts" setup>
import type { SortableEvent, Options as SortableOptions } from 'sortablejs'
import Sortable from 'sortablejs'
import { isPlainObject } from '@plus-pro-components/utils'
import { onMounted } from 'vue'

export interface PlusTableColumnDragSortProps {
  sortable: SortableOptions | boolean
}
export interface PlusTableColumnDragSortEmits {
  (e: 'dragSortEnd', newIndex: number, oldIndex: number): void
}

defineOptions({
  name: 'PlusTableColumnDragSort'
})

const props = withDefaults(defineProps<PlusTableColumnDragSortProps>(), {
  sortable: true
})
const emit = defineEmits<PlusTableColumnDragSortEmits>()

onMounted(() => {
  if (props.sortable) {
    rowDrop()
  }
})

// 行拖拽
const rowDrop = () => {
  const tbody = document.querySelector('.el-table__body-wrapper tbody')
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

<style lang="scss">
.plus-table-column-drag-sort {
  .plus-table-column-drag-icon {
    cursor: move;
    padding: 4px;
    box-sizing: border-box;
    font-size: 18px;
    color: rgba(42, 46, 54, 0.88);
    vertical-align: bottom;
    &:hover {
      background-color: #d3e7ff;
    }
  }
}
</style>
