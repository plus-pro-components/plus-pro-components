<template>
  <el-card>
    <PlusForm v-model="state" :columns="columns" label-width="200px" @change="handleChange" />
  </el-card>
</template>

<script lang="ts" setup>
import { ref, h, Fragment } from 'vue'
import type { PlusColumn, FieldValues } from 'plus-pro-components'
import { fileToDataURL } from '@plus-pro-components/utils'
import { ElUpload, ElButton, ElImage, ElInput, ElTransfer } from 'element-plus'

const state = ref<FieldValues>({
  img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  elData: 'elData初始值',
  elData1: 'elData1初始值',
  elTransfer: [],
  data: '初始值',
  data1: '初始值1'
})

const columns: PlusColumn[] = [
  {
    label: '自定义el-input ',
    prop: 'elData1',
    fieldProps: {
      // 优先级低于 renderField 的props
      placeholder: '请输入'
    },
    renderField: (_, onChange) => {
      return h(ElInput, {
        // 返回VNode时，需要手动调用 renderField 的onChange 回调把值传给表单
        onChange
      })
    }
  },
  {
    label: '自定义ElTransfer',
    prop: 'elTransfer',
    renderField: (value, onChange) => {
      interface Option {
        key: number
        label: string
        disabled: boolean
      }
      const data: Option[] = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `Option ${i}`,
          disabled: i % 4 === 0
        })
      }
      return h(ElTransfer as any, {
        data: [...data],
        onChange
      })
    }
  },
  {
    label: '上传',
    prop: 'img',
    width: 100,
    valueType: 'img',
    renderField(value, onChange) {
      // 自定义上传
      const handleHttpRequest = async ({ file, onError, onSuccess }: any) => {
        try {
          onSuccess(file)
        } catch (error: any) {
          onError(error)
        }
        return file
      }

      return h(Fragment, [
        h(ElImage as any, {
          src: value,
          previewSrcList: [value],
          style: value
            ? {
                width: '60px',
                marginRight: '10px'
              }
            : {}
        }),
        h(
          ElUpload,
          {
            action: '',
            httpRequest: handleHttpRequest,
            onChange: async (data: any) => {
              const value = await fileToDataURL(data.raw)
              // 手动调用 renderField 的onChange 回调把值传给表单
              onChange(value)
            }
          },
          () => h(ElButton, () => '点击上传')
        )
      ])
    }
  },
  {
    label: '原生表单（返回VNode）',
    prop: 'data',
    fieldProps: {
      placeholder: '请输入原生表单值'
    },
    renderField: (value, onChange) => {
      return h('input', {
        // 原生表单需要手动添加 value值
        value: value,
        // 返回VNode时，需要手动调用 renderField 的onChange 回调把值传给表单
        onChange: (e: Event) => {
          const value = (e.target as HTMLInputElement)?.value
          onChange(value)
        },
        style: {
          border: '1px solid #ccc',
          width: '200px',
          padding: '0 10px'
        }
      })
    }
  },
  {
    label: '原生标签（返回字符串）',
    prop: 'data1',
    fieldProps: {
      placeholder: '请输入原生表单值',
      onChange(e: Event) {
        const value = (e?.target as HTMLInputElement)?.value
        return value
      }
    },

    renderField: value => {
      return h('div', null, value as string)
    }
  }
]

const handleChange = (values: FieldValues, prop: PlusColumn) => {
  console.log(values, prop, 'change')
}
</script>
