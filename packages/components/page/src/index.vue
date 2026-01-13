<template>
  <div class="plus-page">
    <component :is="renderWrapper().search" v-if="search">
      <PlusSearch
        ref="plusSearchInstance"
        v-bind="search"
        v-model="values"
        :columns="columns"
        :search-loading="loadingStatus"
        @search="handleSearch"
        @reset="handleReset"
      >
        <template v-if="$slots['search-footer']" #footer="data">
          <slot name="search-footer" v-bind="data" />
        </template>

        <template v-for="(_, key) in searchSlots" :key="key" #[key]="data">
          <slot :name="key" v-bind="data" />
        </template>
      </PlusSearch>
    </component>

    <el-divider v-if="dividerProps" v-bind="dividerProps" />

    <slot name="extra" />

    <component :is="renderWrapper().table" :key="searchSlot" class="plus-page__table_wrapper">
      <PlusTable
        ref="plusTableInstance"
        :title-bar="{ refresh: true }"
        v-bind="table"
        :table-data="tableData"
        :loading-status="loadingStatus"
        :columns="columns"
        :pagination="
          pagination === false
            ? undefined
            : {
                ...pagination,
                total,
                modelValue: pageInfo,
                pageSizeList: computedDefaultPageSizeList
              }
        "
        @paginationChange="handlePaginationChange"
        @refresh="handleRefresh"
      >
        <template v-if="$slots['table-title']" #title>
          <slot name="table-title" />
        </template>

        <template v-if="$slots['table-toolbar']" #toolbar>
          <slot name="table-toolbar" />
        </template>

        <template v-if="$slots['table-expand']" #expand="data">
          <slot name="table-expand" v-bind="data" />
        </template>

        <template v-if="$slots['table-append']" #append>
          <slot name="table-append" />
        </template>

        <template v-if="$slots['table-empty']" #empty>
          <slot name="table-empty" />
        </template>

        <template v-for="(_, key) in tableSlots" :key="key" #[key]="data">
          <slot :name="key" v-bind="data" />
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
  FieldValues,
  PlusCardProps,
  IntrinsicAttributes
} from '@plus-pro-components/types'
import type { PlusSearchProps, PlusSearchInstance } from '@plus-pro-components/components/search'
import { PlusSearch } from '@plus-pro-components/components/search'
import type { PlusTableProps, PlusTableInstance } from '@plus-pro-components/components/table'
import { PlusTable } from '@plus-pro-components/components/table'
import type { PlusPaginationProps } from '@plus-pro-components/components/pagination'
import { h, ref, computed, useSlots } from 'vue'
import { ElCard, ElDivider } from 'element-plus'
import { useTable } from '@plus-pro-components/hooks'
import {
  isPlainObject,
  getFieldSlotName,
  getLabelSlotName,
  getExtraSlotName,
  getPreviousSlotName
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
  request: (params: Partial<PageInfo> & RecordType) => Promise<{
    /** 数据 */
    data: RecordType[]
    /** 不传会使用 data 的长度，如果是分页一定要传*/
    total: number
  }>

  /**
   * PlusSearchProps
   */
  search?: false | Partial<PlusSearchProps & IntrinsicAttributes>
  /**
   * PlusTableProps
   */
  table?: Partial<PlusTableProps & IntrinsicAttributes>

  /**
   * request的 params 其他参数，默认会带pageSize，page和 PlusSearch组件中的值
   */
  params?: RecordType

  /**
   * 对通过 request 获取的数据进行处理
   * @param data
   */
  postData?: <T = RecordType[]>(data: T[]) => T[]
  /**
   * 搜索之前进行一些修改
   * @param params
   */
  beforeSearchSubmit?: <T = RecordType>(params: T) => T

  /**
   *  表格和搜索是否需要el-card 包裹 默认true
   */
  isCard?: boolean
  /**
   * 搜索外层的el-card的props ，当isCard为true时生效
   */
  searchCardProps?: PlusCardProps
  /**
   *   表格外层的el-card的props ，当isCard为true时生效
   */
  tableCardProps?: PlusCardProps
  defaultPageInfo?: PageInfo
  defaultPageSizeList?: number[]
  pagination?: false | Omit<PlusPaginationProps, 'total' | 'modelValue' | 'pageSizeList'>
  /**
   * 组件渲染完成后是否立即调用getList
   */
  immediate?: boolean
  /**
   * 搜索与表格分割线
   */
  dividerProps?: false | Partial<RecordType>

  /**
   * 可以修改默认的分页参数
   */
  pageInfoMap?: { page?: string; pageSize?: string }

  /**
   * 自定义的插槽是否对 PlusSearch 组件提供。当启用时，自定义的插槽 PlusTable 内的表单不生效
   * @version v0.1.25
   * @default false
   */
  searchSlot?: boolean
  /**
   * 重置后是否调用getList
   */
  resetSearch?: boolean
}
export interface PlusPageEmits {
  (e: 'search', data: FieldValues): void
  (e: 'reset', data: FieldValues): void
  (e: 'paginationChange', pageInfo: PageInfo): void
  /**
   * 数据加载失败时触发
   */
  (e: 'requestError', error: unknown): void
  /**
   * 数据加载完成时触发
   */
  (e: 'requestComplete', tableData: RecordType[]): void
}

