<template>
  <div>
    <PlusTable ref="plusTableInstance" :columns="tableConfig" :table-data="tableData" />

    <el-row style="margin-top: 10px">
      <el-button @click="handleStart(0)"> 开启第一行编辑 </el-button>
      <el-button @click="handleStop(0)"> 关闭第一行编辑 </el-button>

      <el-button @click="handleStart(2)"> 开启第三行编辑 </el-button>
      <el-button @click="handleStop(2)"> 关闭第三行编辑 </el-button>

      <el-button @click="handleStart(1, 'status')"> 开启第二行第二列编辑 </el-button>
      <el-button @click="handleStop(1, 'status')"> 关闭第二行第二列编辑 </el-button>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import type { PlusColumn, PlusTableInstance, TableFormRefRow } from 'plus-pro-components'
import { useTable } from 'plus-pro-components'
import { ref } from 'vue'

interface TableRow {
  id: number
  name: string
  status: string
  rate: number
  switch: boolean
  time: string
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
        time: index < 2 ? '' : new Date()
      }
    })
    return { data: data as TableRow[] }
  }
}
const { tableData } = useTable<TableRow[]>()

const plusTableInstance = ref<PlusTableInstance | null>(null)

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
  } catch (error) {}
}
getList()

const handleStart = (index: number, prop?: string) => {
  if (plusTableInstance.value?.formRefs) {
    let cell = Reflect.get(plusTableInstance.value?.formRefs, index) as TableFormRefRow[]
    if (prop) {
      cell = cell.filter(item => item.prop === prop)
    }
    cell.forEach(item => {
      item.startCellEdit()
    })
  }
}

const handleStop = (index: number, prop?: string) => {
  if (plusTableInstance.value?.formRefs) {
    let cell = Reflect.get(plusTableInstance.value?.formRefs, index) as TableFormRefRow[]
    if (prop) {
      cell = cell.filter(item => item.prop === prop)
    }
    cell.forEach(item => {
      item.stopCellEdit()
    })
  }
}
</script>
