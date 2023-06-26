<template>
  <el-table-column
    v-for="item in config"
    :key="item.prop"
    class-name="plus-table-column"
    :prop="item.prop"
    :label="item.label"
    :width="(item.width as any)"
    :min-width="item.minWidth"
    :fixed="item.fixed"
    :sortable="item.sortable ?? sortable"
    :show-overflow-tooltip="item.showOverflowTooltip !== false"
  >
    <template #default="{ row }">
      <PlusFieldItem
        :config-item="item"
        :row="row"
        @clickToEnlargeImage="handelClickToEnlargeImage"
      />
    </template>
  </el-table-column>
</template>

<script lang="ts" setup>
import type { PlusImagePreviewRow } from '@plus-pro-components/components/image-preview'
import PlusFieldItem from '@plus-pro-components/components/field-item'
import type { TableConfigRow } from './type'

export interface PlusTableTableColumnProps {
  config?: TableConfigRow[]
  sortable?: string | boolean
}
export interface PlusTableTableColumnStatus {
  text: string
  color: string
}
export interface PlusTableColumnState {
  isCopy?: boolean
}
export interface PlusTableTableColumnEmits {
  (e: 'clickToEnlargeImage', data: PlusImagePreviewRow[]): void
}

defineOptions({
  name: 'PlusTableTableColumn'
})

withDefaults(defineProps<PlusTableTableColumnProps>(), {
  sortable: false,
  config: () => []
})
const emit = defineEmits<PlusTableTableColumnEmits>()
// 点击放大图片
const handelClickToEnlargeImage = (srcList: PlusImagePreviewRow[]) => {
  emit('clickToEnlargeImage', srcList)
}
</script>
