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
    const data = Array.from({ length: 5 }).map((item, index) => {
      return {
        id: index,
        name: index + 'name',
        status: String(index % 5),
        status1: String(index % 5),
        status2: String(index % 5),
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
        type: 'primary'
      },
      {
        label: '已解决',
        value: '1',
        type: 'success'
      },
      {
        label: '解决中',
        value: '2',
        type: 'info'
      },
      {
        label: '失败',
        value: '3',
        type: 'danger'
      },
      {
        label: '审核中',
        value: '4',
        type: 'warning'
      }
    ],
    customGetStatus: ({ options, value, row }) => {
      const data = options?.find(item => item.value === value && row.id === 0)
      return data
    }
  },
  {
    label: '状态1',
    prop: 'status1',
    valueType: 'radio',
    options: [
      {
        label: '未解决',
        value: '0',
        color: '#68228B'
      },
      {
        label: '已解决',
        value: '1',
        color: '#00ff66'
      },
      {
        label: '解决中',
        value: '2',
        color: '#C2C2C2'
      },
      {
        label: '失败',
        value: '3',
        color: '#ff3366'
      },
      {
        label: '审核中',
        value: '4',
        color: '#ffff99'
      }
    ]
  },
  {
    label: '状态2',
    prop: 'status2',
    valueType: 'checkbox',
    options: [
      {
        label: '未解决',
        value: '0',
        type: 'primary',
        color: '#68228B'
      },
      {
        label: '已解决',
        value: '1',
        type: 'success',
        color: '#00ff66'
      },
      {
        label: '解决中',
        value: '2',
        type: 'info',
        color: '#C2C2C2'
      },
      {
        label: '失败',
        value: '3',
        type: 'danger',
        color: '#ff3366'
      },
      {
        label: '审核中',
        value: '4',
        type: 'warning',
        color: '#ffff99'
      }
    ]
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
