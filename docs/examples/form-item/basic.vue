<template>
  <PlusFormItem v-model="values.name" label="输入框" prop="name" />

  <PlusFormItem
    v-model="values.cascader"
    value-type="cascader"
    label="级联"
    prop="cascader"
    :options="options"
  />

  <PlusFormItem
    v-model="values.checkbox"
    value-type="checkbox"
    label="级联"
    prop="checkbox"
    :options="checkboxOptions"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { FieldValues } from 'plus-pro-components'

const options = [
  {
    value: '0',
    label: '陕西',
    children: [
      {
        value: '0-0',
        label: '西安',
        children: [
          {
            value: '0-0-0',
            label: '新城区'
          },
          {
            value: '0-0-1',
            label: '高新区'
          },
          {
            value: '0-0-2',
            label: '灞桥区'
          }
        ]
      }
    ]
  },
  {
    value: '1',
    label: '山西',
    children: [
      {
        value: '1-0',
        label: '太原',
        children: [
          {
            value: '1-0-0',
            label: '小店区'
          },
          {
            value: '1-0-1',
            label: '古交市'
          },
          {
            value: '1-0-2',
            label: '万柏林区'
          }
        ]
      }
    ]
  }
]

const checkboxOptions = [
  {
    label: '四六级',
    value: '0'
  },
  {
    label: '计算机二级证书',
    value: '1'
  },
  {
    label: '普通话证书',
    value: '2'
  }
]

const values = ref<FieldValues>({
  name: '',
  cascader: '',
  checkbox: []
})
</script>
