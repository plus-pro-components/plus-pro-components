<template>
  <PlusFormItem value-type="checkbox" label="checkbox" prop="checkbox" :options="options" />
  <PlusFormItem
    v-model="values.checkbox"
    value-type="checkbox"
    label="checkbox"
    prop="checkbox"
    :options="option1"
  />
  <PlusFormItem
    v-model="values.checkbox"
    value-type="checkbox"
    label="checkbox"
    prop="checkbox"
    :options="option2"
  />
  <PlusFormItem
    v-model="values.checkbox"
    value-type="checkbox"
    label="checkbox"
    prop="checkbox"
    :options="option3"
  />
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { FieldValues } from 'plus-pro-components'

const options = () => {
  return new Promise(resolve => {
    resolve([
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
    ])
  })
}
const option1 = async () => {
  return [
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
}
const option2 = new Promise(resolve => {
  resolve([
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
  ])
})
const option3 = computed(() => [
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
])

const values = ref<FieldValues>({
  checkbox: []
})
</script>
