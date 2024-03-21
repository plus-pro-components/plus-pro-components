<template>
  <div>
    <PlusTable
      key="1"
      :columns="tableConfig"
      :table-data="tableData"
      :action-bar="{ buttons, showNumber: 2 }"
      @clickAction="handleClickButton"
    />

    <PlusTable
      key="2"
      :columns="tableConfig"
      :table-data="tableData"
      :action-bar="{ buttons: buttons1, type: 'button', showNumber: 2, width: 240 }"
      @clickAction="handleClickButton"
    />

    <PlusTable
      key="3"
      :columns="tableConfig"
      :table-data="tableData"
      :action-bar="{ buttons: buttons2, type: 'icon', showNumber: 2 }"
      @clickAction="handleClickButton"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useTable } from 'plus-pro-components'
import type { PlusColumn, ButtonsCallBackParams } from 'plus-pro-components'
import { View, Edit, Delete, DocumentCopy } from '@element-plus/icons-vue'

interface TableRow {
  id: number
  name: string
  status: string
  tag: string
  time: Date
}

const TestServe = {
  getList: async () => {
    const data = Array.from({ length: 3 }).map((item, index) => {
      return {
        id: index,
        name: index + 'name',
        status: String(index % 3),
        tag: index === 1 ? 'success' : index === 2 ? 'warning' : index === 3 ? 'info' : 'danger',
        time: new Date()
      }
    })
    return {
      data: data as TableRow[]
    }
  }
}

const { tableData, buttons } = useTable<TableRow[]>()
const { buttons: buttons1 } = useTable<TableRow[]>()
const { buttons: buttons2 } = useTable<TableRow[]>()

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
    },
    confirm: {
      options: { draggable: true }
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
    },
    confirm: {
      message: data => `确定删除id为${data.row.id}的数据吗？`,
      options: { draggable: true }
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
    },
    confirm: {
      message: data => `确定删除id为${data.row.id}且行数为${data.index}的数据吗？`
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
    tableData.value = data || []
  } catch (error) {}
}
getList()

const handleClickButton = (data: ButtonsCallBackParams) => {
  console.log(data.buttonRow.text)
}
</script>
