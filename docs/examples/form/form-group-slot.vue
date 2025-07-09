<template>
  <div>
    <PlusForm
      v-model="state"
      :group="group"
      :rules="rules"
      @change="handleChange"
      @submit="handleSubmit"
      @submit-error="handleSubmitError"
      @reset="handleReset"
    >
      <template #plus-form-group-one="scoped">
        【{{ scoped.index }}】 自定义 {{ scoped.title }} 内容 【{{ scoped.name }}】
      </template>
    </PlusForm>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { PlusFormGroupRow, FieldValues, PlusColumn } from 'plus-pro-components'
import { CreditCard, Calendar } from '@element-plus/icons-vue'

const state = ref({
  status: '0',
  name: '',
  rate: 4,
  progress: 100,
  switch: true,
  time: new Date().toString(),
  img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
})

const rules = {
  name: [
    {
      required: true,
      message: '请输入名称'
    }
  ],
  tag: [
    {
      required: true,
      message: '请输入标签'
    }
  ]
}

const group: PlusFormGroupRow[] = [
  {
    title: '第一分组',
    icon: CreditCard,
    // 自动生成 plus-form-group-one 插槽，v0.1.25 新增
    name: 'one',
    // 当plus-form-group-one 插槽存在时，这里的配置将不会生效
    columns: [
      {
        label: '名称',
        prop: 'name'
      }
    ]
  },
  {
    title: '第二分组',
    icon: Calendar,
    columns: [
      {
        label: '标签',
        width: 120,
        prop: 'tag'
      },
      {
        label: '执行进度',
        width: 200,
        prop: 'progress'
      },
      {
        label: '评分',
        width: 200,
        prop: 'rate',
        valueType: 'rate'
      },
      {
        label: '是否显示',
        width: 100,
        prop: 'switch',
        valueType: 'switch'
      }
    ]
  }
]

const handleChange = (values: FieldValues, prop: PlusColumn) => {
  console.log(values, prop, 'change')
}
const handleSubmit = (values: FieldValues) => {
  console.log(values, 'Submit')
}
const handleSubmitError = (err: any) => {
  console.log(err, 'err')
}
const handleReset = () => {
  console.log('handleReset')
}
</script>
