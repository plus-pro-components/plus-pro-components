<template>
  <el-button @click="handleOpen">打开弹窗表单</el-button>
  <PlusDialogForm v-model:visible="visible" v-model="values" :form="{ columns }">
    <template #plus-label-name="{ label }">
      <span style="color: red">{{ label }}</span>
    </template>

    <template #plus-label-status="{ label }">
      <span style="color: green">{{ label }}</span>
    </template>
  </PlusDialogForm>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { PlusColumn, FieldValues } from 'plus-pro-components'

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
    label: '是否显示',
    width: 100,
    prop: 'switch',
    valueType: 'switch'
  }
]

const visible = ref(false)
const values = ref<FieldValues>({})

const handleOpen = () => {
  visible.value = true
}
</script>
