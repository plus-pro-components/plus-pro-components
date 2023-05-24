<template>
  <el-scrollbar v-if="show && !loadingStatus">
    <div class="pagination-container">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :background="false"
        :current-page="listQueryParams.page"
        :page-size="listQueryParams.pageSize"
        :total="total"
        :pager-count="5"
        :disabled="!total"
        :page-sizes="pageSizeList"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-scrollbar>
  <!--  加载数据时显示骨架屏  -->
  <div v-else class="skeleton-wrapper">
    <el-skeleton animated :rows="1" :throttle="100">
      <template #template>
        <el-skeleton-item variant="text" />
      </template>
    </el-skeleton>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, reactive, toRefs, watch } from 'vue'
import { defaultPageSizeList, defaultPageInfo } from '@plus-pro-components/constants'

interface IPaginationState {
  listQueryParams: PageInfo
}
export default defineComponent({
  name: 'PlusPagination',
  props: {
    show: {
      default: true,
      type: Boolean
    },
    total: {
      default: 0,
      type: Number
    },
    // loading状态
    loadingStatus: {
      type: Boolean,
      default: false
    },
    pageSizeList: {
      type: Array as PropType<number[]>,
      default: () => [...defaultPageSizeList]
    },
    modelValue: {
      type: Object as PropType<PageInfo>,
      default: () => ({ ...defaultPageInfo })
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const state = reactive<IPaginationState>({
      listQueryParams: { ...defaultPageInfo }
    })

    watch(
      () => props.modelValue,
      pageInfo => {
        state.listQueryParams = pageInfo
      },
      {
        deep: true
      }
    )

    // 改变翻页组件中每页数据总数
    const handleSizeChange = (pageSize: number) => {
      state.listQueryParams.pageSize = pageSize
      // 改变翻页数目，必须将页面=1
      state.listQueryParams.page = 1
      emit('update:modelValue', state.listQueryParams)
      emit('change', state.listQueryParams)
    }
    // 跳到当前是第几页
    const handleCurrentChange = (val: number) => {
      state.listQueryParams.page = val
      emit('update:modelValue', state.listQueryParams)
      emit('change', state.listQueryParams)
    }
    return {
      ...toRefs(state),
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>
