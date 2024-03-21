<template>
  <div>
    <PlusPage :columns="tableConfig" :request="getList">
      <template #search-footer="{ handleReset, handleSearch, handleUnfold, isShowUnfold }">
        <div style="display: flex">
          <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
          <el-button :icon="Refresh" @click="handleReset">重置</el-button>
          <el-button :icon="isShowUnfold ? ArrowUp : ArrowDown" @click="handleUnfold">
            {{ isShowUnfold ? '收起' : '展开' }}
          </el-button>
        </div>
      </template>
    </PlusPage>
  </div>
</template>

<script lang="ts" setup>
import type { PlusColumn, PageInfo } from 'plus-pro-components'
import { ElButton } from 'element-plus'
import { Search, Refresh, ArrowDown, ArrowUp } from '@element-plus/icons-vue'

const getList = async (
  query: PageInfo & {
    status?: string
    name?: string
  }
) => {
  const { page = 1, pageSize = 5 } = query || {}
  const total = 30
  const List = Array.from({ length: total }).map((item, index) => {
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

  const pageList = List.filter(
    (item, index) => index < pageSize * page && index >= pageSize * (page - 1)
  )

  // 等待2s
  await new Promise(resolve => {
    setTimeout(() => {
      resolve('')
    }, 2000)
  })

  return { data: pageList, success: true, total: List.length }
}

const tableConfig: PlusColumn[] = [
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
    label: '时间',
    prop: 'time',
    valueType: 'date-picker',
    hideInForm: true
  }
]
</script>
