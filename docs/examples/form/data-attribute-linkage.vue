<template>
  <el-card>
    <PlusForm v-model="state" :columns="columns" />
  </el-card>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { PlusColumn, FieldValues } from 'plus-pro-components'

const state = ref<FieldValues>({
  status: '0',
  name: '',
  rate: 4,
  progress: 100,
  switch: true,
  time: new Date().toString(),
  endTime: [],
  img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
})

const columns: PlusColumn[] = [
  {
    label: '状态',
    width: 120,
    prop: 'status',
    valueType: 'select',
    options: [
      {
        label: '未解决',
        value: '0',
        color: 'red'
      },
      {
        label: '已解决',
        value: '1',
        color: 'blue'
      }
    ]
  },
  {
    label: '要求1',
    prop: 'demand1',
    valueType: 'checkbox',
    options: computed(() =>
      state.value.status === '0'
        ? [
            {
              label: '四六级',
              value: '0'
            },
            {
              label: '计算机二级证书',
              value: '1'
            },
            {
              label: '普通话证书',
              value: '1'
            }
          ]
        : [
            {
              label: '四六级',
              value: '0'
            }
          ]
    )
  },
  {
    label: '名称1',
    width: 120,
    prop: 'name1',
    valueType: 'copy',
    tooltip: '名称最多显示6个字符',
    fieldProps: { disabled: computed(() => state.value.status === '1') }
  },
  {
    label: '标签1',
    width: 120,
    prop: 'tag1',
    hideInForm: computed(() => state.value.status === '1')
  },
  {
    label: '名称2',
    width: 120,
    prop: 'name2',
    valueType: 'copy',
    tooltip: '名称最多显示6个字符',
    fieldProps: computed(() => ({ disabled: state.value.status === '1' }))
  },
  {
    label: '标签2',
    width: 120,
    prop: 'tag2',
    formItemProps: computed(() => ({ required: state.value.status === '1' }))
  }
]
</script>
