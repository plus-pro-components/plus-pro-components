<template>
  <div>
    <h4>右对齐（默认）</h4>
    <PlusPagination v-model="page" :total="100" />

    <h4>左对齐</h4>
    <PlusPagination v-model="page" :total="100" align="left" />

    <h4>居中对齐</h4>
    <PlusPagination v-model="page" :total="100" align="center" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const page = ref()
</script>

<style scoped>
h4 {
  margin: 20px 0 10px 0;
  font-size: 14px;
  color: #606266;
}
</style>
