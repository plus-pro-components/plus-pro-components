<template>
  <el-card>
    <PlusFormItem v-model="state" label="自定义" prop="name" @change="handleChange">
      <template #plus-field-name>
        <el-input v-model="state" placeholder="自定义输入框插槽" />
      </template>
    </PlusFormItem>
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { FieldValueType } from 'plus-pro-components'
import { ElInput } from 'element-plus'

const state = ref()

const handleChange = (value: FieldValueType) => {
  console.log(value, 'change')
}
</script>
