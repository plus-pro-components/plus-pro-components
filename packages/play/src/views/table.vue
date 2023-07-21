<template>
  <div>
    <PlusTable
      :columns="tableConfig"
      :table-data="tableData"
      :pagination="{ show: false }"
      :action-bar="{ buttonsName, optionColumnWidth: 200 }"
      @formChange="formChange"
      @clickAction="handleClickButton"
    />
  </div>
</template>

<script lang="ts" setup>
import type {
  ButtonsCallBackParams,
  ButtonsNameKeyRow
} from '@plus-pro-components/components/table'
import { useTable } from '@plus-pro-components/hooks'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ElMessage } from 'element-plus'
import type { PlusColumn } from '@plus-pro-components/types'
import { ref } from 'vue'

const TestServe = {
  getList: async () => {
    const data = [...new Array(10)].map((item, index) => {
      return {
        id: index,
        name: index < 5 ? '' : index + 'name',
        status: String(index % 3),
        rate: index > 3 ? 2 : 3.5,
        switch: index % 2 === 0 ? true : false,
        time: index < 5 ? '' : new Date()
      }
    })
    return { data }
  }
}
const { tableData, buttonsName } = useTable()

const edit: ButtonsNameKeyRow[] = [
  {
    text: '取消编辑',
    code: 'cancel',
    props: {
      type: 'warning'
    }
  },
  {
    // 保存
    text: '保存',
    code: 'save',
    props: {
      type: 'danger'
    }
  }
]

const noEdit: ButtonsNameKeyRow[] = [
  {
    text: '编辑',
    code: 'edit',
    props: {
      type: 'primary'
    }
  }
]

buttonsName.value = {
  normal: [...noEdit]
}
const tableConfig = ref<PlusColumn[]>([
  {
    label: '名称',
    prop: 'name',
    valueType: 'text',
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
    tableData.value = data.map(item => ({ ...item, buttonKey: item.id }))

    tableData.value.forEach((item: any) => {
      buttonsName.value[item.buttonKey] = noEdit
    })
  } catch (error) {}
}
getList()

const formChange = (data: { value: any; prop: string; row: any; index: number; column: any }) => {
  console.log(data)
}

const handleSave = async (data: any) => {
  try {
    await Promise.all(data.formRefs.map((item: any) => item.formInstance?.validate()))
  } catch (errors: any) {
    console.log(errors)

    ElMessage.closeAll()
    const values: any[] = Object.values(errors)
    ElMessage.warning(values[0]?.[0]?.message || '请完整填写表单并再次提交！')
  }
}

const handleClickButton = async (data: ButtonsCallBackParams) => {
  console.log(data.formRefs)

  if (data.buttonRow.code === 'edit') {
    tableData.value.forEach((item: any) => {
      if (item.id === data.row.id) {
        buttonsName.value[item.buttonKey] = [...edit]
      }
    })

    data.formRefs?.forEach((item: any) => {
      item.startCellEdit()
    })
  } else if (data.buttonRow.code === 'cancel') {
    tableData.value.forEach((item: any) => {
      if (item.id === data.row.id) {
        buttonsName.value[item.buttonKey] = [...noEdit]
      }
    })

    data.formRefs?.forEach((item: any) => {
      item.stopCellEdit()
    })
  } else {
    handleSave(data)
  }
}
</script>
