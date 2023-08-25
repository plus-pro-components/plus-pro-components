<template>
  <div class="plus-table">
    <PlusTableToolbar
      v-if="hasToolbar"
      :columns="columns"
      :sub-columns="subColumns"
      :default-size="size"
      :title="title"
      @click-density="handleClickDensity"
      @filter-table="handleFilterTableConfirm"
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
      :row-key="rowKey"
      highlight-current-row
      scrollbar-always-on
      v-bind="$attrs"
    >
      <!-- 选择栏 -->
      <el-table-column v-if="isSelection" key="selection" type="selection" width="34" />

      <!-- 序号栏 -->
      <PlusTableTableColumnIndex
        v-if="isShowNumber"
        :index-content-style="indexContentStyle"
        :index-table-column-props="indexTableColumnProps"
        :page-info="(pagination as PlusPaginationProps)?.modelValue"
      />

      <!-- 拖拽行 -->
      <PlusTableColumnDragSort
        v-if="dragSortable"
        :sortable="dragSortable"
        :drag-sortable-table-column-props="dragSortableTableColumnProps"
        :table-instance="tableInstance"
        @dragSortEnd="handleDragSortEnd"
      />

      <!-- 展开行 -->
      <el-table-column v-if="hasExpand" type="expand">
        <template #default="{ row, $index }">
          <div class="plus-table-expand-col">
            <slot name="expand" :row="row" :index="$index" />
          </div>
        </template>
      </el-table-column>

      <!--配置渲染栏  -->
      <PlusTableColumn :columns="(subColumns as any)" @formChange="handleFormChange">
        <!--表格单元格表头的插槽 -->
        <template v-for="(_, key) in headerSlots" :key="key" #[key]="data">
          <slot :name="key" v-bind="data" />
        </template>

        <!--表格单元格的插槽 -->
        <template v-for="(_, key) in cellSlots" :key="key" #[key]="data">
          <slot :name="key" v-bind="data" />
        </template>

        <!--表单单项的插槽 -->
        <template v-for="(_, key) in fieldSlots" :key="key" #[key]="data">
          <slot :name="key" v-bind="data" />
        </template>
      </PlusTableColumn>

      <!-- 操作栏 -->
      <PlusTableActionBar
        v-if="actionBar"
        v-bind="actionBar"
        @clickAction="handleAction"
        @clickActionConfirmCancel="handleClickActionConfirmCancel"
      />

      <!-- 插入至表格最后一行之后的内容 -->
      <template #append>
        <slot name="append" />
      </template>

      <!-- 当数据为空时自定义的内容 -->
      <template #empty>
        <slot name="empty" />
      </template>
    </el-table>

    <!-- 分页 -->
    <PlusPagination v-if="pagination" v-model="subPageInfo" v-bind="pagination" />
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, watch, ref, provide, shallowRef, useSlots } from 'vue'
import { cloneDeep } from 'lodash-es'
import type { PlusPaginationProps } from '@plus-pro-components/components/pagination'
import { PlusPagination } from '@plus-pro-components/components/pagination'
import { DefaultPageInfo, TableFormRefInjectionKey } from '@plus-pro-components/constants'
import type { CSSProperties } from 'vue'
import type { ComponentSize } from 'element-plus/es/constants'
import type { TableInstance, TableProps } from 'element-plus'
import type { PageInfo, PlusColumn, RecordType } from '@plus-pro-components/types'
import type { Options as SortableOptions } from 'sortablejs'
import {
  getTableCellSlotName,
  getTableHeaderSlotName,
  getFieldSlotName,
  filterSlots
} from '@plus-pro-components/components/utils'
import PlusTableActionBar from './table-action-bar.vue'
import PlusTableColumn from './table-column.vue'
import PlusTableTableColumnIndex from './table-column-index.vue'
import PlusTableColumnDragSort from './table-column-drag-sort.vue'
import PlusTableToolbar from './table-toolbar.vue'
import type { ButtonsCallBackParams, TableState, ActionBarProps } from './type'

/**
 * 表格数据
 */
