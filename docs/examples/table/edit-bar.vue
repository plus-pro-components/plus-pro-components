<template>
  <div>
    <PlusTable
      :columns="tableConfig"
      :table-data="tableData"
      :pagination="{ show: false }"
      :action-bar="{ show: false }"
      @formChange="formChange"
    >
      <template #toolbar>
        <el-button plain size="small" @click="editTable(false)">取消编辑</el-button>
        <el-button type="primary" size="small" @click="editTable(true)">编辑表格</el-button>
      </template>
    </PlusTable>
  </div>
</template>

<script lang="ts" setup>
import { useTable } from '@plus-pro-components/hooks'
import type { PlusColumn } from '@plus-pro-components/types'
import { ref } from 'vue'

const TestServe = {
  getList: async () => {
    const data = [...new Array(10)].map((item, index) => {
      return {
        name: index + 'name',
        status: String(index % 3),
        rate: index > 3 ? 2 : 3.5,
        switch: index % 2 === 0 ? true : false,
        time: new Date().toString()
      }
    })
    return {
      data
    }
  }
}
const { tableData } = useTable()
const tableConfig = ref<PlusColumn[]>([
  {
    label: '名称',
    prop: 'name',
    valueType: 'text',
    editable: true,
    width: 120
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
      disabled: true
    }
  },
  {
    label: '开关',
    width: 100,
    prop: 'switch',
    valueType: 'switch',
    editable: true,
    fieldProps: {
      disabled: true
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

const editTable = (isEdit: boolean) => {
  tableConfig.value = tableConfig.value.map(item => {
    if (item.valueType === 'rate' || item.valueType === 'switch') {
      return {
        ...item,
        editable: true,
        fieldProps: {
          disabled: false
        }
      }
    } else {
      return {
        ...item,
        editable: isEdit
      }
    }
  })
}
</script>
