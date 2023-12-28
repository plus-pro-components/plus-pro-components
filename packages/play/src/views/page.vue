<template>
  <div>
    <PlusPage :columns="tableConfig" :request="getList" />
  </div>
</template>

<script lang="ts" setup>
import type { PlusColumn, PageInfo } from '@plus-pro-components/types'
import { fileToDataURL } from '@plus-pro-components/utils'
import type { UploadFile } from 'element-plus'
import { ElUpload, ElButton, ElImage } from 'element-plus'
import { h, Fragment } from 'vue'

const getList = async (
  query: PageInfo & {
    status?: string
    name?: string
  }
) => {
  const { page = 1, pageSize = 20, status, name } = query || {}
  const total = 1000
  const List = [...new Array(total)].map((item, index) => {
    return {
      id: index,
      name: index === 0 ? 'name'.repeat(20) : index + 'name',
      status: String(index % 3),
      tag: index === 1 ? 'success' : index === 2 ? 'warning' : index === 3 ? 'info' : 'danger',
      progress: 10,
      rate: index > 3 ? 2 : 3.5,
      switch: index % 2 === 0 ? true : false,
      img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      time: new Date(),
      code: `
          const getData = async params => {
            const data = await getData(params)
            return { list: data.data, ...data }
          }`,
      custom: 'custom' + index
    }
  })

  const mockList = List.filter(item => {
    if (status && status !== item.status) {
      return false
    }
    if (name && name !== item.name) {
      return false
    }

    return true
  })

  const pageList = mockList.filter(
    (item, index) => index < pageSize * page && index >= pageSize * (page - 1)
  )

  // 等待2s
  await new Promise(resolve => {
    setTimeout(() => {
      resolve('')
    }, 2000)
  })

  return { data: pageList, success: true, total: mockList.length }
}

const tableConfig: PlusColumn[] = [
  {
    label: '名称',
    tooltip: '名称最多显示6个字符',
    width: 120,
    prop: 'name',

    tableColumnProps: {
      showOverflowTooltip: true
    },
    colProps: {
      xs: 24,
      sm: 12,
      md: 8,
      lg: 8,
      xl: 3
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
    ],
    colProps: {
      xs: 24,
      sm: 12,
      md: 8,
      lg: 8,
      xl: 3
    }
  },
  {
    label: '标签',
    width: 120,
    prop: 'tag',
    valueType: 'tag',
    fieldProps: (value: string) => {
      return { type: value }
    },
    colProps: {
      xs: 24,
      sm: 12,
      md: 8,
      lg: 8,
      xl: 3
    }
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
    },
    colProps: {
      xs: 24,
      sm: 12,
      md: 8,
      lg: 8,
      xl: 3
    }
  },
  {
    label: '代码块',
    width: 250,
    prop: 'code',
    hideInSearch: true,
    valueType: 'code',
    colProps: {
      xs: 24,
      sm: 12,
      md: 8,
      lg: 8,
      xl: 3
    }
  },
  {
    label: '评分',
    width: 200,
    prop: 'rate',
    valueType: 'rate',
    hideInSearch: true,
    editable: true,
    colProps: {
      xs: 24,
      sm: 12,
      md: 8,
      lg: 8,
      xl: 3
    }
  },
  {
    label: '开关',
    width: 100,
    prop: 'switch',
    hideInSearch: true,
    valueType: 'switch',
    editable: true,
    colProps: {
      xs: 24,
      sm: 12,
      md: 8,
      lg: 8,
      xl: 3
    }
  },
  {
    label: '图片',
    prop: 'img',
    width: 100,
    hideInSearch: true,
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
            onChange: async (data: UploadFile) => {
              const base64 = await fileToDataURL(data.raw as File)
              // 调用 renderField 的onChange 回调把值传给表单
              onChange(base64)
            }
          },
          () => h(ElButton, () => '点击上传')
        )
      ])
    },
    colProps: {
      xs: 24,
      sm: 12,
      md: 8,
      lg: 8,
      xl: 3
    }
  },
  {
    label: '时间',
    prop: 'time',
    valueType: 'date-picker',
    hideInForm: true,
    colProps: {
      xs: 24,
      sm: 12,
      md: 8,
      lg: 8,
      xl: 3
    }
  }
]
</script>
