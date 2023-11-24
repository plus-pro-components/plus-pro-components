<template>
  <PlusCheckCard
    v-model="checked"
    :title="getTitle"
    :description="getDescription"
    :avatar="getAvatar"
  />
</template>

<script lang="tsx" setup>
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { ref } from 'vue'
import { ElButton, ElImage } from 'element-plus'

const checked = ref(true)

const getAvatar = () => {
  return (
    <ElImage
      style={{ width: '50px' }}
      src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    />
  )
}

const getTitle = () => {
  return <ElButton>title</ElButton>
}

const getDescription = () => {
  return 'description'
}
</script>
