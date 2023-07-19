<template>
  <div>
    <PlusTable
      :columns="tableConfig"
      :table-data="tableData"
      :action-bar="{ buttonsName, buttonType: 'link', buttonCount: 2 }"
      :pagination="{ show: false }"
    />
  </div>
</template>

<script lang="ts" setup>
import { useTable } from '@plus-pro-components/hooks'
import type { PlusColumn } from '@plus-pro-components/types'

const TestServe = {
  getList: async () => {
    const data = [...new Array(10)].map((item, index) => {
      return {
        name: index + 'name',
        status: String(index % 3),
        tag: index === 1 ? 'success' : index === 2 ? 'warning' : index === 3 ? 'info' : 'danger',
        time: new Date()
      }
    })
    return {
      data
    }
  }
}
const formatTableItem = (item: any) => {
  return {
    ...item,
    buttonKey: 'normal'
  }
}

const { tableData, buttonsName } = useTable()

buttonsName.value = {
  normal: [
    {
      // 查看
      text: '查看',
      type: 'info'
    },
    {
      // 修改
      text: '修改',
      type: 'primary'
    },
    {
      // 删除
      text: '删除',
      type: 'danger'
    },
    {
      text: '复制',
      type: 'success'
    }
  ]
}

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
    const items = data.map(item => formatTableItem(item))
    tableData.value = items || []
  } catch (error) {}
}
getList()
</script>
