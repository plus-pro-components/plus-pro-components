<template>
  <div class="plus-table">
    <PlusTableTitleBar
      v-if="titleBar"
      :columns="columns"
      :default-size="size"
      :title-bar="titleBar"
      :change-columns="subColumns"
      @click-density="handleClickDensity"
      @filter-table="handleFilterTableConfirm"
      @refresh="handleRefresh"
    >
      <template #title>
        <slot name="title" />
      </template>

      <template #toolbar>
        <slot name="toolbar" />
      </template>

      <!-- 表格拖拽行 和 列设置里拖拽 icon -->
      <template v-if="$slots['drag-sort-icon']" #drag-sort-icon>
        <slot name="drag-sort-icon" />
      </template>

      <!-- 表格表头 列设置 icon   -->
      <template v-if="$slots['column-settings-icon']" #column-settings-icon>
        <slot name="column-settings-icon" />
      </template>

      <!-- 表表格表头 密度 icon  -->
      <template v-if="$slots['density-icon']" #density-icon>
        <slot name="density-icon" />
      </template>
    </PlusTableTitleBar>

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
      <el-table-column
        v-if="isSelection"
        key="selection"
        type="selection"
        v-bind="selectionTableColumnProps"
      />

      <!-- 序号栏 -->
      <PlusTableTableColumnIndex
        v-if="hasIndexColumn"
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
      >
        <template v-if="$slots['drag-sort-icon']" #drag-sort-icon>
          <slot name="drag-sort-icon" />
        </template>
      </PlusTableColumnDragSort>

      <!-- 展开行 -->
      <el-table-column v-if="hasExpand" type="expand" v-bind="expandTableColumnProps">
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

        <!-- 表单el-form-item 下一行额外的内容 的插槽 -->
        <template v-for="(_, key) in extraSlots" :key="key" #[key]="data">
          <slot :name="key" v-bind="data" />
        </template>

        <!-- tooltip-icon  插槽 -->
        <template v-if="$slots['tooltip-icon']" #tooltip-icon>
          <slot name="tooltip-icon" />
        </template>
      </PlusTableColumn>

      <!-- 操作栏 -->
      <PlusTableActionBar
        v-if="actionBar"
        v-bind="actionBar"
        @clickAction="handleAction"
        @clickActionConfirmCancel="handleClickActionConfirmCancel"
      >
        <!-- 操作栏更多icon插槽 -->
        <template v-if="$slots['action-bar-more-icon']" #action-bar-more-icon>
          <slot name="action-bar-more-icon" />
        </template>
      </PlusTableActionBar>

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
    <PlusPagination
      v-if="pagination"
      v-model="subPageInfo"
      v-bind="pagination"
      @change="handlePaginationChange"
    >
      <template v-if="$slots['pagination-left']" #pagination-left>
        <slot name="pagination-left" />
      </template>
      <template v-if="$slots['pagination-right']" #pagination-right>
        <slot name="pagination-right" />
      </template>
    </PlusPagination>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, watch, ref, provide, shallowRef, useSlots, unref } from 'vue'
import type { PlusPaginationProps } from '@plus-pro-components/components/pagination'
import { PlusPagination } from '@plus-pro-components/components/pagination'
import { DefaultPageInfo, TableFormRefInjectionKey } from '@plus-pro-components/constants'
import type { CSSProperties, Ref, Component } from 'vue'
import type { ComponentSize } from 'element-plus/es/constants'
import type { TableInstance, TableProps } from 'element-plus'
import { ElTable, ElTableColumn, vLoading } from 'element-plus'
import type { PageInfo, PlusColumn, RecordType } from '@plus-pro-components/types'
import type { Options as SortableOptions } from 'sortablejs'
import {
  getTableCellSlotName,
  getTableHeaderSlotName,
  getFieldSlotName,
  getExtraSlotName,
  filterSlots
} from '@plus-pro-components/components/utils'
import { default as PlusTableActionBarComponent } from './table-action-bar.vue'
import { default as PlusTableColumnComponent } from './table-column.vue'
import PlusTableTableColumnIndex from './table-column-index.vue'
import PlusTableColumnDragSort from './table-column-drag-sort.vue'
import PlusTableTitleBar from './table-title-bar.vue'
import type {
  ButtonsCallBackParams,
  TableState,
  ActionBarProps,
  TitleBar,
  TableFormRefRow
} from './type'

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
  hasIndexColumn?: boolean
  /* 是否工具栏*/
  titleBar?: boolean | Partial<TitleBar>
  /* 是否是多选表格*/
  isSelection?: boolean
  /* 是否需要展开行*/
  hasExpand?: boolean
  /* loading状态*/
  loadingStatus?: boolean
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
  selectionTableColumnProps?: RecordType
  expandTableColumnProps?: RecordType
  indexContentStyle?: Partial<CSSProperties> | ((row: any, index: number) => Partial<CSSProperties>)
}
export interface PlusTableEmits {
  (e: 'paginationChange', pageInfo: PageInfo): void
  (e: 'clickAction', data: ButtonsCallBackParams): void
  (e: 'clickActionConfirmCancel', data: ButtonsCallBackParams): void
  (e: 'dragSortEnd', newIndex: number, oldIndex: number): void
  (e: 'formChange', data: { value: any; prop: string; row: any; index: number; column: any }): void
  (e: 'refresh'): void
}

defineOptions({
  name: 'PlusTable',
  inheritAttrs: false
})

/**
 * FIXME: The inferred type of this node exceeds the maximum length the compiler will serialize. An explicit type annotation is needed.
 */
const PlusTableActionBar: Component = PlusTableActionBarComponent
const PlusTableColumn: Component = PlusTableColumnComponent

const props = withDefaults(defineProps<PlusTableProps>(), {
  defaultSize: 'default',
  pagination: false,
  actionBar: false,
  hasIndexColumn: false,
  titleBar: true,
  isSelection: false,
  hasExpand: false,
  loadingStatus: false,
  tableData: () => [],
  columns: () => [],
  headerCellStyle: () => ({}),
  rowKey: 'id',
  dragSortable: false,
  dragSortableTableColumnProps: () => ({}),
  indexTableColumnProps: () => ({}),
  indexContentStyle: () => ({}),
  selectionTableColumnProps: () => ({
    width: 40
  }),
  expandTableColumnProps: () => ({})
})
const emit = defineEmits<PlusTableEmits>()

const subColumns = ref([])
const tableInstance = shallowRef<any>(null)
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
 * el-form-item 下一行额外的内容 的插槽
 */
const extraSlots = filterSlots(slots, getExtraSlotName())

/**
 * 表单的ref
 */
const formRefs = shallowRef<Record<string | number, TableFormRefRow[]>>({})
provide(TableFormRefInjectionKey, formRefs)

// 监听配置更改
watch(
  () => props.columns,
  val => {
    subColumns.value = val.filter(item => unref(item.hideInTable) !== true) as any
  },
  {
    deep: true,
    immediate: true
  }
)

// 发分页改变事件
const handlePaginationChange = () => {
  emit('paginationChange', { ...state.subPageInfo })
}

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
  subColumns.value = data.filter(item => unref(item.hideInTable) !== true) as any
}

// 密度
const handleClickDensity = (data: ComponentSize) => {
  state.size = data
}

const handleDragSortEnd = (newIndex: number, oldIndex: number) => {
  emit('dragSortEnd', newIndex, oldIndex)
}

// 刷新
const handleRefresh = () => {
  emit('refresh')
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
  formRefs,
  tableInstance: tableInstance as Ref<TableInstance>
})
</script>
