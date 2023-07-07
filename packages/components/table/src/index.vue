<template>
  <!--  eslint-disable vue/no-v-html  -->
  <div class="plus-table">
    <div class="plus-table-header">
      <div>
        <div v-if="tableTitle" class="plus-table-title">{{ tableTitle }}</div>

        <div class="plus-table-title">
          <slot name="title" />
        </div>
      </div>
      <div>
        <slot name="button" />
        <!-- 表格密度 -->
        <PlusPopover
          :has-filter-table-header="hasFilterTableHeader"
          placement="bottom"
          :width="150"
          trigger="click"
          title="密度"
        >
          <el-button
            v-for="item in buttonNameDensity"
            :key="item.id"
            :color="item.color"
            plain
            :style="item?.style"
            size="small"
            @click="handleClickDensity(item.size)"
          >
            {{ item.text }}
          </el-button>
          <template #icon>
            <el-icon :size="20" color="#919191" class="plus-table-popover">
              <Guide />
            </el-icon>
          </template>
        </PlusPopover>
        <!-- 筛选表格 -->
        <PlusPopover
          :has-filter-table-header="hasFilterTableHeader"
          placement="bottom"
          :width="100"
          trigger="click"
          title="筛选表格"
          :has-show-bottom-button="true"
          @confirm="handleFilterTableConfirm"
          @show="handleShow"
        >
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
            >全选</el-checkbox
          >
          <el-checkbox-group
            v-model="checkList"
            class="plus-table-filter-dialog-checkbox"
            @change="handleCheckGroupChange"
          >
            <el-checkbox
              v-for="(item, index) in config"
              :key="item.label"
              :label="item.label"
              :disabled="index === config.length - 1 || item.disableHeaderFilter"
            >
              <el-tooltip
                v-if="item.label?.length > LabelLength"
                class="plus-table-filter-dialog-checkbox-item"
                :content="item.label"
                placement="right-start"
              >
                {{ getLabel(item.label) }}
              </el-tooltip>
              <span v-else> {{ getLabel(item.label) }}</span>
            </el-checkbox>
          </el-checkbox-group>
          <template #icon>
            <el-icon :size="20" color="#919191" class="plus-table-popover">
              <Setting />
            </el-icon>
          </template>
        </PlusPopover>
      </div>
    </div>
    <el-table
      ref="multipleTable"
      v-loading="loadingStatus"
      :reserve-selection="true"
      :data="tableData"
      :border="true"
      :height="height"
      :header-cell-style="headerCellStyle"
      :size="size"
      highlight-current-row
      scrollbar-always-on
      class="table"
      v-bind="$attrs"
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
      <IndexColumn :show="isShowNumber" :sub-page-info="pagination.modelValue" align="left" />
      <DragSortColumn :show-drag-sort="isShowDragSort" @subSortEnd="subSortEnd" />
      <!-- <el-table-column v-if="isShowDragSort" label="排序">111</el-table-column> -->
      <!-- 展开行 -->
      <el-table-column v-if="hasExpand" type="expand">
        <template #default="{ row, $index }">
          <div class="plus-table-expand-col">
            <slot name="expand" :row="row" :index="$index" />
          </div>
        </template>
      </el-table-column>

      <!--配置渲染栏  -->
      <CustomColumn :config="subConfig" @clickToEnlargeImage="handelClickToEnlargeImage" />
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
    <PlusImagePreview v-model="bigImageVisible" :src-list="srcList" />
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, watch, ref, nextTick } from 'vue'
import { ElTable } from 'element-plus'
import { deepClone as cloneDeep } from '@plus-pro-components/utils'
import { Setting, Guide } from '@element-plus/icons-vue'
import PlusPagination from '@plus-pro-components/components/pagination'
import { defaultPageSizeList, defaultPageInfo } from '@plus-pro-components/constants'
import type { PlusImagePreviewRow } from '@plus-pro-components/components/image-preview'
import PlusImagePreview from '@plus-pro-components/components/image-preview'
import type { PlusPaginationProps } from '@plus-pro-components/components/pagination'
import type { CSSProperties } from 'vue'
import type { ComponentSize } from 'element-plus/es/constants'
import PlusPopover from '@plus-pro-components/components/popover'
import type { PageInfo } from '@plus-pro-components/types'
import PlusTableActionBar from './table-action-bar.vue'
import CustomColumn from './table-column.vue'
import IndexColumn from './table-column-index.vue'
import DragSortColumn from './table-column-drag-sort.vue'
import type {
  ButtonsCallBackParams,
  TableState,
  SortParams,
  ActionBarProps,
  TableConfigRow
} from './type'

/**
 * 表格数据
 */
export interface PlusTableProps {
  // 密度
  size?: ComponentSize
  /* 分页参数*/
  pagination?: PlusPaginationProps
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
  height?: string
  /* 表格数据*/
  tableData: any[]
  /* 表格配置信息*/
  config: TableConfigRow[]
  /* 表格头样式*/
  headerCellStyle?: CSSProperties
  // 是否可拖拽
  isShowDragSort?: boolean
  rowKey?: string
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
}

defineOptions({
  name: 'PlusTable'
})

