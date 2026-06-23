<template>
  <div ref="tableWrapperInstance" class="plus-table">
    <PlusTableTitleBar
      v-if="titleBar"
      :origin-columns="columns"
      :columns="filterColumns"
      :default-size="size"
      :columns-is-change="columnsIsChange"
      :title-bar="titleBar"
      @click-density="handleClickDensity"
      @filter-table-header="handleFilterTableConfirm"
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
      :data="__tableData"
      :border="true"
      :height="height"
      :header-cell-style="headerCellStyle"
      :size="size"
      :row-key="rowKey"
      highlight-current-row
      scrollbar-always-on
      v-bind="$attrs"
      @cell-click="handleClickCell"
      @cell-dblclick="handleDoubleClickCell"
    >
      <!-- 默认插槽 -->
      <template #default>
        <!-- 内置特殊列，支持通过 specialColumnsOrder 调整展示顺序 -->
        <template v-for="columnType in sortedSpecialColumns" :key="columnType">
          <!-- 单选选择栏 -->
          <el-table-column
            v-if="columnType === 'radio'"
            key="radio-selection"
            v-bind="radioTableColumnProps"
          >
            <template #default="scoped">
              <PlusRadio
                :model-value="isEqual(radioRow, scoped.row)"
                :options="[{ value: true }]"
                v-bind="radioProps"
                @change="value => handleRadioChange(value, scoped.row, scoped.$index)"
              />
            </template>
          </el-table-column>

          <!-- 多选选择栏 -->
          <el-table-column
            v-if="columnType === 'selection'"
            key="selection"
            type="selection"
            v-bind="selectionTableColumnProps"
          />

          <!-- 序号栏 -->
          <PlusTableTableColumnIndex
            v-if="columnType === 'index'"
            :index-content-style="indexContentStyle"
            :index-table-column-props="indexTableColumnProps"
            :page-info="(pagination as PlusPaginationProps)?.modelValue"
          />

          <!-- 拖拽行 -->
          <PlusTableColumnDragSort
            v-if="columnType === 'dragSort'"
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
          <el-table-column
            v-if="columnType === 'expand'"
            type="expand"
            v-bind="expandTableColumnProps"
          >
            <template #default="scoped">
              <div class="plus-table-expand-col">
                <slot name="expand" :index="scoped.$index" v-bind="scoped" />
              </div>
            </template>
          </el-table-column>
        </template>

        <slot name="default">
          <!--配置渲染栏  -->
          <PlusTableColumn
            :columns="subColumns"
            :editable="editable"
            :sub-page-info="subPageInfo"
            :table-data-length="tableDataLength"
            :empty-value="emptyValue"
            @formChange="handleFormChange"
          >
            <template v-for="(_, key) in $slots" :key="key" #[key]="data">
              <slot :name="key" v-bind="data" />
            </template>
          </PlusTableColumn>
        </slot>
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
      </template>

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
      ref="paginationInstance"
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
import {
  nextTick,
  reactive,
  toRefs,
  watch,
  ref,
  provide,
  shallowRef,
  unref,
  computed,
  onMounted,
  onBeforeUnmount,
  watchEffect
} from 'vue'
import type {
  PlusPaginationProps,
  PlusPaginationInstance
} from '@plus-pro-components/components/pagination'
import { PlusPagination } from '@plus-pro-components/components/pagination'
import type { PlusRadioProps } from '@plus-pro-components/components/radio'
import { PlusRadio } from '@plus-pro-components/components/radio'
import {
  DefaultPageInfo,
  TableFormRefInjectionKey,
  TableFormFieldRefInjectionKey
} from '@plus-pro-components/constants'
import type { Ref } from 'vue'
import type { ComponentSize } from 'element-plus/es/constants'
import type { TableInstance } from 'element-plus'
import { ElTable, ElTableColumn, vLoading } from 'element-plus'
import type {
  PageInfo,
  PlusColumn,
  RecordType,
  FormFieldRefsType
} from '@plus-pro-components/types'
import { isSVGElement, isPlainObject } from '@plus-pro-components/components/utils'
import { debounce, isEqual } from 'lodash-es'
import PlusTableActionBar from './table-action-bar.vue'
import PlusTableColumn from './table-column.vue'
import PlusTableTableColumnIndex from './table-column-index.vue'
import PlusTableColumnDragSort from './table-column-drag-sort.vue'
import PlusTableTitleBar from './table-title-bar.vue'
import type {
  ButtonsCallBackParams,
  PlusTableState,
  PlusTableSelfProps as PlusTableProps,
  PlusTableEmits,
  TableFormRefRow,
  FormChangeCallBackParams,
  FilterTableHeaderEventType,
  TableSpecialColumnType
} from './type'

