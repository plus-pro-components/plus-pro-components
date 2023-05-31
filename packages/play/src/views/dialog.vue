<template>
  <PlusDialog v-model="show" header="标题" @confirm="handleConfirm">
    确认删除此行数据吗？
  </PlusDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import 'element-plus/es/components/message/style/css'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ElMessage } from 'element-plus'
const show = ref(true)

const handleConfirm = () => {
  ElMessage.success('删除成功')
  show.value = false
}
</script>
