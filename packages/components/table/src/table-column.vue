<template>
  <template v-for="item in columns" :key="item.prop">
    <el-table-column
      class-name="plus-table-column"
      :prop="item.prop"
      :width="item.width"
      :min-width="item.minWidth"
      v-bind="item.tableColumnProps"
    >
      <template #header>
        <span class="plus-table-column__header">
          {{ item.label }}
          <el-tooltip v-if="item.tooltip" placement="top" v-bind="getTooltip(item.tooltip)">
            <el-icon class="plus-table-column__header__icon" :size="16"><Warning /></el-icon>
          </el-tooltip>
        </span>
      </template>

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
import type { PlusColumn } from '@plus-pro-components/types'
import { isString, isPlainObject } from '@plus-pro-components/utils'
import { Warning } from '@element-plus/icons-vue'

export interface PlusTableTableColumnProps {
  columns?: PlusColumn[]
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

const getTooltip = (tooltip: PlusColumn['tooltip']) => {
  if (isString(tooltip)) {
    return {
      content: tooltip
    }
  }
  if (isPlainObject(tooltip)) {
    return tooltip
  }
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

<style lang="scss">
.plus-table-column {
  .plus-table-column__header {
    display: flex;
    align-items: center;
    .plus-table-column__header__icon {
      padding-left: 5px;
    }
  }
}
</style>
