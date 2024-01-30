<template>
  <PlusDisplayItem v-for="item in columns" :key="item.label" :column="item" :row="row" />
</template>

<script lang="ts" setup>
import type { PlusColumn } from '@plus-pro-components/types'

const columns: PlusColumn[] = [
  {
    label: '名称',
    width: 120,
    prop: 'name',
    valueType: 'copy',
    tooltip: '名称最多显示6个字符'
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
    prop: 'tag'
  },
  {
    label: 'money',
    width: 120,
    prop: 'money',
    valueType: 'money'
  },
  {
    label: '执行进度',
    width: 200,
    prop: 'progress',
    valueType: 'progress'
  },
  {
    label: '评分',
    width: 200,
    prop: 'rate',
    editable: true,
    valueType: 'rate'
  },
  {
    label: '是否显示',
    width: 100,
    prop: 'switch',
    editable: true,
    valueType: 'switch'
  },
  {
    label: '时间',
    prop: 'time',
    valueType: 'date-picker'
  },
  {
    label: 'img',
    prop: 'img',
    valueType: 'img',
    fieldSlots: {}
  },
  {
    label: '链接',
    prop: 'place',
    valueType: 'link',
    linkText: 'link',
    fieldSlots: {
      default: () => 'prefix'
    }
  },
  {
    label: 'code',
    prop: 'code',
    valueType: 'code'
  },
  {
    label: 'copy',
    prop: 'copy',
    valueType: 'copy'
  }
]
const row = {
  name: 'name',
  status: '1',
  tag: 'success',
  money: '100',
  progress: 30,
  rate: 4,
  switch: true,
  time: new Date(),
  code: `const data = 100`,
  copy: 'copy',
  img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
}
</script>
