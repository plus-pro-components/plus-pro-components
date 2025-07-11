<template>
  <div>
    <el-row style="margin-bottom: 20px">
      <el-text style="margin-right: 10px">表单插槽作用于 </el-text>

      <el-radio-group v-model="searchSlot">
        <el-radio value="search">search 搜索 </el-radio>
        <el-radio value="table">table 表格</el-radio>
      </el-radio-group>
    </el-row>

    <PlusPage
      :columns="tableConfig"
      :request="getList"
      :is-card="false"
      :search-slot="searchSlot === 'search'"
      :table="{ editable: true }"
      :search="{ hasUnfold: false, labelWidth: 'auto' }"
      :divider-prop="{ isShow: true, style: { margin: '10px 0' } }"
    >
      <template #plus-previous-name>上一行 </template>
      <template #plus-field-name>
        <el-input v-model="state" placeholder="自定义搜索内容" />
      </template>
      <template #plus-label-name="scoped"> 自定义搜索 {{ scoped.label }} </template>
      <template #plus-extra-name>下一行 </template>

      <!-- table 的插槽 依然作用于 PlusTable -->
      <template #table-append> <div style="text-align: center">末尾的</div> </template>
    </PlusPage>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { PlusColumn, PageInfo } from 'plus-pro-components'

const state = ref('')
const searchSlot = ref('search')
const getList = async (
  query: PageInfo & {
    status?: string
    name?: string
  }
) => {
  const { page = 1, pageSize = 20, status, name } = query || {}
  const total = 5
  const List = Array.from({ length: total }).map((item, index) => {
    return {
      id: index,
      name: index + 'name',
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
    width: 160,
    prop: 'name'
  },
  {
    label: '状态',
    width: 120,
    prop: 'status',
    valueType: 'select',
    hideInSearch: true,
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
    hideInSearch: true,
    valueType: 'tag',
    fieldProps: (value: string) => {
      return { type: value }
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
    hideInSearch: true
  }
]
</script>
