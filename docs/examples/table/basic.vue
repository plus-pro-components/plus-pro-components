<template>
  <div>
    <PlusTable
      :config="tableConfig"
      :table-data="tableData"
      :pagination="{ total: 100, modelValue: pageInfo, show: true }"
      :action-bar="{ buttonsName }"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

import type { TableConfigRow } from '@plus-pro-components/components/table'

const tableData = ref<TableConfigRow[]>([])
const total = ref<number>(0)
const pageInfo = ref({
  page: 1,
  pageSize: 20
})

const buttonsName = {
  normal: [
    {
      text: 'download',
      perms: 'sys:software:download'
    },
    {
      text: 'edit',
      perms: 'sys:software:update'
    },
    {
      text: 'delete',
      perms: 'sys:software:delete'
    }
  ]
}

const TestServe = {
  getList: async () => {
    const data = [...new Array(100)].map((item, index) => {
      return {
        index,
        name: index + 'name',
        account: index * 100,
        time: new Date()
      }
    })
    return {
      data,
      total: 100
    }
  }
}

const tableConfig = computed<TableConfigRow[]>(() => [
  {
    label: '名称',
    prop: 'name'
  },
  {
    label: '钱',
    prop: 'account',
    format: 'money'
  },
  {
    label: '查看',
    prop: 'name',
    format: 'link'
  },
  {
    label: '时间',
    prop: 'time',
    minWidth: 200,
    format: 'date'
  }
])

const formatTableItem = (item: any) => {
  return {
    ...item,
    buttonKey: 'normal'
  }
}

const getList = async () => {
  try {
    const { data, total: t } = await TestServe.getList()
    const items = data.map(item => formatTableItem(item))
    tableData.value = items || []
    total.value = t
  } catch (error) {}
}
getList()
</script>
