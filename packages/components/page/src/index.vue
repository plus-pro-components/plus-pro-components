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
        <template v-if="$slots['search-footer']" #footer>
          <slot name="search-footer" />
        </template>
      </PlusSearch>
    </component>

    <component :is="renderWrapper().table" class="plus-page__table_wrapper">
      <PlusTable
        ref="plusTableInstance"
        :table-data="tableData"
        :loading-status="loadingStatus"
        :columns="columns"
        :pagination="{ total, modelValue: pageInfo }"
        :title-bar="{ refresh: true }"
        v-bind="table"
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
import { h, reactive, ref, useSlots } from 'vue'
import type { CardProps } from 'element-plus'
import { ElCard } from 'element-plus'
import { useTable } from '@plus-pro-components/hooks'
import {
  getTableCellSlotName,
  getTableHeaderSlotName,
  getFieldSlotName,
  filterSlots
} from '@plus-pro-components/components/utils'

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
}
export interface PlusPageEmits {
  /**
   * 数据加载失败时触发
   */
  (e: 'requestError', error: any): void
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
  searchCardProps: () => ({}),
  tableCardProps: () => ({})
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

const { tableData, pageInfo, total, loadingStatus } = useTable()
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
}

const handleSearch = (values: any) => {
  const data = (props.beforeSearchSubmit && props.beforeSearchSubmit(values)) || values
  state.params = data
  getList()
}

const handleRest = (values: any) => {
  state.params = { ...values }
  pageInfo.value.page = 1
  getList()
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
