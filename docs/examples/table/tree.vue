<template>
  <div>
    <PlusTable
      :columns="tableConfig"
      :table-data="tableData"
      title="树形表格"
      :tree-props="{ children: 'children' }"
    />
    <PlusTable
      :columns="tableConfig"
      :table-data="tableDataLazy"
      title="树形懒加载表格"
      lazy
      :load="load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    />
  </div>
</template>

<script lang="ts" setup>
import { useTable } from 'plus-pro-components'
import type { PlusColumn } from 'plus-pro-components'

interface TableRow {
  id: number | string
  name: string
  status: string
  tag: string
  time: Date
  hasChildren?: boolean
  children?: TableRow[]
}

const TestServe = {
  getList: async () => {
    const dataLazy = Array.from({ length: 3 }).map((item, index) => {
      return {
        id: index,
        name: index + 'name',
        status: String(index % 3),
        tag: index === 1 ? 'success' : index === 2 ? 'warning' : index === 3 ? 'info' : 'danger',
        time: new Date(),
        hasChildren: true,
        children: []
      }
    })
    const data = Array.from({ length: 3 }).map((item, index) => {
      return {
        id: index,
        name: index + 'name',
        status: String(index % 3),
        tag: index === 1 ? 'success' : index === 2 ? 'warning' : index === 3 ? 'info' : 'danger',
        time: new Date(),
        children: Array.from({ length: 10 }).map((item, i) => ({
          id: index + '' + i,
          name: '小明' + i + '-' + i,
          status: String(i % 3),
          tag: i === 1 ? 'success' : i === 2 ? 'warning' : i === 3 ? 'info' : 'danger',
          time: new Date()
        }))
      }
    })
    return {
      data: data as TableRow[],
      dataLazy: dataLazy as TableRow[]
    }
  }
}

const load = (row: TableRow, treeNode: unknown, resolve: (date: TableRow[]) => void) => {
  setTimeout(() => {
    resolve(
      Array.from({ length: 10 }).map((item, i) => ({
        id: 10 + i,
        name: '小明' + i + '-' + i,
        status: String(i % 3),
        tag: i === 1 ? 'success' : i === 2 ? 'warning' : i === 3 ? 'info' : 'danger',
        time: new Date()
      }))
    )
  }, 1000)
}

const { tableData } = useTable<TableRow[]>()
const { tableData: tableDataLazy } = useTable<TableRow[]>()

const tableConfig: PlusColumn[] = [
  {
    label: '名称',
    prop: 'name'
  },
  {
    label: '状态',
    prop: 'status',
    valueType: 'select',
    options: [
      {
        label: '未解决',
        value: '0',
        color: 'red'
      },
      {
        label: '已解决',
        value: '1',
        color: 'blue'
      },
      {
        label: '解决中',
        value: '2',
        color: 'yellow'
      },
      {
        label: '失败',
        value: '3',
        color: 'red'
      }
    ]
  },
  {
    label: '标签',
    prop: 'tag',
    valueType: 'tag',
    fieldProps: (value: string) => {
      return { type: value }
    }
  },
  {
    label: '时间',
    prop: 'time',
    valueType: 'date-picker'
  }
]

const getList = async () => {
  try {
    const { data, dataLazy } = await TestServe.getList()
    tableData.value = data
    tableDataLazy.value = dataLazy
  } catch (error) {}
}
getList()
</script>
