<template>
  <div>
    <PlusForm v-model="state" :rules="rules" :columns="columns" :row-props="{ gutter: 20 }" />
  </div>
</template>

<script lang="tsx" setup>
import { ref } from 'vue'
import type { PlusColumn } from 'plus-pro-components'
import { ElInput } from 'element-plus'

const state = ref({
  status: '0',
  name: '默认值',
  rate: 4,
  progress: 100,
  switch: true,
  time: new Date().toString(),
  img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
})

const rules = {
  name: [
    {
      required: true,
      message: '请输入名称'
    }
  ],
  tag: [
    {
      required: true,
      message: '请输入标签'
    }
  ]
}

const columns: PlusColumn[] = [
  {
    label: '名称',
    width: 120,
    prop: 'name',
    valueType: 'copy',
    tooltip: '名称最多显示6个字符',
    renderField: value => {
      return <div style="color: green;">{value}</div>
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
    ],
    renderField: value => {
      return <ElInput modelValue={value as string} />
    }
  }
]
</script>
