<template>
  <div>
    <h4>右对齐 + 左侧插槽</h4>
    <PlusPagination v-model="page" :total="100" :small="true">
      <template #pagination-left>
        <span class="fs-12">插槽内容</span>
      </template>
    </PlusPagination>

    <h4>左对齐 + 右侧插槽</h4>
    <PlusPagination v-model="page" :total="100" align="left" :small="true">
      <template #pagination-right>
        <span class="fs-12">插槽内容</span>
      </template>
    </PlusPagination>

    <h4>居中对齐（无插槽）</h4>
    <PlusPagination v-model="page" :total="100" align="center" :small="true" />

    <h4>居中对齐 + 左右插槽</h4>
    <PlusPagination v-model="page" :total="100" align="center" :small="true">
      <template #pagination-left>
        <span class="fs-12">左侧内容</span>
      </template>
      <template #pagination-right>
        <span class="fs-12">右侧内容</span>
      </template>
    </PlusPagination>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const page = ref()
</script>

<style lang="scss" scoped>
.fs-12 {
  font-size: 12px;
}

h4 {
  margin: 20px 0 10px 0;
  font-size: 14px;
  color: #606266;
}
</style>
