<template>
  <div>
    <PlusTable :columns="tableConfig" :table-data="tableData" :has-expand="true">
      <template #expand="{ row }">
        <div m="4">
          <p m="t-0 b-2">名称: {{ row.name }}</p>
          <p m="t-0 b-2">状态: {{ row.status }}</p>
          <p m="t-0 b-2">标签: {{ row.tag }}</p>
          <p m="t-0 b-2">时间: {{ row.time }}</p>
        </div>
      </template>
    </PlusTable>
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
    const data = Array.from({ length: 3 }).map((item, index) => {
      return {
        id: index,
        name: index + 'name',
        status: String(index % 3),
        tag: index === 1 ? 'success' : index === 2 ? 'warning' : index === 3 ? 'info' : 'danger',
        time: new Date()
      }
    })
    return {
      data: data as TableRow[]
    }
  }
}

const { tableData } = useTable<TableRow[]>()

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
    const { data } = await TestServe.getList()
    tableData.value = data
  } catch (error) {}
}
getList()
</script>
