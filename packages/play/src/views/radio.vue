<template>
  <PlusRadio v-model="state.value" :data="state.data" @change="change" />
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'

const state = reactive({
  data: [
    { label: 'Option A', value: 1 },
    { label: 'Option B', value: 2 }
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
const change = () => {
  console.log(3333)
}
</script>
