<template>
  <el-card>
    <PlusSearch v-model="state" :columns="columns" :has-label="false" :has-unfold="false" />
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { PlusColumn } from 'plus-pro-components'

const state = ref({
  status: '0',
  time: new Date().toString()
})

const columns: PlusColumn[] = [
  {
    label: '名称',
    prop: 'name',
    valueType: 'copy',
    tooltip: '名称最多显示6个字符'
  },
  {
    label: '状态',
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
    label: '时间',
    prop: 'time',
    valueType: 'date-picker'
  }
]
</script>
