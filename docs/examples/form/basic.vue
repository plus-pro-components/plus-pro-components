<template>
  <PlusForm
    v-model="state"
    :columns="columns"
    :rules="rules"
    @change="handleChange"
    @submit="handleSubmit"
    @submit-error="handleSubmitError"
    @cancel="handleCancel"
  />
</template>

<script lang="ts" setup>
import { ref, h } from 'vue'
import type { PlusColumn } from '@plus-pro-components/types'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ElUpload, ElButton } from 'element-plus'

const state = ref({
  status: '0',
  name: '',
  rate: 4,
  progress: 100,
  switch: true,
  time: new Date().toString()
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

const columns: PlusColumn[] = [
  {
    label: '名称',
    width: 120,
    prop: 'name',
    valueType: 'copy',
    tableColumnProps: {
      'show-overflow-tooltip': true
    }
  },
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
      },
      {
        label: '解决中',
        value: '2',
        color: 'yellow'
      },
      {
        label: '失败',
        value: '3',
        color: 'red'
      }
    ]
  },
  {
    label: '标签',
    width: 120,
    prop: 'tag'
  },
  {
    label: '执行进度',
    width: 200,
    prop: 'progress',
    valueType: 'progress',
    fieldProps: (value: number) => {
      const data =
        value === 0
          ? { status: 'exception' }
          : value > 5
          ? { status: 'warning' }
          : value > 3
          ? { status: 'success' }
          : { status: 'exception' }

      return data
    }
  },

  {
    label: '评分',
    width: 200,
    prop: 'rate',
    valueType: 'rate'
  },
  {
    label: '开关',
    width: 100,
    prop: 'switch',
    valueType: 'switch'
  },
  {
    label: '图片',
    prop: 'img',
    width: 100,
    valueType: 'img',
    renderFormItem(_, onChange) {
      // 自定义上传
      const handleHttpRequest = async ({ file, onError, onSuccess }: any) => {
        try {
          onSuccess(file)
        } catch (error: any) {
          onError(error)
        }
        return file
      }

      return h(
        ElUpload,
        {
          action: '',
          httpRequest: handleHttpRequest,
          onChange: (file: any) => {
            onChange(file.raw.name)
          }
        },
        () => h(ElButton, () => '点击上传')
      )
    }
  },
  {
    label: '时间',
    prop: 'time',
    width: 180,
    valueType: 'date-picker'
  }
]

const handleChange = (values: any) => {
  console.log(values, 'change')
}
const handleSubmit = (values: any) => {
  console.log(values, 'Submit')
}
const handleSubmitError = (err: any) => {
  console.log(err, 'err')
}
const handleCancel = () => {
  console.log('handleCancel')
}
</script>
