<template>
  <div>
    <PlusPage
      :columns="tableConfig"
      :request="getList"
      :before-search-submit="handleBeforeSearch"
    />
  </div>
</template>

<script lang="ts" setup>
import type { PlusColumn, PageInfo } from 'plus-pro-components'
import { cloneDeep } from 'lodash-es'

const getList = async (
  query: PageInfo & {
    status?: string
    name?: string
  }
) => {
  const { page = 1, pageSize = 20, status, name } = query || {}
  const total = 3
  const List = Array.from({ length: total }).map((item, index) => {
    return {
      id: index,
      name: index === 0 ? 'name'.repeat(3) : index + 'name',
      status: String(index % 3),
      tag: index === 1 ? 'success' : index === 2 ? 'warning' : index === 3 ? 'info' : 'danger',
      progress: 10,
      rate: index > 3 ? 2 : 3.5,
      switch: index % 2 === 0 ? true : false,
      img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      time: new Date(),
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

// 搜索之前函数
const handleBeforeSearch = (values: any) => {
  const params = cloneDeep(values)
  Reflect.set(params, 'name1', Reflect.get(values, 'name'))
  Reflect.deleteProperty(params, 'name')

  // 返回新的参数
  return params
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
    hideInForm: true,
    minWidth: '180px'
  }
]
</script>
