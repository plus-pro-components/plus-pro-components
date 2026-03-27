<template>
  <div>
    <el-alert type="info" :closable="false" style="margin-bottom: 10px">
      <template #title>
        当前搜索值：<el-text tag="code">{{ searchValues }}</el-text>
      </template>
    </el-alert>

    <PlusPage
      v-model:search-values="searchValues"
      :columns="tableConfig"
      :request="getList"
      :search="{
        showNumber: 3
      }"
      @search-change="handleChange"
    />
  </div>
</template>

<script lang="ts" setup>
import type { PlusColumn, PageInfo, FieldValues } from 'plus-pro-components'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const searchValues = ref<FieldValues>({
  status: '0',
  name: '4name',
  time: ''
})

const handleChange = (values: FieldValues, column: PlusColumn) => {
  ElMessage.info(`字段 "${column.label}" 变化，当前值：${JSON.stringify(values)}`)
}

const getList = async (
  query: Partial<PageInfo> & {
    status?: string
    name?: string
    time?: string
  }
) => {
  const { page = 1, pageSize = 20, status, name, time } = query || {}
  const total = 100
  const List = Array.from({ length: total }).map((item, index) => {
    return {
      id: index,
      name: index === 0 ? 'name'.repeat(20) : index + 'name',
      status: String(index % 4),
      tag: index === 1 ? 'success' : index === 2 ? 'warning' : index === 3 ? 'info' : 'danger',
      time: new Date().toString()
    }
  })

  const mockList = List.filter(item => {
    if (status && status !== item.status) {
      return false
    }
    if (name && name !== item.name) {
      return false
    }
    if (time && time !== item.time) {
      return false
    }
    return true
  })

  const pageList = mockList.filter(
    (item, index) => index < pageSize * page && index >= pageSize * (page - 1)
  )

  await new Promise(resolve => {
    setTimeout(() => {
      resolve('')
    }, 1000)
  })

  return { data: pageList, success: true, total: mockList.length }
}

const tableConfig: PlusColumn[] = [
  {
    label: '名称',
    width: 120,
    prop: 'name',
    tableColumnProps: {
      showOverflowTooltip: true
    }
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
    width: 120,
    prop: 'tag',
    valueType: 'tag',
    hideInSearch: true
  },
  {
    label: '时间',
    prop: 'time',
    valueType: 'date-picker',
    hideInForm: true
  }
]
</script>
