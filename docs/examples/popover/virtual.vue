<template>
  <el-button ref="buttonRef" v-click-outside="onClickOutside">Click me</el-button>

  <PlusPopover
    ref="popoverRef"
    :virtual-ref="buttonRef"
    trigger="click"
    title="With title"
    virtual-triggering
  >
    <span> Some content </span>
  </PlusPopover>
</template>

<script lang="ts" setup>
import { ref, unref } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'

const buttonRef = ref()
const popoverRef = ref()
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
}
</script>
