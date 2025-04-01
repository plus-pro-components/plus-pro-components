<template>
  <div>
    <PlusTable
      ref="plusTableInstance"
      editable
      :columns="tableConfig"
      :table-data="tableData"
      @filterTableHeader="filterTableHeader"
    />
  </div>
</template>

<script lang="ts" setup>
import type { PlusColumn, PlusTableInstance } from 'plus-pro-components'
import { useTable } from 'plus-pro-components'
import { ref, onMounted } from 'vue'

interface TableRow {
  id: number
  name: string
  status: string
  rate: number
  switch: boolean
  time: string
  tag: string
}

const localKey = 'filter-table-header'

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

const tableConfig = ref<PlusColumn[]>([
  {
    label: '名称',
    prop: 'name',
    width: 120,
    //  列设置中此列不选中
    headerIsChecked: false
  },
  {
    label: '状态',
    prop: 'status',
    disabledHeaderFilter: true,
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
    width: 250
  }
])

onMounted(() => {
  // 此方法适应于简单数据，如果tableConfig有复杂数据，如计算属性函数等，可以考虑只保存关键字段 prop、label、headerIsChecked 、disabledHeaderFilter等
  const data = localStorage.getItem(localKey)
    ? JSON.parse(localStorage.getItem(localKey) as string)
    : null

  if (data) {
    tableConfig.value = data
  }
})

const getList = async () => {
  try {
    const { data } = await TestServe.getList()
    tableData.value = data.map(item => ({ ...item }))
  } catch (error) {}
}
getList()

const filterTableHeader = (columns: PlusColumn[]) => {
  // 此方法适应于简单数据，如果tableConfig有复杂数据，如计算属性函数等，可以考虑只保存关键字段 prop、label、headerIsChecked 、disabledHeaderFilter等
  localStorage.setItem(localKey, JSON.stringify(columns))
}
</script>
