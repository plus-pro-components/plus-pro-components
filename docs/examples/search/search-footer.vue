<template>
  <div>
    <PlusSearch v-model="state" :columns="columns">
      <template #footer="{ handleReset, handleSearch, handleUnfold, isShowUnfold }">
        <div style="display: flex">
          <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
          <el-button :icon="Refresh" @click="handleReset">重置</el-button>
          <el-button :icon="isShowUnfold ? ArrowUp : ArrowDown" @click="handleUnfold">
            {{ isShowUnfold ? '收起' : '展开' }}
          </el-button>
        </div>
      </template>
    </PlusSearch>
  </div>
</template>

<script lang="ts" setup>
import type { PlusColumn } from 'plus-pro-components'
import { fileToDataURL } from '@plus-pro-components/utils'
import type { UploadFile } from 'element-plus'
import { ElUpload, ElButton, ElImage } from 'element-plus'
import { h, Fragment, ref } from 'vue'
import { Search, Refresh, ArrowDown, ArrowUp } from '@element-plus/icons-vue'

const state = ref({
  status: '0',
  async: '0',
  promise: '0-0-0',
  time: new Date().toString()
})

const columns: PlusColumn[] = [
  {
    label: '名称',
    tooltip: '名称最多显示6个字符',
    width: 120,
    prop: 'name',
    tableColumnProps: {
      showOverflowTooltip: true
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
    prop: 'tag',
    valueType: 'tag',
    fieldProps: (value: string) => {
      return { type: value }
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
    }
  },
  {
    label: '代码块',
    width: 250,
    prop: 'code',
    hideInSearch: true,
    valueType: 'code'
  },
  {
    label: '评分',
    width: 200,
    prop: 'rate',
    valueType: 'rate',
    hideInSearch: true,
    editable: true
  },
  {
    label: '开关',
    width: 100,
    prop: 'switch',
    hideInSearch: true,
    valueType: 'switch',
    editable: true
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
    }
  },
  {
    label: '时间',
    prop: 'time',
    valueType: 'date-picker',
    hideInForm: true
  }
]
</script>
