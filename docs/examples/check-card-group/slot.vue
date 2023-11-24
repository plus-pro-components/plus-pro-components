<template>
  个性化插槽
  <PlusCheckCardGroup v-model="list3" :options="options">
    <template #avatar-0> 000 </template>
    <template #title-0="{ title }"> {{ title }} </template>
    <template #description-0="{ description }"> {{ description }} </template>
    <template #extra-0> extra</template>
  </PlusCheckCardGroup>

  整体插槽
  <PlusCheckCardGroup v-model="list4" :options="options">
    <template #avatar> 000 </template>
    <template #title="{ title }">
      <button>{{ title }}</button>
    </template>
    <template #description="{ description }">
      <div style="color: red">{{ description }}</div>
    </template>
    <template #extra>
      <button>extra</button>
    </template>
  </PlusCheckCardGroup>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const list3 = ref([])
const list4 = ref([])
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
    description: 'description1',
    avatar: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg'
  }
]
</script>
