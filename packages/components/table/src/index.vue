<template>
  <div class="plus-table">
    <PlusTableToolbar
      :has-filter-table-header="hasFilterTableHeader"
      :columns="columns"
      :default-size="size"
      :table-title="tableTitle"
      @sub-density="handleClickDensity"
      @sub-filter-table="handleFilterTableConfirm"
    >
      <template #title>
        <slot name="title" />
      </template>

      <template #toolbar>
        <slot name="toolbar" />
      </template>
    </PlusTableToolbar>

    <el-table
      ref="tableInstance"
      v-loading="loadingStatus"
      :reserve-selection="true"
      :data="tableData"
      :border="true"
      :height="height"
      :header-cell-style="headerCellStyle"
      :size="size"
      highlight-current-row
      scrollbar-always-on
      v-bind="tableProps"
      :row-key="rowKey"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
      @row-click="handleClickRow"
      @current-change="handleTableCurrentChange"
      @expand-change="handleExpandChange"
    >
      <!-- 选择栏 -->
      <el-table-column v-if="isSelection" key="selection" type="selection" width="34" />

      <!-- 序号栏 -->
      <PlusTableTableColumnIndex
        :show="isShowNumber"
        :sub-page-info="pagination.modelValue"
        align="left"
      />

      <!-- 拖拽行 -->
      <PlusTableColumnDragSort :show-drag-sort="isShowDragSort" @subSortEnd="subSortEnd" />

      <!-- 展开行 -->
      <el-table-column v-if="hasExpand" type="expand">
        <template #default="{ row, $index }">
          <div class="plus-table-expand-col">
            <slot name="expand" :row="row" :index="$index" />
          </div>
        </template>
      </el-table-column>

      <!--配置渲染栏  -->
      <PlusTableTableColumn
        :columns="(subColumns as any)"
        @clickToEnlargeImage="handelClickToEnlargeImage"
        @change="handleChange"
      />

      <!-- 操作栏 -->
      <PlusTableActionBar v-bind="actionBar" @subClickButton="handleClickOption" />
    </el-table>

    <!-- 分页 -->
    <PlusPagination
      v-if="pagination.show"
      v-model="subPageInfo"
      v-bind="pagination"
      :loading-status="loadingStatus"
    />

    <!-- 大图预览 -->
    <PlusImagePreview v-model="bigImageVisible" title="图片预览" :src-list="srcList" />
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, watch, ref, nextTick } from 'vue'
import { cloneDeep } from 'lodash-es'
import PlusPagination from '@plus-pro-components/components/pagination'
import { DefaultPageInfo } from '@plus-pro-components/constants'
import type { PlusImagePreviewRow } from '@plus-pro-components/components/image-preview'
import PlusImagePreview from '@plus-pro-components/components/image-preview'
import type { PlusPaginationProps } from '@plus-pro-components/components/pagination'
import type { CSSProperties } from 'vue'
import type { ComponentSize } from 'element-plus/es/constants'
import type { TableInstance } from 'element-plus'
import type { PageInfo, PlusColumn, RecordType } from '@plus-pro-components/types'
import PlusTableActionBar from './table-action-bar.vue'
import PlusTableTableColumn from './table-column.vue'
import PlusTableTableColumnIndex from './table-column-index.vue'
import PlusTableColumnDragSort from './table-column-drag-sort.vue'
import PlusTableToolbar from './table-toolbar.vue'
import type { ButtonsCallBackParams, TableState, SortParams, ActionBarProps } from './type'

/**
 * 表格数据
 */
export interface PlusTableProps {
  // 密度
  defaultSize?: ComponentSize
  /* 分页参数*/
  pagination?: Partial<PlusPaginationProps>
  /* 操作栏参数*/
  actionBar?: ActionBarProps
  /* 是否需要序号*/
  isShowNumber?: boolean
  /* 是否需要过滤表格表头*/
  hasFilterTableHeader?: boolean
  /* 是否是多选表格*/
  isSelection?: boolean
  /* 是否需要展开行*/
  hasExpand?: boolean
  /* loading状态*/
  loadingStatus?: boolean
  /* 自定义表格标题*/
  tableTitle?: string
  /* 表格高度*/
  // eslint-disable-next-line vue/require-default-prop
  height?: string
  /* 表格数据*/
  tableData: any[]
  /* 表格配置信息*/
  columns: PlusColumn[]
  /* 表格头样式*/
  headerCellStyle?: CSSProperties
  // 是否可拖拽
  isShowDragSort?: boolean
  rowKey?: string
  tableProps?: RecordType
}

