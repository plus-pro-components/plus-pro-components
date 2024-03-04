<template>
  <PlusPagination v-model="page" :total="100">
    <template #pagination-left> pagination-left </template>
  </PlusPagination>

  <PlusPagination v-model="page" :total="100" align="left">
    <template #pagination-right> pagination-right </template>
  </PlusPagination>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const page = ref()
</script>
