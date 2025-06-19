<template>
  <div>
    <PlusTable
      ref="plusTable"
      row-key="id"
      size="small"
      :loading-status="loadingStatus"
      :columns="tableConfig"
      :table-data="tableData"
      has-index-column
      is-selection
      :drag-sort="true"
      table-title="表格"
      :pagination="{ total, modelValue: pageInfo }"
      :action-bar="{
        buttons,
        type: 'link',
        showNumber: 3,
        width: 200
      }"
      @paginationChange="handlePaginationChange"
      @clickAction="handleClickButton"
      @dragSortEnd="handleSortEnd"
      @formChange="handleChange"
    >
      <el-table-column
        v-for="item in tableConfig"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        show-overflow-tooltip
      />
    </PlusTable>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useTable } from 'plus-pro-components'
import type {
  PlusTableInstance,
  ButtonsCallBackParams,
  PageInfo,
  PlusColumn
} from 'plus-pro-components'

defineOptions({
  name: 'PlusTableAdvancedTest'
})

interface TableRow {
  index: number
  id: number
  name: string
  status: string
  tag: string
  progress: number
  rate: number
  switch: boolean
  img: string
  code: string
  time: Date
  custom: string
}

const TestServe = {
  getList: async () => {
    const data = Array.from({ length: 100 }).map((item, index) => {
      return {
        index,
        id: index,
        name: index + 'name',
        status: String(index % 3),
        tag: index === 1 ? 'success' : index === 2 ? 'warning' : index === 3 ? 'info' : 'danger',
        progress: Math.ceil(Math.random() * index * 10),
        rate: index > 3 ? 2 : 3.5,
        switch: index % 2 === 0 ? true : false,
        img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        time: new Date(),
        code: `
          const getData = async params => {
            const data = await getData(params)
            return { list: data.data, ...data }
          }`,
        custom: 'custom' + index,
        level: {
          state: {
            value: 'level' + index
          }
        }
      }
    })
    return {
      data: data as TableRow[],
      total: data.length
    }
  }
}

const plusTable = ref<PlusTableInstance>()

const { tableData, pageInfo, total, buttons, loadingStatus } = useTable<TableRow[]>()

buttons.value = [
  {
    // 查看
    text: '查看',
    props: {
      type: 'primary'
    }
  },
  {
    // 修改
    text: '修改',
    props: {
      type: 'success'
    }
  },
  {
    // 删除
    text: '删除',
    props: {
      type: 'warning'
    },
    confirm: {}
  },
  {
    text: '复制',
    props: {
      type: 'primary'
    },
    confirm: {}
  }
]

const tableConfig: PlusColumn[] = [
  {
    label: '名称',
    tooltip: '名称最多显示6个字符',
    width: 120,
    prop: 'name',
    tableColumnProps: {
      showOverflowTooltip: true
    }
  },
  {
    label: '多级数据',
    width: 120,
    prop: 'level.state.value'
  },
  {
    label: '状态',
    width: 120,
    prop: 'status',
    valueType: 'select',
    options: [
      {
        label: '未解决',
        value: '0',
        type: 'warning'
      },
      {
        label: '已解决',
        value: '1',
        type: 'success'
      },
      {
        label: '解决中',
        value: '2',
        type: 'primary'
      },
      {
        label: '失败',
        value: '3',
        type: 'danger'
      }
    ]
  },
  {
    label: '标签',
    width: 120,
    prop: 'tag',
    valueType: 'tag'
  },
  {
    label: '执行进度',
    width: 200,
    prop: 'progress',
    valueType: 'progress'
  },
  {
    label: '代码块',
    width: 250,
    prop: 'code',
    valueType: 'code'
  },
  {
    label: '评分',
    width: 200,
    prop: 'rate',
    valueType: 'rate',
    editable: true
  },
  {
    label: '开关',
    width: 100,
    prop: 'switch',
    valueType: 'switch',
    editable: true
  },
  {
    label: '图片',
    prop: 'img',
    width: 100,
    valueType: 'img'
  },
  {
    label: '时间',
    prop: 'time',
    width: 180,
    valueType: 'date-picker'
  }
]

const getList = async () => {
  try {
    loadingStatus.value = true

    const { data, total: dataTotal } = await TestServe.getList()
    tableData.value = data || []
    total.value = dataTotal
  } catch (error) {}
  loadingStatus.value = false
}
getList()

const handlePaginationChange = (_pageInfo: PageInfo): void => {
  pageInfo.value = _pageInfo
  getList()
}
const handleClickButton = (data: ButtonsCallBackParams) => {
  console.log(data.buttonRow.text)
}
const handleSortEnd = (newIndex: number, oldIndex: number) => {
  const currRow = tableData.value.splice(oldIndex, 1)[0]
  tableData.value.splice(newIndex, 0, currRow)
}
const handleChange = (data: {
  value: any
  prop: string
  row: TableRow
  index: number
  column: any
}) => {
  console.log(data)
}
</script>
