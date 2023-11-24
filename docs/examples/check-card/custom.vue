<template>
  <PlusCheckCard
    v-model="checked"
    :title="getTitle"
    :description="getDescription"
    :avatar="getAvatar"
  />
</template>

<script lang="ts" setup>
import { ref, h } from 'vue'
import { ElButton, ElImage } from 'element-plus'

const checked = ref(true)

const getAvatar = () => {
  return h(ElImage, {
    style: {
      width: '50px'
    },
    src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
  })
}

const getTitle = () => {
  return h(ElButton, () => 'title')
}

const getDescription = () => {
  return 'description'
}
</script>
