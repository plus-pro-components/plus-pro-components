<template>
  <PlusInputTag
    v-model="data"
    :limit="3"
    :input-props="{
      placeholder: '请输入后按空格键或者回车键'
    }"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const data = ref(['tag1', 'tag2'])
</script>
