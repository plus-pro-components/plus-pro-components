<template><PlusInputTag v-model="data" :limit="3" /></template>

<script lang="ts" setup>
import { ref } from 'vue'

const data = ref(['tag1', 'tag2', 'tag11', 'tag22'])
</script>
