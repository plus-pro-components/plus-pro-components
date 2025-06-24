<template>
  <div>
    <PlusTable
      ref="plusTableInstance"
      is-radio
      :columns="tableConfig"
      :table-data="tableData"
      :default-selected-radio-row="defaultSelectedRadioRow"
      @radioChange="handleRadioChange"
    />
  </div>
</template>

<script lang="ts" setup>
import type { PlusColumn, PlusTableInstance } from 'plus-pro-components'
import { useTable } from 'plus-pro-components'
import { ref } from 'vue'

interface TableRow {
  id: number
  name: string
  status: string
  rate: number
  switch: boolean
  time: string
  tag: string
}

const TestServe = {
  getList: async () => {
    const data = Array.from({ length: 4 }).map((item, index) => {
      return {
        id: index,
        name: index < 2 ? '' : index + 'name',
        status: String(index % 3),
        rate: index > 3 ? 2 : 3.5,
        switch: index % 2 === 0 ? true : false,
        time: index < 2 ? '' : new Date(),
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
    formProps: {
      // 添加校验
      rules: {
        name: [
          {
            required: true,
            message: '请输入名称'
          }
        ]
      }
    }
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
    ],
    formProps: {
      // 添加校验
      rules: {
        status: [
          {
            required: true,
            trigger: 'change',
            message: '请选择状态'
          }
        ]
      }
    }
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
    },
    formProps: {
      // 添加校验
      rules: {
        time: [
          {
            required: true,
            message: '请选择日期'
          }
        ]
      }
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

/**
 *
 * @param row
 * @param index
 * @param value  value（是否选中）参数为 v0.1.24 新增
 */
const handleRadioChange = (row: any, index: number, value: boolean) => {
  console.log(row, index, value, 'handleRadioChange')
}
</script>
