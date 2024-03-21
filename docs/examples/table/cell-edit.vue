<template>
  <div>
    <PlusTable
      :columns="tableConfig"
      :table-data="tableData"
      :action-bar="{ buttons, width: 140 }"
      @formChange="formChange"
      @clickAction="handleClickButton"
    />
  </div>
</template>

<script lang="ts" setup>
import type { ButtonsCallBackParams, TableFormRefRow, PlusColumn } from 'plus-pro-components'
import { useTable } from 'plus-pro-components'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

interface TableRow {
  id: number
  name: {
    name: string
  }
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
        name: {
          name: index < 2 ? '' : index + 'name'
        },
        status: String(index % 3),
        rate: index > 3 ? 2 : 3.5,
        switch: index % 2 === 0 ? true : false,
        time: index < 2 ? '' : new Date()
      }
    })
    return { data: data as TableRow[] }
  }
}
const { tableData, buttons } = useTable<TableRow[]>()

const show = ref<boolean[]>([])

buttons.value = [
  {
    text: '取消编辑',
    code: 'cancel',
    props: {
      type: 'warning'
    },
    show: (_, index) => !!show.value[index]
  },
  {
    // 保存
    text: '保存',
    code: 'save',
    props: {
      type: 'primary'
    },
    show: (_, index) => !!show.value[index]
  },
  {
    text: '编辑',
    code: 'edit',
    props: {
      type: 'primary'
    },
    show: (_, index) => !show.value[index]
  },
  {
    text: '删除',
    code: 'delete',
    props: {
      type: 'danger'
    },
    confirm: {},
    show: (_, index) => !show.value[index]
  }
]
const tableConfig = ref<PlusColumn[]>([
  {
    label: '名称',
    prop: 'name.name',
    width: 120,
    formProps: {
      // 添加校验
      rules: {
        'name.name': [
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
    ]
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

const formChange = (data: { value: any; prop: string; row: any; index: number; column: any }) => {
  console.log(data)
}

const handleSave = async (data: ButtonsCallBackParams) => {
  try {
    if (data.formRefs) {
      const formItem = data.formRefs?.find((item: TableFormRefRow) => item.prop === 'name.name')

      await (formItem?.formInstance.value as any)?.validate()
    }
  } catch (errors: any) {
    ElMessage.closeAll()
    console.log(errors, 'errors')

    const values: any[] = Object.values(errors)
    ElMessage.warning(values[0]?.[0]?.message || '请完整填写表单并再次提交！')
  }
}

const handleClickButton = async (data: ButtonsCallBackParams) => {
  if (data.buttonRow.code === 'edit') {
    tableData.value.forEach(item => {
      if (item.id === data.row.id) {
        show.value[data.index] = true
      }
    })

    data.formRefs?.forEach((item: TableFormRefRow) => {
      if (item.prop === 'name.name') {
        item.startCellEdit()
      }
    })
  } else if (data.buttonRow.code === 'cancel') {
    tableData.value.forEach(item => {
      if (item.id === data.row.id) {
        show.value[data.index] = false
      }
    })
    data.formRefs?.forEach((item: TableFormRefRow) => {
      item.stopCellEdit()
    })
  } else if (data.buttonRow.code === 'save') {
    handleSave(data)
  } else {
    ElMessage.success('删除成功')
  }
}
</script>
