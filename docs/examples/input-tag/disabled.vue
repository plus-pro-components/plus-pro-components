<template>
  <PlusInputTag
    v-model="data"
    :input-props="{
      disabled: true
    }"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const data = ref([])
</script>
