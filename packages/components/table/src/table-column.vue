<template>
  <template v-for="item in columns" :key="item.prop">
    <el-table-column
      v-if="item.hideInTable !== true"
      class-name="plus-table-column"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
      :min-width="item.minWidth"
      v-bind="item.tableColumnProps"
    >
      <template #default="{ row, column, $index }">
        <PlusDisplayItem
          :column="item"
          :row="row"
          @clickToEnlargeImage="handelClickToEnlargeImage"
          @change="data => handleChange(data, $index, column, item)"
        />
      </template>
    </el-table-column>
  </template>
</template>

<script lang="ts" setup>
import PlusDisplayItem from '@plus-pro-components/components/display-item'
import type { PlusImagePreviewRow } from '@plus-pro-components/components/image-preview'

export interface PlusTableTableColumnProps {
  columns?: any
}

export interface PlusTableTableColumnEmits {
  (e: 'clickToEnlargeImage', data: PlusImagePreviewRow[]): void
  (e: 'change', data: { value: any; prop: string; row: any; index: number; column: any }): void
}

defineOptions({
  name: 'PlusTableTableColumn'
})

withDefaults(defineProps<PlusTableTableColumnProps>(), {
  columns: () => []
})

const emit = defineEmits<PlusTableTableColumnEmits>()

// 点击放大图片
const handelClickToEnlargeImage = (srcList: PlusImagePreviewRow[]) => {
  emit('clickToEnlargeImage', srcList)
}

// 表单发生变化
const handleChange = (
  data: { value: any; prop: string; row: any },
  index: number,
  column: any,
  item: any
) => {
  emit('change', { ...data, index, column: { ...column, ...item } })
}
</script>
