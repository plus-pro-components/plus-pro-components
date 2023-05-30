<template>
  <div v-if="show" class="plus-pagination">
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      :background="false"
      :current-page="pageInfo.page"
      :page-size="pageInfo.pageSize"
      :total="total"
      :pager-count="5"
      :disabled="!total"
      :page-sizes="pageSizeList"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { defaultPageSizeList, defaultPageInfo } from '@plus-pro-components/constants'

export interface PlusPaginationProps {
  modelValue: PageInfo
  total: number
  show?: boolean
  pageSizeList?: number[]
}

export interface PlusPaginationEmits {
  (e: 'update:modelValue', pageInfo: PageInfo): void
  (e: 'change', pageInfo: PageInfo): void
}

defineOptions({
  name: 'PlusPagination'
})

const props = withDefaults(defineProps<PlusPaginationProps>(), {
  show: true,
  total: 0,
  pageSizeList: () => [...defaultPageSizeList],
  modelValue: () => ({ ...defaultPageInfo })
})

const emit = defineEmits<PlusPaginationEmits>()

const pageInfo = ref<PageInfo>({ ...defaultPageInfo })

watchEffect(() => {
  pageInfo.value = { ...props.modelValue }
})

const handleEmit = () => {
  emit('update:modelValue', pageInfo.value)
  emit('change', pageInfo.value)
}

// 改变翻页组件中每页数据总数
const handleSizeChange = (pageSize: number) => {
  pageInfo.value.pageSize = pageSize
  // 改变翻页数目，必须将页面=1
  pageInfo.value.page = 1
  handleEmit()
}

// 跳到当前是第几页
const handleCurrentChange = (val: number) => {
  pageInfo.value.page = val
  handleEmit()
}
</script>
