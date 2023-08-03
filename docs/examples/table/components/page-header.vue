<template>
  <div class="page-header">
    返回
    <span>
      {{ content }}
    </span>
    层
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'CustomPageHeader'
})

defineProps({
  content: {
    type: [String, Number],
    default: '自定义组件'
  }
})
</script>
