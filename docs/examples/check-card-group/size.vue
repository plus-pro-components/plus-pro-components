<template>
  <PlusCheckCardGroup v-model="list2" :options="options" size="small" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const list2 = ref('0')

const options = [
  {
    title: 'title0',
    value: '0',
    description: 'description0',
    avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
  },
  {
    title: 'title1',
    value: '1',
    size: 'default',
    description: 'description1',
    avatar: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg'
  }
]
</script>
