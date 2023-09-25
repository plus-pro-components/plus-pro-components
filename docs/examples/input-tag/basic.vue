<template>
  <PlusInputTag v-model="data" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const data = ref(['tag1', 'tag2'])
</script>
