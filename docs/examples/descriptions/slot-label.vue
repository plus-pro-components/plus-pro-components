<template>
  <PlusDescriptions :column="2" :columns="columns" :data="descriptionsData">
    <template #plus-desc-label-name="{ label }">
      <el-tag type="success"> {{ label }} </el-tag>
    </template>

    <template #plus-desc-label-status="{ label }">
      <el-button type="success"> {{ label }} </el-button>
    </template>
  </PlusDescriptions>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
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
    prop: 'name'
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
