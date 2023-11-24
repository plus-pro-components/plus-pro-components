<template>
  <PlusCheckCardGroup v-model="list" :options="options" />
</template>

<script lang="ts" setup>
import { ref, h } from 'vue'

const list = ref('0')

const options = [
  {
    title: () => h('div', { style: { color: 'red' } }, 'title0'),
    value: '0',
    description: () => h('div', { style: { color: 'green' } }, 'description'),
    avatar: () =>
      h(
        'img',
        { src: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg' },
        'description'
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
