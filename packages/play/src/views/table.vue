<template>
  <div>
    <PlusTable
      :columns="tableConfig"
      :table-data="tableData"
      :action-bar="{ buttons: buttons2, type: 'button', showNumber: 2 }"
      @clickAction="handleClickButton"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useTable } from '@plus-pro-components/hooks'
import type { PlusColumn } from '@plus-pro-components/types'
import type { ButtonsCallBackParams } from '@plus-pro-components/components/table'

import { View, Edit, Delete, DocumentCopy } from '@element-plus/icons-vue'

const TestServe = {
  getList: async () => {
    const data = [...new Array(3)].map((item, index) => {
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

const { tableData, buttons } = useTable()
const { buttons: buttons1 } = useTable()
const { buttons: buttons2 } = useTable()

buttons.value = [
  {
    // 查看
    text: '查看',
    props: {
      type: 'info'
    },
    show: (row: any) => row.status === '1'
  },
  {
    // 修改
    text: '修改',
    props: {
      type: 'primary'
    },
    show: computed(() => true)
  },
  {
    // 删除
    text: '删除',
    props: {
      type: 'danger'
    }
  },
  {
    text: '复制',
    props: {
      type: 'success'
    }
  }
]

buttons1.value = [
  {
    // 查看
    text: '查看',
    icon: View,
    props: {
      type: 'info'
    },
    show: (row: any) => row.status === '1'
  },
  {
    // 修改
    text: '修改',
    icon: Edit,
    props: {
      type: 'primary'
    },
    show: computed(() => true)
  },
  {
    // 删除
    text: '删除',
    icon: Delete,
    props: {
      type: 'danger'
    }
  },
  {
    text: '复制',
    icon: DocumentCopy,
    props: {
      type: 'success'
    }
  }
]
buttons2.value = [
  {
    // 查看
    text: '查看',
    icon: View,
    props: {
      type: 'info'
    },
    show: (row: any) => row.status === '1'
  },
  {
    // 修改
    text: '修改',
    icon: Edit,
    props: {
      type: 'primary'
    },
    show: computed(() => true)
  },
  {
    // 删除
    text: '删除',
    icon: Delete,
    props: {
      type: 'danger'
    }
  },
  {
    text: '复制',
    icon: DocumentCopy,
    props: {
      type: 'success'
    }
  }
]

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

const handleClickButton = (data: ButtonsCallBackParams) => {
  console.log(data.buttonRow.text)
}
</script>
