<template>
  <el-card>
    <PlusForm v-model="state" :columns="columns" :rules="rules" @submit="mySubmit">
      <template #footer="{ handleSubmit, handleReset }">
        <div style="margin: 0 auto">
          <el-button type="info">返回</el-button>
          <el-button type="primary" :loading="submitLoading" @click="handleSubmit">通过</el-button>
          <el-button v-if="hasReset" type="warning" @click="handleReset">重置</el-button>
          <el-button type="danger">驳回</el-button>
        </div>
      </template>
    </PlusForm>
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { PlusColumn, FieldValues } from 'plus-pro-components'

const state = ref<FieldValues>({
  status: '0',
  content: ''
})
const submitLoading = ref(false)
const hasReset = ref(true)

const columns: PlusColumn[] = [
  {
    label: '原因',
    width: 120,
    prop: 'content',
    valueType: 'textarea'
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
      }
    ]
  }
]

const rules = {
  content: [
    {
      required: true,
      message: '请输入原因'
    }
  ]
}

const mySubmit = () => {
  console.log(state.value)
}
</script>
