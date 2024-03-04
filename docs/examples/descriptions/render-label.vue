<template>
  <PlusDescriptions :column="2" :columns="columns" :data="descriptionsData" />
</template>

<script lang="ts" setup>
import { h, ref } from 'vue'
import type { PlusColumn, RecordType } from 'plus-pro-components'
import { ElTag, ElButton } from 'element-plus'

const TestServe = {
  getList: async () => {
    const index = Math.random() * 10
    const data = {
      index,
      status: '1',
      name: '序号' + (index + 1)
    }
    return { data }
  }
}

const columns: PlusColumn[] = [
  {
    label: '名称',
    width: 120,
    prop: 'name',
    renderDescriptionsLabel: ({ label }) => h(ElTag, { type: 'success' }, () => label)
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
    ],
    renderDescriptionsLabel: ({ label }) => h(ElButton, { type: 'success' }, () => label)
  }
]
const descriptionsData = ref<RecordType>({})
const getList = async () => {
  try {
    const { data } = await TestServe.getList()
    descriptionsData.value = data || {}
  } catch (error) {}
}
getList()
</script>
