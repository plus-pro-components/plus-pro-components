<template>
  <PlusInputTag v-model="data" :limit="3" />
  <PlusInputTag v-model="data1" style="max-width: 200px" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const data = ref(['tag1', 'tag2', 'tag11', 'tag22'])
const data1 = ref([])
</script>
