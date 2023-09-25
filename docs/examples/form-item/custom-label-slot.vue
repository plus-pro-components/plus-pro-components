<template>
  <el-card>
    <PlusFormItem
      v-model="state"
      label="自定义"
      prop="name"
      :field-props="{
        placeholder: '请输入'
      }"
      @change="handleChange"
    >
      <template #plus-label-name="{ label }">
        <div style="color: red">{{ label }}</div>
      </template>
    </PlusFormItem>
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { FieldValueType } from 'plus-pro-components'

const state = ref()

const handleChange = (value: FieldValueType) => {
  console.log(value, 'change')
}
</script>
