<template>
  <div>
    <PlusTable :columns="tableConfig" :table-data="tableData" />
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
    prop: 'name',
    disabledHeaderFilter: true,
    fieldProps: {
      style: {
        color: 'red',
        fontSize: '20px'
      }
    }
  },
  {
    label: '标签',
    prop: 'tag',
    valueType: 'tag',
    fieldProps: (value: string, { index }) => {
      return {
        type: value,
        style: {
          fontSize: index * 2 + 13 + 'px'
        }
      }
    }
  },
  {
    label: '时间',
    prop: 'time',
    valueType: 'date-picker',
    fieldProps: (_, { index }) => {
      return {
        style: {
          color: 'green',
          fontSize: index * 2 + 13 + 'px'
        }
      }
    }
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