defineOptions({
  name: 'PlusTable',
  inheritAttrs: false
})

const props = withDefaults(defineProps<PlusTableProps>(), {
  defaultSize: 'default',
  pagination: false,
  actionBar: false,
  hasIndexColumn: false,
  titleBar: true,
  isSelection: false,
  isRadio: false,
  hasExpand: false,
  loadingStatus: false,
  tableData: () => [],
  data: () => [],
  columns: () => [],
  headerCellStyle: () => ({
    'background-color': 'var(--el-fill-color-light)'
  }),
  rowKey: 'id',
  dragSortable: false,
  dragSortableTableColumnProps: () => ({}),
  indexTableColumnProps: () => ({}),
  indexContentStyle: () => ({}),
  selectionTableColumnProps: () => ({
    width: 40
  }),
  radioTableColumnProps: () => ({
    width: 50
  }),
  defaultSelectedRadioRow: undefined,
  radioProps: undefined,
  expandTableColumnProps: () => ({}),
  specialColumnsOrder: () => ['radio', 'selection', 'index', 'dragSort', 'expand'],
  editable: false,
  adaptive: false,
  emptyValue: undefined
})
const emit = defineEmits<PlusTableEmits>()

const radioRow = ref()

const subColumns: Ref<PlusColumn[]> = ref([])
const columnsIsChange: Ref<boolean> = ref(false)
const filterColumns: Ref<PlusColumn[]> = ref([])
const tableInstance = shallowRef<TableInstance | null>(null)
const tableWrapperInstance = ref<HTMLDivElement | null>(null)
const paginationInstance = ref<PlusPaginationInstance | null>(null)
const state = reactive<PlusTableState>({
  subPageInfo: {
    ...(((props.pagination as PlusPaginationProps)?.modelValue || DefaultPageInfo) as PageInfo)
  },
  size: props.defaultSize
})
const cachedTableData = ref<RecordType[]>([])

watchEffect(() => {
  cachedTableData.value = props.tableData?.length ? props.tableData : props.data
})

const __tableData = computed(() => cachedTableData.value)
const tableDataLength = computed(() => __tableData.value.length)

const hasAdaptive = computed(() => typeof props.height === 'undefined' && props.adaptive)

const defaultSpecialColumnsOrder: TableSpecialColumnType[] = [
  'radio',
  'selection',
  'index',
  'dragSort',
  'expand'
]

const activeSpecialColumns = computed<TableSpecialColumnType[]>(() => {
  const columns: TableSpecialColumnType[] = []
  if (props.isRadio) columns.push('radio')
  if (props.isSelection) columns.push('selection')
  if (props.hasIndexColumn) columns.push('index')
  if (props.dragSortable) columns.push('dragSort')
  if (props.hasExpand) columns.push('expand')
  return columns
})

const sortedSpecialColumns = computed<TableSpecialColumnType[]>(() => {
  // 只排序已启用的特殊列，未写入配置的启用列按默认顺序追加
  const order = [...(props.specialColumnsOrder || []), ...defaultSpecialColumnsOrder]
  const orderedColumns = order.filter((item, index) => order.indexOf(item) === index)

  return orderedColumns.filter(item => activeSpecialColumns.value.includes(item))
})

console.log('sortedSpecialColumns', sortedSpecialColumns.value)

/**
 * 表单的ref
 */
const formRefs = shallowRef<Record<string | number, TableFormRefRow[]>>({})
provide(TableFormRefInjectionKey, formRefs)
/**
 * 表单Field的ref
 */
const formFieldRefs = shallowRef<FormFieldRefsType>({})
provide(TableFormFieldRefInjectionKey, formFieldRefs)

// 监听配置更改
watch(
  () => props.columns,
  val => {
    const filterOriginColumns = val.filter(item => unref(item.hideInTable) !== true)

    // 用于表头过滤的数据
    filterColumns.value = filterOriginColumns.map(item => ({
      ...item,
      headerIsChecked: item.headerIsChecked ?? true
    }))

    // 用于实际显示的数据
    subColumns.value = filterOriginColumns.filter(item => unref(item.headerIsChecked) !== false)

    columnsIsChange.value = !columnsIsChange.value
  },
  {
    immediate: true
  }
)

watch(
  () => props.defaultSelectedRadioRow,
  val => {
    radioRow.value = val ? unref(props.defaultSelectedRadioRow) : {}
  },
  {
    immediate: true
  }
)

// 发分页改变事件
const handlePaginationChange = () => {
  emit('paginationChange', { ...state.subPageInfo })
}

const handleAction = (callbackParams: ButtonsCallBackParams) => {
  emit('clickAction', callbackParams)
}