export interface PlusTableProps extends /* @vue-ignore */ Partial<TableProps<any>> {
  // 密度
  defaultSize?: ComponentSize
  /* 分页参数*/
  pagination?: false | Partial<PlusPaginationProps>
  /* 操作栏参数*/
  actionBar?: false | Partial<ActionBarProps>
  /* 是否需要序号*/
  isShowNumber?: boolean
  /* 是否需要过滤表格表头*/
  hasToolbar?: boolean
  /* 是否是多选表格*/
  isSelection?: boolean
  /* 是否需要展开行*/
  hasExpand?: boolean
  /* loading状态*/
  loadingStatus?: boolean
  /* 自定义表格标题*/
  title?: string
  /* 表格高度*/
  // eslint-disable-next-line vue/require-default-prop
  height?: string
  /* 表格数据*/
  tableData: any[]
  /* 表格配置信息*/
  columns: PlusColumn[]
  /* 表格头样式*/
  headerCellStyle?: Partial<CSSProperties>
  /** rowKey */
  rowKey?: string
  /** sortablejs配置 */
  dragSortable?: false | Partial<SortableOptions>
  dragSortableTableColumnProps?: RecordType
  indexTableColumnProps?: RecordType
  indexContentStyle?: Partial<CSSProperties> | ((row: any, index: number) => Partial<CSSProperties>)
}
export interface PlusTableEmits {
  (e: 'paginationChange', pageInfo: PageInfo): void
  (e: 'clickAction', data: ButtonsCallBackParams): void
  (e: 'clickActionConfirmCancel', data: ButtonsCallBackParams): void
  (e: 'dragSortEnd', newIndex: number, oldIndex: number): void
  (e: 'formChange', data: { value: any; prop: string; row: any; index: number; column: any }): void
}

defineOptions({
  name: 'PlusTable',
  inheritAttrs: false
})

const props = withDefaults(defineProps<PlusTableProps>(), {
  defaultSize: 'default',
  pagination: false,
  actionBar: false,
  isShowNumber: false,
  hasToolbar: true,
  isSelection: false,
  hasExpand: false,
  loadingStatus: false,
  title: '',
  tableData: () => [],
  columns: () => [],
  headerCellStyle: () => ({
    backgroundColor: '#F5F9FD',
    color: '#777'
  }),
  rowKey: 'id',
  dragSortable: false,
  dragSortableTableColumnProps: () => ({}),
  indexTableColumnProps: () => ({}),
  indexContentStyle: () => ({})
})
const emit = defineEmits<PlusTableEmits>()

const subColumns = ref(cloneDeep(props.columns))
const tableInstance = shallowRef<TableInstance | null>(null)
const state = reactive<TableState>({
  subPageInfo: {
    ...(((props.pagination as PlusPaginationProps)?.modelValue || DefaultPageInfo) as PageInfo)
  },
  size: props.defaultSize
})

const slots = useSlots()
/**
 * 表格单元格的插槽
 */
const cellSlots = filterSlots(slots, getTableCellSlotName())

/**
 * 表格单元格表头的插槽
 */
const headerSlots = filterSlots(slots, getTableHeaderSlotName())

/**
 * 表单单项的插槽
 */
const fieldSlots = filterSlots(slots, getFieldSlotName())

/**
 * 表单的ref
 */
const formRefs = shallowRef({})
provide(TableFormRefInjectionKey, formRefs)

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
    emit('paginationChange', { ...pageInfo })
  },
  {
    deep: true
  }
)

const handleAction = (res: ButtonsCallBackParams) => {
  const { row, buttonRow, index, e } = res
  emit('clickAction', { row, buttonRow, index, e, formRefs: (formRefs.value as any)[index] })
}

const handleClickActionConfirmCancel = (res: ButtonsCallBackParams) => {
  const { row, buttonRow, index, e } = res
  emit('clickActionConfirmCancel', {
    row,
    buttonRow,
    index,
    e,
    formRefs: (formRefs.value as any)[index]
  })
}

const handleFilterTableConfirm = (data: PlusColumn[]) => {
  subColumns.value = data.filter(item => item.hideInTable !== true) as any
  console.log(subColumns.value)
}

// 密度
const handleClickDensity = (data: ComponentSize) => {
  state.size = data
}

const handleDragSortEnd = (newIndex: number, oldIndex: number) => {
  emit('dragSortEnd', newIndex, oldIndex)
}

const handleFormChange = (data: {
  value: any
  prop: string
  row: any
  index: number
  column: any
}) => {
  emit('formChange', data)
}

const { subPageInfo, size } = toRefs(state)

defineExpose({
  tableInstance
})
</script>
