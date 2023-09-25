<template>
  <el-table-column
    key="index"
    label="#"
    fixed="left"
    type="index"
    class-name="plus-table-column-index"
    width="60"
    align="center"
    :index="getTableIndex"
    v-bind="indexTableColumnProps"
  >
    <template #default="{ row, $index }">
      <el-tooltip
        v-if="getTableIndex($index) > 999"
        :content="String(getTableIndex($index))"
        placement="top-start"
      >
        <div class="plus-table-column-index__content" :style="indexContentStyle(row, $index)">
          {{ getTableIndex($index) }}
        </div>
      </el-tooltip>
      <div v-else class="plus-table-column-index__content" :style="indexContentStyle(row, $index)">
        {{ getTableIndex($index) }}
      </div>
    </template>
  </el-table-column>
</template>

<script lang="ts" setup>
import { DefaultPageInfo } from '@plus-pro-components/constants'
import type { PageInfo, RecordType } from '@plus-pro-components/types'
import type { CSSProperties } from 'vue'
import { isFunction, isPlainObject } from '@plus-pro-components/utils'
import { ElTableColumn, ElTooltip } from 'element-plus'

export interface PlusTableTableColumnIndexProps {
  pageInfo?: PageInfo
  indexTableColumnProps?: RecordType
  max?: number
  indexContentStyle?: Partial<CSSProperties> | ((row: any, index: number) => Partial<CSSProperties>)
}

defineOptions({
  name: 'PlusTableTableColumnIndex'
})

const props = withDefaults(defineProps<PlusTableTableColumnIndexProps>(), {
  show: false,
  pageInfo: () => ({ ...DefaultPageInfo }),
  max: 999,
  indexContentStyle: () => ({}),
  indexTableColumnProps: () => ({})
})

// 修改序号生成方法
const getTableIndex = (index: number) => {
  const i =
    ((props.pageInfo?.page || DefaultPageInfo.page) - 1) *
      (props.pageInfo?.pageSize || DefaultPageInfo.page) +
    index +
    1
  return +i
}

// index样式
const indexContentStyle = (row: any, index: number): CSSProperties => {
  if (isFunction(props.indexContentStyle)) {
    return (props.indexContentStyle as (row: any, index: number) => CSSProperties)(row, index)
  } else if (isPlainObject(props.indexContentStyle)) {
    return props.indexContentStyle as CSSProperties
  } else {
    return {}
  }
}
</script>
