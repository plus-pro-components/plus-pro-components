<template>
  <el-card>
    <PlusFormItem
      v-model="state"
      label="自定义"
      prop="name"
      :field-props="{
        placeholder: '请输入'
      }"
      :render-field="renderField"
      @change="handleChange"
    />
  </el-card>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue'
import type { FieldValueType, PlusColumn } from 'plus-pro-components'
import { ElInput } from 'element-plus'

const state = ref()

const renderField: PlusColumn['renderField'] = (_, onChange) => {
  return h(ElInput, {
    // 返回VNode时，需要手动调用 renderField 的onChange 回调把值传给表单
    onChange,
    placeholder: '请输入姓名'
  })
}

const handleChange = (value: FieldValueType) => {
  console.log(value, 'change')
}
</script>
