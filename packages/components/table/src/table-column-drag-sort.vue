<template>
  <el-table-column
    v-if="showDragSort"
    key="dragSort"
    label="排序"
    width="60"
    class-name="plus-table-column-drag-sort"
  >
    <span class="plus-table-column-drag-sort__icon">☷</span>
  </el-table-column>
</template>

<script lang="ts" setup>
import Sortable from 'sortablejs'
import { onMounted } from 'vue'

export interface PlusTableColumnDragSortProps {
  showDragSort: boolean
}
export interface PlusTableColumnDragSortEmits {
  (e: 'subSortEnd', newIndex: number, oldIndex: number): void
}

defineOptions({
  name: 'PlusTableColumnDragSort'
})

withDefaults(defineProps<PlusTableColumnDragSortProps>(), {
  showDragSort: false
})
const emit = defineEmits<PlusTableColumnDragSortEmits>()

onMounted(() => {
  rowDrop()
})

// 行拖拽
const rowDrop = () => {
  const tbody = document.querySelector('.el-table__body-wrapper tbody')
  if (!tbody) return
  Sortable.create(tbody as HTMLElement, {
    handle: '.plus-table-column-drag-icon',
    animation: 1000,
    group: 'box',
    easing: 'cubic-bezier(1, 0, 0, 1)',
    chosenClass: 'sortable-chosen',
    forceFallback: true,
    onEnd({ newIndex, oldIndex }) {
      emit('subSortEnd', newIndex as number, oldIndex as number)
    }
  })
}
</script>

<style lang="scss">
.plus-table-column-drag-sort {
  .plus-table-column-drag-sort__icon {
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
