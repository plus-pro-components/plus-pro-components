<template>
  <PlusDatePicker v-model="date" @change="handleChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const date = ref([])

const handleChange = (value: string[]) => {
  console.log(value)
}
</script>
