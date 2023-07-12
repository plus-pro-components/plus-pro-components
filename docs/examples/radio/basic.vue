<template>
  <PlusRadio v-model="state.value" :data="state.data" is-cancel @change="change" />
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'

const state = reactive({
  data: [
    { label: '选项一', value: 1 },
    { label: '选项二', value: 2 }
  ],
  value: 1
})

watch(
  () => state.value,
  val => {
    console.log(val)
  },
  { immediate: true }
)
const change = (val: number) => {
  console.log(val)
}
</script>
