<template>
  <div class="plus-page">
    <component :is="renderWrapper().search" v-if="search">
      <PlusSearch
        ref="plusSearchInstance"
        v-bind="search"
        v-model="state.params"
        :columns="columns"
        :search-loading="loadingStatus"
        @search="handleSearch"
        @reset="handleRest"
      >
        <template v-if="$slots['search-footer']" #footer="data">
          <slot name="search-footer" v-bind="data" />
        </template>
      </PlusSearch>
    </component>

    <component :is="renderWrapper().table" class="plus-page__table_wrapper">
      <PlusTable
        ref="plusTableInstance"
        :title-bar="{ refresh: true }"
        v-bind="table"
        :table-data="tableData"
        :loading-status="loadingStatus"
        :columns="columns"
        :pagination="{
          ...pagination,
          total,
          modelValue: pageInfo,
          pageSizeList: computedDefaultPageSizeList
        }"
        @paginationChange="handlePaginationChange"
        @refresh="handleRefresh"
      >
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

        <template v-if="$slots['table-title']" #title>
          <slot name="table-title" />
        </template>

        <template v-if="$slots['table-toolbar']" #toolbar>
          <slot name="table-toolbar" />
        </template>

        <template v-if="$slots['table-expand']" #expand>
          <slot name="table-expand" />
        </template>

        <template v-if="$slots['table-append']" #append>
          <slot name="table-append" />
        </template>

        <template v-if="$slots['table-empty']" #empty>
          <slot name="table-empty" />
        </template>

        <template v-if="$slots['pagination-left']" #pagination-left>
          <slot name="pagination-left" />
        </template>

        <template v-if="$slots['pagination-right']" #pagination-right>
          <slot name="pagination-right" />
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

        <!--table tooltip-icon  插槽 -->
        <template v-if="$slots['tooltip-icon']" #tooltip-icon>
          <slot name="tooltip-icon" />
        </template>
        <!--table 操作栏更多icon插槽 -->
        <template v-if="$slots['action-bar-more-icon']" #action-bar-more-icon>
          <slot name="action-bar-more-icon" />
        </template>
      </PlusTable>
    </component>
  </div>
</template>

<script lang="ts" setup>
import type {
  PlusColumn,
  PageInfo,
  RecordType,
  Mutable,
  FieldValues
} from '@plus-pro-components/types'
import type { PlusSearchProps, PlusSearchInstance } from '@plus-pro-components/components/search'
import { PlusSearch as PlusSearchComponent } from '@plus-pro-components/components/search'
import type { PlusTableProps, PlusTableInstance } from '@plus-pro-components/components/table'
import { PlusTable as PlusTableComponent } from '@plus-pro-components/components/table'
import type { Ref, Component } from 'vue'
import { h, reactive, ref, useSlots, computed } from 'vue'
import type { CardProps } from 'element-plus'
import { ElCard } from 'element-plus'
import { useTable } from '@plus-pro-components/hooks'
import {
  getTableCellSlotName,
  getTableHeaderSlotName,
  getFieldSlotName,
  filterSlots
} from '@plus-pro-components/components/utils'
import { DefaultPageInfo, DefaultPageSizeList } from '@plus-pro-components/constants'

export interface PlusPageProps {
  /**
   * 配置
   */
  columns: PlusColumn[]
  /**
   *
   * params参数中一定会有 pageSize 和  page ，这两个参数是 plus-pro-components 的规范
   * @param params
   */
  request: (params: PageInfo & { [index: string]: any }) => Promise<{
    /** 数据 */
    data: any
    /** 不传会使用 data 的长度，如果是分页一定要传*/
    total: number
  }>

  /**
   * PlusSearchProps
   */
  search?: false | Partial<PlusSearchProps>
  /**
   * PlusTableProps
   */
  table?: Partial<PlusTableProps>

  /**
   * request的 params 其他参数，默认会带pageSize，page和 PlusSearch组件中的值
   */
  params?: RecordType

