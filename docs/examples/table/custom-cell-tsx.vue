<template>
  <div>
    <PlusTable :columns="tableConfig" :table-data="tableData" />
  </div>
</template>

<script lang="tsx" setup>
//  `lang ` 设置为 `jsx`或者`tsx`
import { useTable } from 'plus-pro-components'
import type { PlusColumn } from 'plus-pro-components'
import { ElButton } from 'element-plus'

const TestServe = {
  getList: async () => {
    const data = Array.from({ length: 4 }).map((item, index) => {
      return {
        name: index + 'name',
        status: String(index % 4),
        data: 'data' + String(index % 4)
      }
    })
    return {
      data
    }
  }
}

const { tableData } = useTable()

const tableConfig: PlusColumn[] = [
  {
    label: '名称',
    prop: 'name',
    // jsx 中值使用单花括号
    render(value) {
      return <div> {value}</div>
    }
  },
  {
    label: '状态',
    prop: 'status',
    valueType: 'select',
    // jsx 中style使用单花括号，里面还有一个花括号表示对象
    render(value) {
      return <p style={{ padding: 10, color: 'red' }}> {value}</p>
    }
  },
  {
    label: '按钮',
    prop: 'data',
    valueType: 'select',
    render(value) {
      return <ElButton type="primary"> {value}</ElButton>
    }
  }
]

const getList = async () => {
  try {
    const { data } = await TestServe.getList()
    tableData.value = data || []
  } catch (error) {}
}
getList()
</script>
