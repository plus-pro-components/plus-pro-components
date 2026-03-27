<template>
  <div>
    <PlusTable
      ref="plusTableInstance"
      empty-value="-"
      :columns="tableConfig"
      :table-data="tableData"
      :default-selected-radio-row="defaultSelectedRadioRow"
      @radioChange="handleRadioChange"
    />
  </div>
</template>

<script lang="ts" setup>
import type { PlusColumn } from '@plus-pro-components/types'
import type { PlusTableInstance } from '@plus-pro-components/components'
import { useTable } from '@plus-pro-components/hooks'
import { ref } from 'vue'

interface TableRow {
  id: number
  name: string
  status: string
  rate: number
  switch?: boolean | null
  time?: string | null
  tag?: string
}

const TestServe = {
  getList: async () => {
    const data = Array.from({ length: 4 }).map((item, index) => {
      return {
        id: index,
        name: index < 2 ? '' : index + 'name',
        status: index < 2 ? String(index % 3) : undefined,
        rate: index > 3 ? 2 : 3.5,
        switch: index % 2 === 0 ? true : null,
        time: index < 2 ? undefined : new Date(),
        tag: index === 1 ? 'success' : index === 2 ? 'warning' : index === 3 ? 'info' : ''
      }
    })

    return { data: data as TableRow[] }
  }
}
const { tableData } = useTable<TableRow[]>()

const plusTableInstance = ref<PlusTableInstance | null>(null)
const defaultSelectedRadioRow = ref()

const tableConfig = ref<PlusColumn[]>([
  {
    label: '名称',
    prop: 'name',
    width: 120,
    // 优先级高于表格的emptyValue
    emptyValue: '/'
  },
  {
    label: '名称（formatter存在）',
    prop: 'name',
    width: 200,
    emptyValue: '/',
    // formatter 存在时 ，优先使用 formatter，emptyValue 无效
    formatter: (value: string) => value || ''
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
    label: '评分',
    width: 200,
    prop: 'rate',
    valueType: 'rate'
  },
  {
    label: '标签',
    width: 200,
    prop: 'tag',
    valueType: 'tag'
  },
  {
    label: '开关',
    width: 100,
    prop: 'switch',
    valueType: 'switch'
  },
  {
    label: '日期',
    prop: 'time',
    valueType: 'date-picker',
    width: 250,
    fieldProps: {
      type: 'date',
      placeholder: '请选择日期',
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD'
    }
  }
])

const getList = async () => {
  try {
    const { data } = await TestServe.getList()
    tableData.value = data.map(item => ({ ...item }))
    defaultSelectedRadioRow.value = tableData.value[0]
  } catch (error) {}
}
getList()

const handleRadioChange = (row: any, index: number) => {
  console.log(row, index, 'handleRadioChange')
}
</script>
