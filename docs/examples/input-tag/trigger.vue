<template>
  <p>失去焦点触发</p>
  <PlusInputTag v-model="data" trigger="blur" />

  <p>按空格键触发</p>
  <PlusInputTag v-model="data1" trigger="space" />

  <p>按回车键触发</p>
  <PlusInputTag v-model="data2" trigger="enter" />

  <p>失去焦点触发，按回车键触发</p>
  <PlusInputTag v-model="data3" :trigger="['blur', 'enter']" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const data = ref(['tag1', 'tag2'])
const data1 = ref(['tag1', 'tag2'])
const data2 = ref(['tag1', 'tag2'])
const data3 = ref(['tag1', 'tag2'])
</script>
