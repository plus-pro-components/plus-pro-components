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
    v-bind="$attrs"
  >
    <template #default="{ row, $index }">
      <el-tooltip
        v-if="getTableIndex($index) > 999"
        :content="String(getTableIndex($index))"
        placement="top-start"
      >
        <div
          class="plus-table-index-column plus-table-index-col-border plus-table-column-index-content"
          :style="customIndexContentStyle(row, $index)"
        >
          {{ getTableIndex($index) }}
        </div>
      </el-tooltip>
      <div
        v-else
        class="plus-table-index-column plus-table-index-col-border plus-table-column-index-content"
        :style="customIndexContentStyle(row, $index)"
      >
        {{ getTableIndex($index) }}
      </div>
    </template>
  </el-table-column>
</template>

<script lang="ts" setup>
import { DefaultPageInfo } from '@plus-pro-components/constants'
import type { PageInfo } from '@plus-pro-components/types'
import type { CSSProperties } from 'vue'
import { isFunction, isPlainObject } from '@plus-pro-components/utils'

export interface PlusTableTableColumnIndexProps {
  pageInfo?: PageInfo
  max?: number
  indexContentStyle?: CSSProperties | ((row: any, index: number) => CSSProperties)
}

defineOptions({
  name: 'PlusTableTableColumnIndex'
})

const props = withDefaults(defineProps<PlusTableTableColumnIndexProps>(), {
  show: false,
  pageInfo: () => ({ ...DefaultPageInfo }),
  max: 999,
  indexContentStyle: () => ({})
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
const customIndexContentStyle = (row: any, index: number): CSSProperties => {
  if (isFunction(props.indexContentStyle)) {
    return (props.indexContentStyle as (row: any, index: number) => CSSProperties)(row, index)
  } else if (isPlainObject(props.indexContentStyle)) {
    return props.indexContentStyle as CSSProperties
  } else {
    return {}
  }
}
</script>

<style lang="scss">
.plus-table-column-index {
  .plus-table-index-column {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    word-break: keep-all;
    white-space: nowrap;
    width: 20px;
    height: 20px;
  }

  .cell {
    line-height: 32px !important;
    .plus-table-column-index-content {
      align-items: center;
      display: flex;
      font-size: 12px;
      justify-content: center;
      overflow: hidden;
      padding: 5px 5px;
    }
  }
}
</style>
