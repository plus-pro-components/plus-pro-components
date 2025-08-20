<template>
  <div class="plus-pagination" :class="[`plus-pagination--${align}`]">
    <slot v-if="align === 'right' || align === 'center'" name="pagination-left">
      <span />
    </slot>

    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      :background="false"
      :current-page="pageInfo.page"
      :page-size="pageInfo.pageSize"
      :total="total"
      :page-sizes="pageSizeList"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <slot v-if="align === 'left' || align === 'center'" name="pagination-right">
      <span />
    </slot>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { DefaultPageSizeList, DefaultPageInfo } from '@plus-pro-components/constants'
import { ElPagination } from 'element-plus'
import type { PageInfo } from '@plus-pro-components/types'
import type { PlusPaginationSelfProps, PlusPaginationEmits } from './type'

defineOptions({
  name: 'PlusPagination'
})

const props = withDefaults(defineProps<PlusPaginationSelfProps>(), {
  total: 0,
  pageSizeList: () => [...DefaultPageSizeList],
  modelValue: () => ({ ...DefaultPageInfo }),
  align: 'right'
})
const emit = defineEmits<PlusPaginationEmits>()

const pageInfo = ref<PageInfo>({ ...DefaultPageInfo })

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
  emit('size-change', pageSize)
}

// 跳到当前是第几页
const handleCurrentChange = (page: number) => {
  pageInfo.value.page = page
  handleEmit()
  emit('current-change', page)
}
</script>
