<template>
  <div class="plus-example-field-slots">
    <PlusDisplayItem v-for="item in columns" :key="item.label" :column="item" :row="row" />
  </div>
</template>

<script lang="ts" setup>
import { h } from 'vue'
import type { PlusColumn } from 'plus-pro-components'
import { ElEmpty, ElIcon } from 'element-plus'
import { Link } from '@element-plus/icons-vue'

const columns: PlusColumn[] = [
  {
    label: '图片',
    prop: 'img',
    valueType: 'img',
    fieldProps: {
      style: {
        width: '200px'
      }
    },
    fieldSlots: {
      error: () => h(ElEmpty, { width: '100%', description: '图片坏了' })
    }
  },
  {
    label: 'link',
    prop: 'link',
    valueType: 'link',
    fieldSlots: {
      default: () => h('div', null, '按钮'),
      icon: () => h(ElIcon, null, () => h(Link))
    }
  },
  {
    label: 'progress',
    prop: 'progress',
    valueType: 'progress',
    fieldSlots: {
      default: () => h('div', null, '默认')
    }
  }
]
const row = {
  img: '',
  link: '',
  progress: 30
}
</script>
