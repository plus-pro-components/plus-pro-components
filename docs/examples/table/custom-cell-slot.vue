<template>
  <div>
    <PlusTable :columns="tableConfig" :table-data="tableData">
      <!--这里的plus-cell-name 插槽没有生效，因为它的优先级低于render函数 -->
      <template #plus-cell-name="scoped">
        <span style="color: blue"> {{ scoped.value }} </span>
      </template>

      <template #plus-cell-status="scoped">
        <span style="color: green">插槽- {{ scoped.value }} </span>
      </template>
    </PlusTable>
  </div>
</template>

<script lang="ts" setup>
import { h } from 'vue'
import { useTable } from 'plus-pro-components'
import type { PlusColumn } from 'plus-pro-components'

const TestServe = {
  getList: async () => {
    const data = Array.from({ length: 4 }).map((item, index) => {
      return {
        name: index + 'name',
        status: String(index % 4),
        tag: index === 1 ? 'success' : index === 2 ? 'warning' : index === 3 ? 'info' : 'danger',
        time: new Date()
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
    // render 的优先级比 插槽plus-cell-name 的高
    render(value) {
      return h(
        'div',
        {
          style: {
            color: 'green'
          }
        },
        `render ${value}`
      )
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
        type: 'primary'
      },
      {
        label: '已解决',
        value: '1',
        type: 'success'
      }
    ]
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
