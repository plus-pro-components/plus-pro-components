<template>
  <PlusDescriptions :column="3" :columns="columns" :data="dataList" border />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { PlusColumn } from '@plus-pro-components/types'

const TestServe = {
  getList: async () => {
    const data = [...new Array(2)].map((item, index) => {
      return {
        index,
        id: index,
        title: '序号' + (index + 1),
        name: 'name'.repeat(10),
        status: index === 0 ? 'processing' : index === 1 ? 'error' : 'closed',
        tag: index === 1 ? 'success' : index === 2 ? 'warning' : 'danger',
        progress: index === 0 ? { progress: 30, status: 'exception' } : { progress: 50 },
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
    })
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
        value: '#666'
      },
      {
        label: '已解决',
        value: 'green'
      },
      {
        label: '解决中',
        value: 'blue'
      },
      {
        label: '失败',
        value: 'red'
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
const dataList = ref<any>([])
const getList = async () => {
  try {
    const { data } = await TestServe.getList()
    dataList.value = data || []
  } catch (error) {}
}
getList()
</script>
