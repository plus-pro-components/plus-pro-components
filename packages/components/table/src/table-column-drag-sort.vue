<template>
  <el-table-column
    v-if="showDragSort"
    key="dragSort"
    label="排序"
    width="60"
    class="plus-table-column-drag-sort"
  >
    <span class="plus-table-column-drag-icon">☷</span>
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
  const tbody = document.querySelector('.el-table__body-wrapper tbody') as HTMLElement
  // const _this = this
  Sortable.create(tbody, {
    // 格式为简单css选择器的字符串，使列表单元中符合选择器的元素成为拖动的手柄，只有按住拖动手柄才能使列表单元进行拖动
    handle: '.plus-table-column-drag-icon',
    // 动画效果
    animation: 1000,
    // 是否执行两个盒子之间互换
    group: 'box',
    // 移动动画
    easing: 'cubic-bezier(1, 0, 0, 1)',
    // 拖动后的数据
    // dragClass: "sortable-drag",
    chosenClass: 'sortable-chosen',
    // dataIdAttr: "data-no",
    // ghostClass: "ghost",
    // ghostClass: 'blue-background-class',
    // 禁用html5原生拖拽行为
    forceFallback: true,
    onEnd({ newIndex, oldIndex }) {
      emit('subSortEnd', newIndex as number, oldIndex as number)
    }
  })
}
</script>
<style lang="scss" scoped>
.plus-table-column-drag-icon {
  cursor: move;
  padding: 4px;
  box-sizing: border-box;
  font-size: 18px;
  color: rgba(42, 46, 54, 0.88);
  vertical-align: bottom;
}
.plus-table-column-drag-icon:hover {
  background-color: #d3e7ff;
}
</style>
