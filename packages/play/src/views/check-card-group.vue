<template>
  单选
  <PlusCheckCardGroup v-model="list" :options="options" />
  {{ list }}
  <br />
  多选
  <PlusCheckCardGroup v-model="list1" :options="options" multiple />
  {{ list1 }}

  disabled
  <PlusCheckCardGroup v-model="list2" :options="options" multiple disabled />

  slot
  <PlusCheckCardGroup v-model="list3" :options="options">
    <template #avatar-0> 000 </template>
    <template #title-0="{ title }"> {{ title }} </template>
    <template #description-0="{ description }"> {{ description }} </template>
  </PlusCheckCardGroup>

  slot
  <PlusCheckCardGroup v-model="list4" :options="options">
    <template #avatar> 000 </template>
    <template #title="{ title }"> {{ title }} </template>
    <template #description="{ description }"> {{ description }} </template>
  </PlusCheckCardGroup>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const list = ref('0')
const list1 = ref([])
const list2 = ref([])
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
