<template>
  <el-table-column
    v-if="show"
    key="index"
    label="#"
    fixed="left"
    type="index"
    class-name="plus-table-column-index"
    width="60"
    align="center"
    :index="getTableIndex"
  >
    <template #default="{ row, $index }">
      <el-tooltip
        v-if="getTableIndex($index) > 999"
        :content="String(getTableIndex($index))"
        placement="top-start"
      >
        <div
          class="plus-table-index-cloumn plus-table-index-col-border plus-table-column-index-content"
          :style="row?.indexColStyle || {}"
        >
          {{ getTableIndex($index) }}
        </div>
      </el-tooltip>
      <div
        v-else
        class="plus-table-index-cloumn plus-table-index-col-border plus-table-column-index-content"
        :style="row?.indexColStyle || {}"
      >
        {{ getTableIndex($index) }}
      </div>
    </template>
  </el-table-column>
</template>

<script lang="ts" setup>
import { defaultPageInfo } from '@plus-pro-components/constants'

export interface PlusTableTableColumnIndexProps {
  show?: boolean
  pageInfo?: PageInfo
  max?: number
}

defineOptions({
  name: 'PlusTableTableColumnIndex'
})

const props = withDefaults(defineProps<PlusTableTableColumnIndexProps>(), {
  show: true,
  pageInfo: () => ({ ...defaultPageInfo }),
  max: 999
})

// 修改序号生成方法
const getTableIndex = (index: number) => {
  const i = (props.pageInfo.page - 1) * props.pageInfo.pageSize + index + 1

  return +i
}
</script>

<style lang="scss">
.plus-table-index-cloumn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  word-break: keep-all;
  white-space: nowrap;
  width: 20px;
  height: 20px;
}
.plus-table-index-col-border {
  color: #fff;
  font-size: 12px;
  line-height: 12px;
  border-radius: 50%;
}
.plus-table-column-index {
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
