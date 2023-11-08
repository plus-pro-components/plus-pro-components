<template>
  <PlusHeader :dropdown-list="dropdownList" @clickDropdownItem="handleClickDropdownItem" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
const dropdownList = ref([
  {
    label: '设置',
    value: 'setting'
  },
  {
    label: '个人中心',
    value: 'userCenter'
  }
])

const handleClickDropdownItem = (item: { label: string; value: string }) => {
  ElMessage.success(item.label)
}
</script>
