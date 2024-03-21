<template>
  <div>
    <PlusTable :columns="tableConfig" :table-data="tableData" @formChange="formChange">
      <template #plus-field-name="{ row }">
        <el-input v-model="row.name" placeholder="自定义表单" @change="handleChange" />
      </template>
      <template #plus-extra-name> 自定义下一行内容 </template>
      <template #toolbar>
        <el-button plain size="small" @click="editTable(false)">取消编辑</el-button>
        <el-button type="primary" size="small" @click="editTable(true)">开启编辑</el-button>
      </template>
    </PlusTable>
  </div>
</template>

<script lang="ts" setup>
import { useTable } from 'plus-pro-components'
import type { PlusColumn } from 'plus-pro-components'
import { ref } from 'vue'

interface TableRow {
  id: number
  name: string
  status: string
  rate: number
  switch: boolean
  time: Date
}

const TestServe = {
  getList: async () => {
    const data = Array.from({ length: 3 }).map((item, index) => {
      return {
        id: index,
        name: index === 0 ? '' : index + 'name',
        status: String(index % 3),
        rate: index > 3 ? 2 : 3.5,
        switch: index % 2 === 0 ? true : false,
        time: new Date()
      }
    })
    return { data: data as TableRow[] }
  }
}
const { tableData } = useTable<TableRow[]>()

const tableConfig = ref<PlusColumn[]>([
  {
    label: '名称',
    prop: 'name',
    editable: true,
    width: 200
  },
  {
    label: '状态',
    prop: 'status',
    valueType: 'select',
    editable: true,
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
    valueType: 'rate',
    editable: true,
    fieldProps: {
      disabled: false,
      allowHalf: true
    }
  },
  {
    label: '开关',
    width: 100,
    prop: 'switch',
    valueType: 'switch',
    editable: true,
    fieldProps: {
      disabled: false
    }
  },
  {
    label: '时间',
    prop: 'time',
    valueType: 'date-picker',
    width: 250,
    editable: true
  }
])

const getList = async () => {
  try {
    const { data } = await TestServe.getList()
    tableData.value = data
  } catch (error) {}
}
getList()

const formChange = (data: { value: any; prop: string; row: any; index: number; column: any }) => {
  console.log(data)
}

const handleChange = (data: string) => {
  console.log(data)
}

const editTable = (isEdit: boolean) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  tableConfig.value = tableConfig.value.map(item => {
    if (item.valueType === 'rate' || item.valueType === 'switch') {
      return {
        ...item,
        editable: true,
        fieldProps: { ...item.fieldProps, disabled: !isEdit }
      }
    } else {
      return { ...item, editable: isEdit }
    }
  })
}
</script>
