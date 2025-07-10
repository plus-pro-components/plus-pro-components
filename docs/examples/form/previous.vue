<template>
  <PlusForm v-model="state" label-width="120px" :columns="columns">
    <!--   plus-previous-name 插槽不生效，优先级低于renderPrevious-->
    <template #plus-previous-name> name </template>

    <template #plus-previous-tag="scoped">
      <div style="display: flex; margin-bottom: 18px">
        <label style="width: 120px; color: #606266; margin-right: 18px">
          没有的{{ scoped.label }}：
        </label>
        <el-input v-model="state.name" placeholder="自定义上一行内容" />
      </div>
    </template>
  </PlusForm>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { PlusColumn, FieldValues } from '@plus-pro-components/types'

const state = ref<FieldValues>({
  name: '',
  tag: ''
})

const columns: PlusColumn[] = [
  {
    label: '名称',
    prop: 'name',
    renderPrevious: () => 'renderPrevious'
  },
  {
    label: '标签',
    prop: 'tag'
  }
]
</script>
