<template>
  <div>
    <PlusTable
      :columns="tableConfig"
      :table-data="tableData"
      table-title="表格"
      :pagination="{ total, modelValue: pageInfo }"
      @paginationChange="handlePaginationChange"
    />
  </div>
</template>

<script lang="ts" setup>
import type { DefineComponent } from 'vue'
import { h } from 'vue'
import { useTable } from 'plus-pro-components'
import type { PageInfo, PlusColumn } from 'plus-pro-components'
import { ElButton, ElAlert } from 'element-plus'

defineOptions({
  name: 'CustomCell'
})

interface TableRow {
  index: number
  id: number
  name: string
  status: string
  custom: string
}

const TestServe = {
  getList: async () => {
    const data = [...new Array(3)].map((item, index) => {
      return {
        index,
        id: index,
        name: index + 'name',
        status: String(index % 3),
        custom: 'custom' + index
      }
    })
    return {
      data: data as TableRow[],
      total: data.length
    }
  }
}

const { tableData, pageInfo, total, loadingStatus } = useTable<TableRow[]>()

const tableConfig: PlusColumn[] = [
  {
    label: '自定义表头 div',
    tooltip: '名称最多显示6个字符',
    width: 200,
    prop: 'name',
    // 返回一个标签字符串
    renderHeader: () => 'div',
    // 传递给  'div' slots
    headerSlots: {
      default: (label: string) => {
        return `${label}`
      }
    }
  },
  {
    label: '自定义表头 ElButton',
    width: 200,
    prop: 'status',
    // 返回一个组件
    renderHeader: () => ElButton,
    // 传递给 'ElResult' 的slots
    headerSlots: {
      default: (label: string) => {
        return `${label}`
      }
    }
  },
  {
    label: '自定义组件ElAlert',
    prop: 'custom',
    // 返回一个VNode
    renderHeader: label => {
      return h(ElAlert as unknown as DefineComponent, {}, () => label)
    }
  }
]

const getList = async () => {
  try {
    loadingStatus.value = true
    const { data, total: dataTotal } = await TestServe.getList()
    tableData.value = data || []
    total.value = dataTotal
  } catch (error) {}
  loadingStatus.value = false
}
getList()

const handlePaginationChange = (_pageInfo: PageInfo): void => {
  pageInfo.value = _pageInfo
  getList()
}
</script>