  /**
   * 对通过 request 获取的数据进行处理
   * @param data
   */
  postData?: <T = any>(data: T[]) => T[]
  /**
   * 搜索之前进行一些修改
   * @param params
   */
  beforeSearchSubmit?: <T = any>(params: T) => T

  /**
   *  表格和搜索是否需要el-card 包裹 默认true
   */
  isCard?: boolean
  /**
   * 搜索外层的el-card的props ，当isCard为true时生效
   */
  searchCardProps?: Partial<Mutable<CardProps>>
  /**
   *   表格外层的el-card的props ，当isCard为true时生效
   */
  tableCardProps?: Partial<Mutable<CardProps>>
  defaultPageInfo?: PageInfo
  defaultPageSizeList?: number[]
  pagination?: RecordType
}
export interface PlusPageEmits {
  /**
   * 数据加载失败时触发
   */
  (e: 'requestError', error: any): void
  (e: 'search', data: FieldValues): void
  (e: 'reset', data: FieldValues): void
  (e: 'paginationChange', pageInfo: PageInfo): void
}
export interface PlusPageState {
  params: FieldValues
  values: FieldValues
}

const props = withDefaults(defineProps<PlusPageProps>(), {
  params: () => ({}),
  columns: () => [],
  postData: undefined,
  beforeSearchSubmit: undefined,
  isCard: true,
  // eslint-disable-next-line vue/require-valid-default-prop
  search: () => ({}),
  table: () => ({}),
  defaultPageInfo: () => ({ ...DefaultPageInfo }),
  defaultPageSizeList: () => DefaultPageSizeList,
  searchCardProps: () => ({}),
  tableCardProps: () => ({}),
  /**
   * 分页组件的其他参数，不包含total，modelValue，pageSizeList
   */
  pagination: () => ({})
})
const emit = defineEmits<PlusPageEmits>()

defineOptions({
  name: 'PlusPage'
})

/**
 * FIXME: The inferred type of this node exceeds the maximum length the compiler will serialize. An explicit type annotation is needed.
 */
const PlusSearch: Component = PlusSearchComponent
const PlusTable: Component = PlusTableComponent

const computedDefaultPageInfo = computed(() => props.defaultPageInfo)
const computedDefaultPageSizeList = computed(() => props.defaultPageSizeList)

const { tableData, pageInfo, total, loadingStatus } = useTable(computedDefaultPageInfo)
const plusSearchInstance = ref<any>()
const plusTableInstance = ref<any>()
const state: PlusPageState = reactive({
  params: { ...(props.search as any)?.defaultValues },
  values: {}
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

/** 渲染包裹层 */
const renderWrapper = () => {
  if (props.isCard) {
    return {
      search: h(ElCard, props.searchCardProps),
      table: h(ElCard, props.tableCardProps)
    }
  }
  return { search: h('div'), table: h('div') }
}

const getList = async () => {
  if (!props.request) return
  try {
    loadingStatus.value = true
    const { data, total: dataTotal } = await props.request({
      ...state.params,
      ...pageInfo.value,
      ...props.params
    })
    const list = (props.postData && props.postData(data)) || data
    tableData.value = list || []
    total.value = dataTotal || list.length
  } catch (error: any) {
    emit('requestError', error)
  }
  loadingStatus.value = false
}
getList()

const handlePaginationChange = (_pageInfo: PageInfo): void => {
  pageInfo.value = _pageInfo
  getList()

  emit('paginationChange', _pageInfo)
}

const handleSearch = (values: any) => {
  const data = (props.beforeSearchSubmit && props.beforeSearchSubmit(values)) || values
  state.params = data
  getList()
  emit('search', state.params)
}

const handleRest = (values: any) => {
  state.params = { ...values }
  pageInfo.value.page = 1
  getList()
  emit('reset', state.params)
}

const handleRefresh = () => {
  getList()
}

defineExpose({
  plusSearchInstance: plusSearchInstance as Ref<PlusSearchInstance>,
  plusTableInstance: plusTableInstance as Ref<PlusTableInstance>,
  getList,
  handleRest
})
</script>