export interface PlusTableEmits {
  (e: 'subPaginationChange', pageInfo: PageInfo): void
  (e: 'subSelected', data: any[]): void
  (e: 'subCurrent', row: any): void
  (e: 'subExpandChange', row: any): void
  (e: 'subSortChange', sortParams: SortParams): void
  (e: 'subClickRow', row: any, column: any, event: MouseEvent): void
  (e: 'subClickButton', data: ButtonsCallBackParams): void
  (e: 'subSortEnd', newIndex: number, oldIndex: number): void
  (e: 'subChange', data: { value: any; prop: string; row: any; index: number; column: any }): void
}

defineOptions({
  name: 'PlusTable'
})

const props = withDefaults(defineProps<PlusTableProps>(), {
  defaultSize: 'default',
  pagination: () => ({}),
  actionBar: () => ({}),
  isShowNumber: true,
  hasFilterTableHeader: true,
  isSelection: false,
  hasExpand: false,
  loadingStatus: false,
  tableTitle: '',
  tableData: () => [],
  columns: () => [],
  headerCellStyle: () => ({
    backgroundColor: '#F5F9FD',
    color: '#777'
  }),
  isShowDragSort: false,
  rowKey: 'id',
  tableProps: () => ({})
})

const emit = defineEmits<PlusTableEmits>()

const subColumns = ref(cloneDeep(props.columns))

const tableInstance = ref<TableInstance | null>(null)
const state = reactive<TableState>({
  bigImageVisible: false,
  srcList: [],
  subPageInfo: { ...((props.pagination.modelValue || DefaultPageInfo) as PageInfo) },
  size: props.defaultSize
})
// 监听配置更改
watch(
  () => props.columns,
  val => {
    subColumns.value = val.filter(item => item.hideInTable !== true) as any
  },
  {
    deep: true
  }
)

// 监听分页数据，分发分页改变事件
watch(
  () => state.subPageInfo,
  pageInfo => {
    emit('subPaginationChange', { ...pageInfo })
  },
  {
    deep: true
  }
)

// 选中表格行
const handleTableCurrentChange = (row: any) => {
  emit('subCurrent', row)
}
// 展开行
const handleExpandChange = (row: any) => {
  emit('subExpandChange', row)
}
// 排序
const handleSortChange = (sortParams: SortParams) => {
  emit('subSortChange', sortParams)
}
// 当某一行被点击时会触发该事件
const handleClickRow = (row: any, column: any, event: MouseEvent) => {
  emit('subClickRow', row, column, event)
}
// 点击按钮传递给父组件
const handleClickOption = (res: ButtonsCallBackParams) => {
  const { row, buttonRow, index, e } = res
  emit('subClickButton', { row, buttonRow, index, e })
}
// 设置当前行
const setCurrent = (row: any) => {
  tableInstance.value?.setCurrentRow(row)
}
// 设置checkedBox行
const toggleRowSelection = (row: any, selected: boolean) => {
  tableInstance.value?.toggleRowSelection(row, selected)
}
// 重新布局
const doLayout = () => {
  nextTick(() => {
    tableInstance.value?.doLayout()
  })
}
// 滚动
const scrollTo = (data: ScrollToOptions = { left: 0, top: 0 }) => {
  nextTick(() => {
    tableInstance.value?.scrollTo(data)
  })
}

// 点击放大图片
const handelClickToEnlargeImage = (srcList: PlusImagePreviewRow[]) => {
  state.srcList = srcList?.length ? srcList : []
  state.bigImageVisible = true
}

const handleFilterTableConfirm = (data: PlusColumn[]) => {
  subColumns.value = data.filter(item => item.hideInTable !== true) as any
}

// 多选处理
const handleSelectionChange = (data: any[]) => {
  emit('subSelected', data)
}
// 密度
const handleClickDensity = (data: ComponentSize) => {
  state.size = data
}

const subSortEnd = (newIndex: number, oldIndex: number) => {
  emit('subSortEnd', newIndex, oldIndex)
}

const handleChange = (data: { value: any; prop: string; row: any; index: number; column: any }) => {
  emit('subChange', data)
}

const { bigImageVisible, srcList, subPageInfo, size } = toRefs(state)

// 暴露方法到外部调用
defineExpose({
  scrollTo,
  doLayout,
  toggleRowSelection,
  setCurrent,
  tableInstance
})
</script>

<style lang="scss">
.el-popper {
  max-width: 200px;
}
</style>
