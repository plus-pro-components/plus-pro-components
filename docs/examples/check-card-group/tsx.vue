<template>
  <PlusCheckCardGroup v-model="list" :options="options" />
</template>

<script lang="tsx" setup>
import { ref } from 'vue'

const list = ref('0')

const options = [
  {
    title: () => <div>100</div>,
    value: '0',
    description: () => <div>100</div>,
    avatar: () => (
      <img src="https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg" />
    )
  },
  {
    title: 'title1',
    value: '1',
    description: 'description1',
    avatar: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg'
  }
]
</script>
