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
import { ref } from 'vue'
import { useTable } from '@plus-pro-components/hooks'
import type { TableConfigRow, PlusTableInstance } from '@plus-pro-components/components/table'

defineOptions({
  name: 'PlusTableTest'
})

const TestServe = {
  getList: async () => {
    const data = [...new Array(100)].map((item, index) => {
      return {
        index,
        name: index + 'name',
        status: index > 3 ? 'open' : 'closed',
        tag: index > 3 ? 'success' : 'danger',
        progress:
          index > 3
            ? {
                progress: 100,
                status: 'success'
              }
            : { progress: 50 },
        rate: index > 3 ? 2 : 3.5,
        switch: index > 3 ? true : false,
        img: {
          url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        },
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

const tableConfig: TableConfigRow[] = [
  {
    label: '名称',
    width: 280,
    prop: 'name'
  },
  {
    label: '状态',
    width: 200,
    prop: 'status',
    valueType: 'status',
    valueEnum: {
      open: {
        text: '未解决',
        color: '#D4380D'
      },
      closed: {
        text: '已解决',
        color: 'green'
      },
      processing: {
        text: '解决中',
        color: 'blue'
      },
      error: {
        text: '失败',
        color: 'red'
      }
    }
  },
  {
    label: '标签',
    width: 200,
    prop: 'tag',
    valueType: 'tag',
    valueEnum: {
      success: {
        text: 'bug',
        color: 'success'
      },
      danger: {
        text: 'question',
        color: 'danger'
      },
      info: {
        text: 'info',
        color: 'info'
      },
      warning: {
        text: 'warning',
        color: 'warning'
      }
    }
  },
  {
    label: '执行进度',
    width: 300,
    prop: 'progress',
    valueType: 'progress'
  },
  {
    label: '评分',
    width: 300,
    prop: 'rate',
    valueType: 'rate'
  },
  {
    label: '开关',
    width: 100,
    prop: 'switch',
    valueType: 'switch',
    elSwitchOnColor: '#13ce66',
    elSwitchOffColor: '#ff4949'
  },
  {
    label: '图片',
    width: 120,
    prop: 'img',
    valueType: 'img'
  },
  {
    label: '时间',
    width: 190,
    prop: 'time',
    valueType: 'date'
  }
]

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
