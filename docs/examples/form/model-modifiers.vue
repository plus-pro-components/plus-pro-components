<template>
  <el-card>
    <PlusForm
      v-model="state"
      label-width="140px"
      :columns="columns"
      @change="handleChange"
      @submit="handleSubmit"
      @submit-error="handleSubmitError"
      @reset="handleReset"
    />
  </el-card>
</template>

<script lang="ts" setup>
import { ref, h } from 'vue'
import type { PlusColumn, FieldValues } from '@plus-pro-components/types'
import { ElInput } from 'element-plus'

const state = ref<FieldValues>({
  autocomplete: 'vue',
  input: '100',
  input1: '单行文本',
  textarea: '多行文本'
})

interface RestaurantItem {
  value: string
  link: string
}

const restaurants = ref<RestaurantItem[]>([])

const createFilter = (queryString: string) => {
  return (restaurant: RestaurantItem) => {
    return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
  }
}
const loadAll = () => {
  return [
    { value: 'vue', link: 'https://github.com/vuejs/vue' },
    { value: 'element', link: 'https://github.com/ElemeFE/element' },
    { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
    { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
    { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
    { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
    { value: 'babel', link: 'https://github.com/babel/babel' }
  ]
}

restaurants.value = loadAll()

const columns: PlusColumn[] = [
  {
    label: 'autocomplete',
    width: 120,
    prop: 'autocomplete',
    valueType: 'autocomplete',
    tooltip: '自动补全输入框',
    fieldProps: {
      modelModifiers: { trim: true },
      fetchSuggestions: (queryString: string, cb: any) => {
        const results = queryString
          ? restaurants.value.filter(createFilter(queryString))
          : restaurants.value
        // call callback function to return suggestions
        cb(results)
      }
    }
  },
  {
    label: 'input',
    width: 120,
    prop: 'input',
    fieldProps: {
      modelModifiers: { trim: true, number: true, lazy: true }
    }
  },
  {
    label: 'input',
    width: 120,
    prop: 'input1',
    // fieldProps 会同时作用于 renderField返回值的props，优先级低于返回值的props，建议直接写在renderField中
    fieldProps: {
      modelModifiers: { trim: true, number: false }
    },
    renderField: (value, onChange) => {
      return h(ElInput, { modelValue: value as string, onChange, modelModifiers: { trim: true } })
    }
  },

  {
    label: 'textarea',
    prop: 'textarea',
    valueType: 'textarea',
    fieldProps: {
      modelModifiers: { trim: true }
    }
  }
]

const handleChange = (values: FieldValues, prop: PlusColumn) => {
  console.log(values, prop, 'change')
}
const handleSubmit = (values: FieldValues) => {
  console.log(values, 'Submit')
}
const handleSubmitError = (err: any) => {
  console.log(err, 'err')
}
const handleReset = () => {
  console.log('handleReset')
}
</script>
