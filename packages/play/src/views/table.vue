<template>
  <div>
    <PlusTable
      ref="plusTable"
      row-key="id"
      :loading-status="loadingStatus"
      :config="tableConfig"
      :table-data="tableData"
      :pagination="{ total, modelValue: pageInfo }"
      :action-bar="{ show: false }"
      @subPaginationChange="handlePaginationChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

import { useTable } from '@plus-pro-components/hooks'
import type { TableConfigRow, PlusTableInstance } from '@plus-pro-components/components/table'
import PlusTable from '@plus-pro-components/components/table'

defineOptions({
  name: 'PlusTableTest'
})

const TestServe = {
  getList: async () => {
    const data = [...new Array(100)].map((item, index) => {
      return {
        index,
        name: index + 'name',
        time: new Date()
      }
    })
    return {
      data,
      total: 100
    }
  }
}

const plusTable = ref<PlusTableInstance>()

const { tableData, pageInfo, total, loadingStatus } = useTable()

const tableConfig = computed<TableConfigRow[]>(() => [
  {
    label: '名称',
    width: 280,
    prop: 'name'
  },
  {
    label: '时间',
    width: 190,
    prop: 'time',
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
    loadingStatus.value = true

    const { data, total: dataTotal } = await TestServe.getList()
    const items = data.map(item => formatTableItem(item))
    tableData.value = items || []
    total.value = dataTotal
  } catch (error) {}
  loadingStatus.value = false
}
getList()

const handlePaginationChange = (_pageInfo: PageInfo): void => {
  pageInfo.value = _pageInfo
  getList()
}
</script>

<style lang="scss" scoped>
.button-row {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
}
</style>
