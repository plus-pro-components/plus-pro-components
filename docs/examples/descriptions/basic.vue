<template>
  <PlusDescriptions :column="3" :columns="columns" :data="descriptionsData" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { PlusColumn, RecordType } from 'plus-pro-components'

const TestServe = {
  getList: async () => {
    const index = Math.random() * 10
    const data = {
      index,
      id: index,
      title: '序号' + (index + 1),
      name: 'name'.repeat(10),
      status: '1',
      tag: index < 5 ? 'success' : 'danger',
      progress: 30,
      rate: index > 3 ? 2 : 3.5,
      switch: index > 3 ? true : false,
      indexColStyle:
        index < 3
          ? {
              backgroundColor: '#314659'
            }
          : {
              backgroundColor: '#979797'
            },
      time: new Date(),
      code: `
  const getData = async params => {
    const data = await getData(params)
    return { list: data.data, ...data }
  }`
    }
    return {
      data
    }
  }
}

const columns: PlusColumn[] = [
  {
    label: '名称',
    width: 120,
    prop: 'name',
    valueType: 'copy'
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
    valueType: 'rate'
  },
  {
    label: '开关',
    width: 100,
    prop: 'switch',
    valueType: 'switch'
  },
  {
    label: '时间',
    width: 190,
    prop: 'time',
    valueType: 'date-picker'
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
