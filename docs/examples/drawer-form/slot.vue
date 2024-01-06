<template>
  <el-button @click="handleOpen">打开抽屉表单</el-button>
  <PlusDrawerForm v-model:visible="visible" v-model="values" :form="{ columns }">
    <template #plus-field-name>
      <el-input v-model="values.name" type="textarea" placeholder="自定义输入框插槽" />
    </template>

    <template #plus-field-status>
      <el-input v-model="values.status" type="textarea" placeholder="自定义输入框插槽" />
    </template>
  </PlusDrawerForm>
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
