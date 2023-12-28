<template>
  <div>
    <PlusSearch
      v-model="state"
      :columns="columns"
      :default-values="defaultValues"
      :has-unfold="false"
    />
  </div>
</template>

<script lang="ts" setup>
import type { PlusColumn } from 'plus-pro-components'
import { ref } from 'vue'

const defaultValues = {
  name: 'name',
  time: new Date()
}

const state = ref({
  name: 'name',
  status: '0',
  progress: '0',
  tag: '0-0-0',
  time: new Date()
})

const columns: PlusColumn[] = [
  {
    label: '名称',
    tooltip: '名称最多显示6个字符',
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
    fieldProps: (value: string) => {
      return { type: value }
    }
  },
  {
    label: '执行进度',
    width: 200,
    prop: 'progress',
    valueType: 'progress',
    fieldProps: (value: number) => {
      const data =
        value === 0
          ? { status: 'exception' }
          : value > 5
          ? { status: 'warning' }
          : value > 3
          ? { status: 'success' }
          : { status: 'exception' }

      return data
    }
  },
  {
    label: '时间',
    prop: 'time',
    valueType: 'date-picker'
  }
]
</script>
