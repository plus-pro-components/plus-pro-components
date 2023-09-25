<template>
  <el-card>
    <PlusFormItem
      v-model="state"
      label="自定义"
      prop="name"
      :field-props="{
        placeholder: '请输入'
      }"
      :render-label="renderLabel"
      @change="handleChange"
    />
  </el-card>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue'
import type { FieldValueType, PlusColumn } from 'plus-pro-components'

const state = ref()

const renderLabel: PlusColumn['renderLabel'] = label => {
  return h(
    'div',
    {
      style: {
        color: 'red'
      }
    },
    label
  )
}

const handleChange = (value: FieldValueType) => {
  console.log(value, 'change')
}
</script>
