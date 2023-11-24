<template>
  <PlusCheckCard
    v-model="checked"
    title="名称"
    description="description"
    :extra="extra"
    avatar="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    @extra="handleExtra"
  />
</template>

<script lang="ts" setup>
import { ref, h } from 'vue'
import { ElButton, ElMessage } from 'element-plus'

const checked = ref(true)

const extra = () => {
  return h(ElButton, () => '操作栏')
}

const handleExtra = () => {
  ElMessage.success('handleExtra')
}
</script>
