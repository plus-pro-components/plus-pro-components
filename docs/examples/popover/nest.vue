<template>
  <PlusPopover
    :visible="visible"
    placement="top"
    :width="160"
    has-show-bottom-button
    @confirm="confirm"
    @cancel="cancel"
  >
    <p>Are you sure to delete this?</p>
    <template #reference>
      <el-button @click="visible = !visible">Delete</el-button>
    </template>
  </PlusPopover>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visible = ref(false)

const confirm = () => {
  console.log('confirm')
}

const cancel = () => {
  console.log('cancel')
}
</script>
