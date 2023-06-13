<template>
  <!--  eslint-disable vue/no-v-html  -->
  <div class="plus-table">
    <div v-if="tableTitle" class="plus-table-title">{{ tableTitle }}</div>

    <div class="plus-table-title">
      <slot name="title" />
    </div>

    <div
      v-if="hasFilterTableHeader"
      class="plus-table-title-setting"
      :style="{
        top: tableTitle ? '-20px' : '-50px'
      }"
      @click="filterTableDialogVisible = true"
    >
      <el-icon :size="20" color="#919191">
        <Setting />
      </el-icon>
    </div>

    <el-table
      ref="multipleTable"
      v-loading="loadingStatus"
      :reserve-selection="true"
      :data="tableData"
      :border="true"
      :height="height"
      :header-cell-style="headerCellStyle"
      highlight-current-row
      scrollbar-always-on
      class="table"
      v-bind="$attrs"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
      @row-click="handleClickRow"
      @current-change="handleTableCurrentChange"
      @expand-change="handleExpandChange"
    >
      <!-- 选择栏 -->
      <el-table-column v-if="isSelection" key="selection" type="selection" width="34" />
      <!-- 序号栏 -->
      <IndexColumn
        :is-show-number="isShowNumber"
        :sub-page-info="pagination.modelValue"
        align="left"
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

  <!-- 过滤表头弹窗 -->
  <PlusDialog
    v-model="filterTableDialogVisible"
    title="筛选表格"
    width="640px"
    top="20vh"
    class="plus-table-filter-dialog"
    has-footer
    @confirm="handleFilterTableConfirm"
  >
    <el-checkbox-group v-model="checkList" class="plus-table-filter-dialog-checkbox">
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
  </PlusDialog>
</template>

<script lang="ts" setup>
import { reactive, toRefs, watch, ref, nextTick } from 'vue'
import { ElTable } from 'element-plus'
import { cloneDeep } from 'lodash-es'
import { Setting } from '@element-plus/icons-vue'
import PlusPagination from '@plus-pro-components/components/pagination'
import { defaultPageSizeList, defaultPageInfo } from '@plus-pro-components/constants'
import type { PlusImagePreviewRow } from '@plus-pro-components/components/image-preview'
import PlusImagePreview from '@plus-pro-components/components/image-preview'
import PlusDialog from '@plus-pro-components/components/dialog'
import type { PlusPaginationProps } from '@plus-pro-components/components/pagination'
import type { CSSProperties } from 'vue'
import PlusTableActionBar from './table-action-bar.vue'
import CustomColumn from './table-column.vue'
import IndexColumn from './table-column-index.vue'
import type {
  ButtonsCallBackParams,
  TableState,
  SortParams,
  ActionBarProps,
  TableConfigRow
} from './type'

const LabelLength = 6

/**
 * 表格数据
 */
export interface PlusTableProps {
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
}

export interface PlusTableEmits {
  (e: 'subPaginationChange', pageInfo: PageInfo): void
  (e: 'subSelected', data: any): void
  (e: 'subCurrent', data: any): void
  (e: 'subExpandChange', data: any): void
  (e: 'subSortChange', data: any): void
  (e: 'subClickRow', row: any, column: any, event: any): void
  (e: 'subClickButton', data: any): void
}

defineOptions({
  name: 'PlusTable'
})

const props = withDefaults(defineProps<PlusTableProps>(), {
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
  })
})

const emit = defineEmits<PlusTableEmits>()

const multipleTable = ref<InstanceType<typeof ElTable>>()
const state = reactive<TableState>({
  bigImageVisible: false,
  srcList: [],
  subPageInfo: { ...((props.pagination.modelValue || defaultPageInfo) as PageInfo) },
  filterTableDialogVisible: false,
  subConfig: cloneDeep(props.config),
  checkList: cloneDeep(props.config).map(i => i.label)
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
const handleClickRow = (row: any, column: any, event: PointerEvent) => {
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
  state.filterTableDialogVisible = false
}

const getLabel = (label: string) => {
  if (label?.length <= LabelLength) {
    return label
  }
  return label?.slice(0, LabelLength) + '...'
}
// 多选处理
const handleSelectionChange = (data: any) => {
  emit('subSelected', data)
}

const { bigImageVisible, srcList, subPageInfo, filterTableDialogVisible, subConfig, checkList } =
  toRefs(state)

// 暴露画布生成图片方法到外部调用
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
    border: 1px solid #e6e6e6;
    border-radius: 3px;
  }
  .plus-table-title-title {
    margin-bottom: 21px;
    color: #333;
  }
  .plus-table-title-expand-col {
    padding: 0;
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