const LabelLength = 6
const props = withDefaults(defineProps<PlusTableProps>(), {
  size: 'small',
  pagination: () => ({
    show: true,
    total: 0,
    pageSizeList: [...defaultPageSizeList],
    modelValue: { ...defaultPageInfo }
  }),
  actionBar: () => ({
    show: true,
    label: '',
    fixed: 'right',
    optionColumnWidth: 200,
    buttonCount: 3,
    buttonsName: {}
  }),
  isShowNumber: true,
  hasFilterTableHeader: true,
  isSelection: false,
  hasExpand: false,
  loadingStatus: false,
  tableTitle: '',
  height: '60vh',
  tableData: () => [],
  config: () => [],
  headerCellStyle: () => ({
    backgroundColor: '#F5F9FD',
    color: '#777'
  }),
  isShowDragSort: false,
  rowKey: 'id'
})

const emit = defineEmits<PlusTableEmits>()

const multipleTable = ref<InstanceType<typeof ElTable>>()
const state = reactive<TableState>({
  checkAll: false,
  isIndeterminate: true,
  bigImageVisible: false,
  srcList: [],
  subPageInfo: { ...((props.pagination.modelValue || defaultPageInfo) as PageInfo) },
  subConfig: cloneDeep(props.config),
  checkList: cloneDeep(props.config).map(i => i.label),
  size: 'small',
  buttonNameDensity: [
    {
      id: 1,
      color: '#666',
      size: 'small',
      text: '紧凑',
      style: 'display: block;margin-left: 12px;margin-bottom: 10px'
    },
    {
      id: 2,
      color: '#666',
      size: 'default',
      text: '中等',
      style: 'display: block;margin-bottom: 10px'
    },
    {
      id: 3,
      color: '#666',
      size: 'large',
      text: '默认',
      style: 'display: block;margin-bottom: 10px'
    }
  ]
})
// 监听配置更改
watch(
  () => props.config,
  val => {
    state.subConfig = val as any
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
watch(
  () => props.size,
  (val: string) => {
    state.size = val
  },
  {
    immediate: true
  }
)
const handleCheckAllChange = (val: boolean) => {
  state.checkList = val
    ? cloneDeep(props.config).map(i => i.label)
    : cloneDeep(props.config)
        .map(i => i.label)
        .slice(-1)
  state.isIndeterminate = false
}
const handleCheckGroupChange = (value: string[]) => {
  const checkedCount = value.length
  state.checkAll = checkedCount === props.config.length
  state.isIndeterminate = checkedCount > 0 && checkedCount < props.config.length
}
const handleShow = () => {
  const checkedCount = state.checkList.length
  state.checkAll = checkedCount === props.config.length
  state.isIndeterminate = checkedCount > 0 && checkedCount < props.config.length
}
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
  multipleTable.value?.setCurrentRow(row)
}
// 设置checkedBox行
const toggleRowSelection = (row: any, selected: boolean) => {
  multipleTable.value?.toggleRowSelection(row, selected)
}
// 重新布局
const doLayout = () => {
  nextTick(() => {
    multipleTable.value?.doLayout()
  })
}
// 滚动
const scrollTo = (data: ScrollToOptions = { left: 0, top: 0 }) => {
  nextTick(() => {
    multipleTable.value?.scrollTo(data)
  })
}
// 点击放大图片
const handelClickToEnlargeImage = (srcList: PlusImagePreviewRow[]) => {
  state.srcList = srcList?.length ? srcList : []
  state.bigImageVisible = true
}

const handleFilterTableConfirm = () => {
  const config = cloneDeep(props.config)
  state.subConfig = config.filter(item => state.checkList.includes(item.label)) as any
}

const getLabel = (label: string) => {
  if (label?.length <= LabelLength) {
    return label
  }
  return label?.slice(0, LabelLength) + '...'
}
// 多选处理
const handleSelectionChange = (data: any[]) => {
  emit('subSelected', data)
}
// 密度
const handleClickDensity = (data: string) => {
  state.buttonNameDensity.forEach(el => {
    if (el.size === data) {
      el.color = '#1677ff'
    } else {
      el.color = '#666'
    }
  })
  state.size = data
}
const subSortEnd = (newIndex: number, oldIndex: number) => {
  emit('subSortEnd', newIndex, oldIndex)
}

handleClickDensity(state.size || props.size || 'small')
const {
  bigImageVisible,
  srcList,
  subPageInfo,
  subConfig,
  checkList,
  size,
  buttonNameDensity,
  checkAll,
  isIndeterminate
} = toRefs(state)

// 暴露方法到外部调用
defineExpose({
  scrollTo,
  doLayout,
  toggleRowSelection,
  setCurrent
})
</script>

<style lang="scss">
.plus-table {
  position: relative;
  .plus-table-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .plus-table-popover {
      margin-left: 10px;
      vertical-align: bottom;
      cursor: pointer;
    }
  }

  .plus-table-title-setting {
    position: absolute;
    top: -50px;
    right: 0;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
  }
  .plus-table-title-title {
    margin-bottom: 21px;
    color: #333;
  }
  .plus-table-title-expand-col {
    padding: 0;
  }

  .el-table .cell {
    line-height: 12px;
  }
  .el-table__body-wrapper .el-table__body .el-table__row td {
    border-right: 0;
  }
  .el-table--border th.el-table__cell {
    border: none;
    ::before {
      position: absolute;
      top: 50%;
      inset-inline-end: 0;
      width: 1px;
      height: 1.6em;
      background-color: #ccc;
      transform: translateY(-50%);
      transition: background-color 0.2s;
      content: '';
    }
  }
}

.plus-table-filter-dialog {
  .plus-table-filter-dialog-checkbox {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    padding: 0 10px;
    margin-top: -10px;

    .el-checkbox {
      flex: 0 0 124px;
    }

    .el-checkbox:nth-of-type(4n) {
      margin: 0;
    }
  }
}
</style>
