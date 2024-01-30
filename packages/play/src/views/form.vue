<template>
  <el-card>
    <PlusForm v-model="state" :columns="columns" :rules="rules" @change="handleChange" />
  </el-card>
</template>

<script lang="ts" setup>
import { ref, h } from 'vue'
import type { PlusColumn, FieldValues } from '@plus-pro-components/types'
import { Search } from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus'

const state = ref<FieldValues>({
  status: '0',
  name: '提示'
})

const rules = {
  name: [
    {
      required: true,
      message: '请输入名称'
    }
  ],
  status: [
    {
      required: true,
      message: '请输入标签'
    }
  ]
}

const columns: PlusColumn[] = [
  {
    label: '名称',
    prop: 'name',
    fieldSlots: {
      suffix: () => h(ElIcon, null, () => h(Search)),
      prefix: () => 'prefix',
      prepend: () => 'prepend',
      append: () => 'append'
    }
  }
]

const handleChange = (values: FieldValues, prop: PlusColumn) => {
  console.log(values, prop, 'change')
}
</script>
