<template>
  <template v-for="item in columns" :key="item.prop">
    <el-table-column
      v-if="item.hideInTable !== true"
      class-name="plus-table-column"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
      :min-width="item.minWidth"
      show-overflow-tooltip
      v-bind="item.tableColumnProps"
    >
      <template #default="{ row }">
        <PlusDisplayItem
          :column="item"
          :row="row"
          @clickToEnlargeImage="handelClickToEnlargeImage"
        />
      </template>
    </el-table-column>
  </template>
</template>

<script lang="ts" setup>
import PlusDisplayItem from '@plus-pro-components/components/display-item'
import type { PlusImagePreviewRow } from '@plus-pro-components/components/image-preview'
// import type { PlusColumn } from '@plus-pro-components/types'

export interface PlusTableTableColumnProps {
  columns?: any
}

export interface PlusTableTableColumnEmits {
  (e: 'clickToEnlargeImage', data: PlusImagePreviewRow[]): void
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
</script>
