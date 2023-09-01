<template>
  <PlusRadio v-model="state.value" disabled :options="state.options" @change="change" />
  <br />
  <PlusRadio v-model="state.value1" :options="state.options1" @change="change" />
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { OptionsRow } from 'plus-pro-components'

type State = {
  options: OptionsRow[]
  options1: OptionsRow[]
  value: number
  value1: number
}

const state = reactive<State>({
  options: [
    {
      label: '选项一',
      value: 1
    },
    {
      label: '选项二',
      value: 2
    }
  ],
  options1: [
    {
      label: '选项一',
      value: 1,
      // el-radio 的 props
      fieldItemProps: {
        disabled: true
      }
    },
    {
      label: '选项二',
      value: 2
    }
  ],
  value: 1,
  value1: 1
})

watch(
  () => state.value,
  val => {
    console.log(val, 'val')
  }
)

const change = (val: number) => {
  console.log(val, 'change')
}
</script>
