<template>
  <PlusPopover placement="top-start" trigger="hover" title="Title" :width="200">
    this is content, this is content, this is content
    <template #reference>
      <el-button>Hover to activate</el-button>
    </template>
  </PlusPopover>

  <PlusPopover
    placement="bottom"
    title="Title"
    :width="200"
    trigger="click"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <el-button style="margin-left: 20px">Click to activate</el-button>
    </template>
  </PlusPopover>

  <PlusPopover
    title="Title"
    :width="200"
    trigger="contextmenu"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <el-button style="margin-left: 20px">Contextmenu to activate</el-button>
    </template>
  </PlusPopover>

  <PlusPopover :visible="visible" placement="bottom" title="Title" trigger="click" :width="200">
    this is content, this is content, this is content
    <template #reference>
      <el-button style="margin-left: 20px" @click="visible = !visible"
        >Manual to activate</el-button
      >
    </template>
  </PlusPopover>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visible = ref(false)
</script>
