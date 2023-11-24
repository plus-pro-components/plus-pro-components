<template>
  <PlusCheckCard v-model="checked">
    <template #avatar> avatar </template>
    <template #title> title </template>
    <template #description> description </template>
  </PlusCheckCard>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checked = ref(true)
</script>
