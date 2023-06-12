<template>
  <el-button @click="handleOpen">打开弹窗</el-button>

  <PlusDialog
    v-model="show"
    header="标题"
    cancel-text="取消"
    confirm-text="确定"
    @confirm="handleConfirm"
  >
    确认删除此行数据吗？
  </PlusDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ElMessage } from 'element-plus'
const show = ref(false)

const handleConfirm = () => {
  ElMessage.success('删除成功')
  show.value = false
}
const handleOpen = () => {
  show.value = true
}
</script>
