<template>
  <PlusPagination v-model="page" :total="100" />
  {{ page }}
</template>

<script setup lang="ts">
import { ref } from 'vue'

const page = ref()
</script>
