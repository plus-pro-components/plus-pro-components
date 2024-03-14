<template>
  <el-card>
    <PlusForm v-model="state" label-width="100px" :columns="columns">
      <template #tooltip-icon>
        <el-icon :size="16" style="margin-left: 10px"><Warning /></el-icon>
      </template>
    </PlusForm>
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { PlusColumn, FieldValues } from 'plus-pro-components'
import { Warning } from '@element-plus/icons-vue'

const state = ref<FieldValues>({
  input: '文本'
})

const columns: PlusColumn[] = [
  {
    label: '输入框',
    prop: 'input',
    valueType: 'input',
    tooltip: '自动补全输入框'
  }
]
</script>
