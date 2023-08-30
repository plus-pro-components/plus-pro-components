<template>
  <div>
    <PlusForm v-model="state" :rules="rules" :columns="columns" :row-props="{ gutter: 20 }">
      <!--这里的plus-label-name 插槽没有生效，因为它的优先级低于renderLabel函数 -->
      <template #plus-label-name="{ label }">
        <span style="color: red">{{ label }}</span>
      </template>

      <template #plus-label-status="{ label }">
        <span style="color: green">{{ label }}</span>
      </template>
    </PlusForm>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { PlusColumn } from '@plus-pro-components/types'

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
    renderLabel: () => {
      return 'div'
    },
    labelSlots: {
      default(value) {
        return `${value}`
      }
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
  }
]
</script>
