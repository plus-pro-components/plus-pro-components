<template>
  <el-card style="width: 600px">
    <PlusForm v-model="state" :columns="columns" :rules="rules" @change="handleChange" />
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { PlusColumn, FieldValues } from 'plus-pro-components'

const state = ref<FieldValues>({
  status: { data: { value: '0' } },
  name: { message: { tip: '提示' } }
})

const rules = {
  'name.message.tip': [
    {
      required: true,
      message: '请输入名称'
    }
  ],
  'status.data.value': [
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
    prop: 'name.message.tip',
    valueType: 'copy',
    tooltip: '名称最多显示6个字符'
  },
  {
    label: '状态',
    width: 120,
    prop: 'status.data.value',
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

const handleChange = (values: FieldValues, prop: PlusColumn) => {
  console.log(values, prop, 'change')
}
</script>