defineOptions({
  name: 'PlusPage'
})

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
  pagination: () => ({}),
  immediate: true,
  dividerProps: false,
  pageInfoMap: () => ({
    page: 'page',
    pageSize: 'pageSize'
  }),
  searchSlot: false,
  resetSearch: true
})
const emit = defineEmits<PlusPageEmits>()

const formSlotList = [
  getFieldSlotName(),
  getLabelSlotName(),
  getExtraSlotName(),
  getPreviousSlotName()
]

const slots = useSlots()

const group = computed(() => {
  const formSlots = {}
  const otherSlots = {}
  Object.keys(slots).forEach(key => {
    const has = formSlotList.some(i => key.includes(i))
    if (has) {
      formSlots[key] = slots[key]
    } else {
      otherSlots[key] = slots[key]
    }
  })
  return { formSlots, otherSlots }
})

const searchSlots = computed(() => (props.searchSlot ? group.value.formSlots : {}))
const tableSlots = computed(() => (props.searchSlot ? group.value.otherSlots : slots))

const computedDefaultPageInfo = computed(() => props.defaultPageInfo)
const computedDefaultPageSizeList = computed(() => props.defaultPageSizeList)
const { tableData, pageInfo, total, loadingStatus } = useTable(computedDefaultPageInfo)
const plusSearchInstance = ref<PlusSearchInstance | null>(null)
const plusTableInstance = ref<PlusTableInstance | null>(null)
const values = ref<FieldValues>({ ...(props.search as Partial<PlusSearchProps>)?.defaultValues })

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
    const payload: RecordType = {
      ...values.value,
      // eslint-disabled no-useless-spread
      ...{
        [props.pageInfoMap?.page || 'page']: pageInfo.value.page,
        [props.pageInfoMap?.pageSize || 'pageSize']: pageInfo.value.pageSize
      },
      ...props.params
    }
    const { data, total: dataTotal } = await props.request(payload)
    const list = (props.postData && props.postData(data)) || data
    tableData.value = list || []
    total.value = dataTotal || list.length
    emit('requestComplete', tableData.value)
  } catch (error: unknown) {
    emit('requestError', error)
  }
  loadingStatus.value = false
}

if (props.immediate) {
  getList()
}

const handlePaginationChange = (_pageInfo: PageInfo): void => {
  pageInfo.value = _pageInfo
  getList()
  emit('paginationChange', _pageInfo)
}

const handleSearch = (val: FieldValues) => {
  const data = (props.beforeSearchSubmit && props.beforeSearchSubmit(val)) || val
  values.value = data
  pageInfo.value.page = 1
  getList()
  emit('search', values.value)
}

const handleReset = (val: FieldValues) => {
  values.value = { ...val }
  pageInfo.value.page = 1
  props.resetSearch && getList()
  emit('reset', values.value)
}

const handleRefresh = () => {
  getList()
}

/**
 * 设置搜索的值
 * @version v0.1.17
 */
const setSearchFieldsValue = (val: RecordType) => {
  if (isPlainObject(val)) {
    Object.keys(val).forEach(key => {
      Reflect.set(values.value, key, val[key])
    })
  }
}

/**
 * 获取搜索的值
 * @version v0.1.17
 */
const getSearchFieldsValue = (key?: keyof any) => {
  if (key !== undefined && key !== null) {
    return Reflect.get(values.value, key)
  } else {
    return { ...values.value }
  }
}
/**
 * 清空搜索的值
 * @version v0.1.17
 */
const clearSearchFieldsValue = () => {
  values.value = {}
}

/**
 * @version 0.1.23
 */
const setTableData = (data?: RecordType[], _total?: number) => {
  tableData.value = data || []
  total.value = _total || data?.length || 0
}

defineExpose({
  plusSearchInstance,
  plusTableInstance,
  getList,
  handleReset,
  /**
   * TODO: 将会在v0.2.0中移除
   */
  handleRest: handleReset,
  setSearchFieldsValue,
  getSearchFieldsValue,
  clearSearchFieldsValue,
  /**
   * @version 0.1.23
   */
  setTableData
})
</script>
