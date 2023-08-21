<template>
  <ClientOnly>
    <el-tooltip raw-content effect="light" trigger="click">
      <template #content>
        <code class="docs-tip-code">
          {{ content }}
        </code>
      </template>
      <el-icon :size="16" class="docs-tip-icon"><Warning /></el-icon>
    </el-tooltip>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { Warning } from '@element-plus/icons-vue'

defineProps({
  content: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.docs-tip-code {
  color: #0c61c9;
  background-color: #f5f7fa;
}
.docs-tip-icon {
  vertical-align: middle;
  cursor: pointer;
}
</style>
