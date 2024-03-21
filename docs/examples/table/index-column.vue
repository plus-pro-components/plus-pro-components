<template>
  <div>
    <PlusTable :columns="tableConfig" :table-data="tableData" has-index-column />
  </div>

  <div>
    <PlusTable
      :columns="tableConfig"
      :table-data="tableData"
      has-index-column
      :index-content-style="indexContentStyle"
      :index-table-column-props="{
        label: '序号栏',
        width: 80
      }"
    />
  </div>
</template>

<script lang="ts" setup>
import { useTable } from 'plus-pro-components'
import type { PlusColumn } from 'plus-pro-components'

interface TableRow {
  id: number
  name: string
  status: string
  tag: string
  time: Date
}

const TestServe = {
  getList: async () => {
    const data = Array.from({ length: 5 }).map((item, index) => {
      return {
        id: index,
        name: index + 'name',
        status: String(index % 3),
        tag: index === 1 ? 'success' : index === 2 ? 'warning' : index === 3 ? 'info' : 'danger',
        time: new Date()
      }
    })
    return {
      data: data as TableRow[],
      total: data.length
    }
  }
}

const { tableData, total, pageInfo } = useTable<TableRow[]>()

pageInfo.value.pageSize = 5

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
    const { data, total: dataTotal } = await TestServe.getList()
    tableData.value = data
    total.value = dataTotal
  } catch (error) {}
}

const indexContentStyle = (row: any, index: number) => {
  const style = {
    width: '30px',
    height: '30px',
    color: '#fff',
    borderRadius: '50%'
  }
  return index < 3
    ? {
        ...style,
        backgroundColor: '#314659'
      }
    : {
        ...style,
        backgroundColor: '#979797'
      }
}

getList()
</script>
