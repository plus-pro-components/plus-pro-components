<template>
  <el-card>
    <PlusForm v-model="state" :columns="columns" :has-label="false" />
  </el-card>
  <el-card style="margin-top: 20px">
    <PlusForm v-model="state" :columns="columns1" />
  </el-card>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { PlusColumn, FieldValues } from 'plus-pro-components'

const state = ref<FieldValues>({
  status: '0',
  name: ''
})

const columns: PlusColumn[] = [
  {
    label: '名称',
    width: 120,
    prop: 'name',
    valueType: 'copy',
    tooltip: '名称最多显示6个字符',
    // 优先级会更高。
    hasLabel: true
  },
  {
    label: '名称1',
    width: 120,
    prop: 'name1',
    // 优先级会更高。
    hasLabel: ref(true)
  },
  {
    label: '名称2',
    width: 120,
    prop: 'name2',
    // 优先级会更高。
    hasLabel: computed(() => true)
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
const columns1: PlusColumn[] = [
  {
    label: '名称',
    width: 120,
    prop: 'name',
    valueType: 'copy',
    tooltip: '名称最多显示6个字符',
    // 优先级会更高。
    hasLabel: false
  },
  {
    label: '名称1',
    width: 120,
    prop: 'name1',
    // 优先级会更高。
    hasLabel: ref(false)
  },
  {
    label: '名称2',
    width: 120,
    prop: 'name2',
    // 优先级会更高。
    hasLabel: computed(() => false)
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
