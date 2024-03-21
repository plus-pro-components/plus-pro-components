<template>
  <div>
    <PlusTable :columns="tableConfig" :table-data="tableData" @form-change="handleChange" />
  </div>
</template>

<script lang="ts" setup>
import { useTable } from 'plus-pro-components'
import type { PlusColumn } from 'plus-pro-components'

const TestServe = {
  getList: async () => {
    const data = Array.from({ length: 5 }).map((_, index) => {
      return {
        status: { data: { value: String(index % 2) } },
        level: { message: { tip: '提示' + index } },
        list: ['list0', 'list1', 'list2']
      }
    })
    return { data }
  }
}

const { tableData } = useTable()

const tableConfig: PlusColumn[] = [
  {
    label: '多级显示',
    prop: 'level.message.tip',
    editable: true
  },
  {
    label: '多级显示',
    prop: 'level.message.tip'
  },
  {
    label: '数组形式',
    editable: true,
    prop: 'list[0]'
  },
  {
    label: '数组形式',
    prop: 'list[0]'
  },
  {
    label: '状态',
    prop: 'status.data.value',
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
      }
    ]
  }
]

const getList = async () => {
  try {
    const { data } = await TestServe.getList()
    tableData.value = data || []
  } catch (error) {}
}
getList()

const handleChange = (values: any) => {
  console.log(values)
}
</script>
