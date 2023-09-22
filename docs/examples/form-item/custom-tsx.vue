<template>
  <el-card>
    <PlusFormItem
      v-model="state"
      label="自定义"
      prop="name"
      :field-props="{
        placeholder: '请输入tsx'
      }"
      :render-field="renderField"
      @change="handleChange"
    />
  </el-card>
</template>

<script lang="tsx" setup>
import { ref } from 'vue'
import type { FieldValueType, PlusColumn } from 'plus-pro-components'
import { ElInput } from 'element-plus'

const state = ref()

const renderField: PlusColumn['renderField'] = (value, onChange) => {
  return <ElInput modelValue={value as string} onChange={onChange} />
}

const handleChange = (value: FieldValueType) => {
  console.log(value, 'change')
}
</script>
