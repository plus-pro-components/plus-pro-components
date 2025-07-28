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
      <div
        v-if="isFunction(getTableIndex)"
        class="plus-table-column-index__content"
        :style="indexContentStyle(row, $index)"
      >
        {{ getTableIndex($index) }}
      </div>
      <div v-else class="plus-table-column-index__content" :style="indexContentStyle(row, $index)">
        {{ getTableIndex }}
      </div>
    </template>
  </el-table-column>
</template>

<script lang="ts" setup>
import { DefaultPageInfo } from '@plus-pro-components/constants'
import type { PageInfo, RecordType } from '@plus-pro-components/types'
import { computed, type CSSProperties } from 'vue'
import { isFunction, isPlainObject } from '@plus-pro-components/components/utils'
import { ElTableColumn } from 'element-plus'
import { isNumber } from 'lodash-es'
import type { TableColumn } from './type'

export interface PlusTableTableColumnIndexProps {
  pageInfo?: PageInfo
  indexTableColumnProps?: TableColumn
  indexContentStyle?:
    | Partial<CSSProperties>
    | ((row: RecordType, index: number) => Partial<CSSProperties>)
}

defineOptions({
  name: 'PlusTableTableColumnIndex'
})

const props = withDefaults(defineProps<PlusTableTableColumnIndexProps>(), {
  pageInfo: () => ({ ...DefaultPageInfo }),
  indexContentStyle: () => ({}),
  indexTableColumnProps: () => ({})
})

// 修改序号生成方法
const getTableIndex = isNumber(props.indexTableColumnProps?.index)
  ? computed(() => props.indexTableColumnProps?.index)
  : isFunction(props.indexTableColumnProps?.index)
  ? props.indexTableColumnProps?.index
  : (index: number) => {
      const i =
        ((props.pageInfo?.page || DefaultPageInfo.page) - 1) *
          (props.pageInfo?.pageSize || DefaultPageInfo.page) +
        index +
        1
      return +i
    }

// index样式
const indexContentStyle = (row: RecordType, index: number): CSSProperties => {
  if (isFunction(props.indexContentStyle)) {
    return (props.indexContentStyle as (row: RecordType, index: number) => CSSProperties)(
      row,
      index
    )
  } else if (isPlainObject(props.indexContentStyle)) {
    return props.indexContentStyle as CSSProperties
  } else {
    return {}
  }
}
</script>