const handleClickActionConfirmCancel = (callbackParams: ButtonsCallBackParams) => {
  emit('clickActionConfirmCancel', callbackParams)
}

// 表头过滤
const handleFilterTableConfirm = (
  _columns: PlusColumn[],
  eventType: FilterTableHeaderEventType
) => {
  filterColumns.value = _columns

  // 分发表头过滤事件
  emit('filterTableHeader', _columns, eventType)

  subColumns.value = _columns.filter(
    item => unref(item.hideInTable) !== true && item.headerIsChecked !== false
  )
}

// 密度
const handleClickDensity = (size: ComponentSize) => {
  state.size = size
}

const handleDragSortEnd = (newIndex: number, oldIndex: number) => {
  emit('dragSortEnd', newIndex, oldIndex)
}

// 刷新
const handleRefresh = () => {
  emit('refresh')
}

const handleFormChange = (data: FormChangeCallBackParams) => {
  emit('formChange', data)
}

const handleRadioChange = (value: PlusRadioProps['modelValue'], row: RecordType, index: number) => {
  radioRow.value = value ? row : {}
  emit('radioChange', row, index, !!value)
}

// 保存活动的表单
const currentForm = ref()

const handleCellEdit = (row: RecordType, column: PlusColumn, type: 'click' | 'dblclick') => {
  const rowIndex = __tableData.value.indexOf(row)
  const columnIndex = column.getColumnIndex()
  const columnConfig = subColumns.value[columnIndex]

  // 不是可编辑行，如操作栏
  if (!columnConfig) return

  if (props.editable === type) {
    const currentCellForm = formRefs.value[rowIndex][columnIndex]

    // 不是可编辑行，如索引栏，多选栏
    if (!currentCellForm) return

    document.addEventListener('click', handleStopEditClick)

    // 停止上一个表单的编辑状态
    if (currentForm.value) {
      currentForm.value?.stopCellEdit()
    }
    currentForm.value = currentCellForm

    // 开启当前点击的单元格的编辑
    currentCellForm.startCellEdit()

    // 当表单初始化完成
    const unwatch = watch(
      () => formFieldRefs.value.valueIsReady,
      val => {
        if (
          val?.value &&
          formFieldRefs.value?.fieldInstance?.focus &&
          (props.editable === 'click' || props.editable === 'dblclick')
        ) {
          formFieldRefs.value.fieldInstance.focus()
          // 销毁监听
          unwatch()
        }
      }
    )
  }
}

const handleClickCell = (
  row: RecordType,
  column: PlusColumn,
  cell: HTMLTableCellElement,
  event: Event
) => {
  handleCellEdit(row, column, 'click')
  emit('cell-click', row, column, cell, event)
}

const handleDoubleClickCell = (
  row: RecordType,
  column: PlusColumn,
  cell: HTMLTableCellElement,
  event: Event
) => {
  handleCellEdit(row, column, 'dblclick')
  emit('cell-dblclick', row, column, cell, event)
}

// 退出编辑状态
const handleStopEditClick = (e: MouseEvent) => {
  if (tableWrapperInstance.value && currentForm.value) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const target = e?.target as HTMLElement

    if (target.classList.contains('el-icon')) {
      return
    }

    const contains = tableWrapperInstance.value?.contains(target)

    if (!contains && !isSVGElement(target)) {
      currentForm.value?.stopCellEdit()
      emit('edited')
      document.removeEventListener('click', handleStopEditClick)
    }
  }
}

const setAdaptive = async () => {
  await nextTick()
  if (!tableInstance.value) return
  const tableWrapper = tableInstance.value.$el
  let offsetBottom = 20
  let paginationHeight = 0

  if (isPlainObject(props.adaptive)) {
    offsetBottom = props.adaptive.offsetBottom ?? offsetBottom
  }
  if (paginationInstance.value && props.pagination) {
    paginationHeight = paginationInstance.value.$el.offsetHeight
  }

  tableWrapper.style.height = `${
    window.innerHeight - tableWrapper.getBoundingClientRect().top - offsetBottom - paginationHeight
  }px`
}

const debounceSetAdaptive = debounce(
  setAdaptive,
  isPlainObject(props.adaptive) ? props.adaptive.timeout ?? 60 : 60
)

onMounted(() => {
  if (hasAdaptive.value) {
    setAdaptive()
    window.addEventListener('resize', debounceSetAdaptive)
  }
})

onBeforeUnmount(() => {
  if (hasAdaptive.value) {
    window.removeEventListener('resize', debounceSetAdaptive)
  }
})

const { subPageInfo, size } = toRefs(state)

defineExpose({
  formRefs,
  tableInstance
})
</script>
