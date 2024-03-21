<template>
  <el-card>
    <PlusTable :table-data="tableData" :columns="columns" />
  </el-card>
</template>

<script lang="ts" setup>
import { h } from 'vue'
import { ElEmpty, ElIcon } from 'element-plus'
import { useTable } from 'plus-pro-components'
import type { PlusColumn } from 'plus-pro-components'
import { Link } from '@element-plus/icons-vue'

interface TableRow {
  id: number
  img: string
  link: string
  progress: number
}

const TestServe = {
  getList: async () => {
    const data = Array.from({ length: 3 }).map((item, index) => {
      return {
        id: index,
        img:
          index === 0
            ? 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            : '',
        link: String(index % 3),
        progress: (index + 1) * 30
      }
    })
    return {
      data: data as TableRow[]
    }
  }
}

const { tableData } = useTable<TableRow[]>()

const columns: PlusColumn[] = [
  {
    label: '图片',
    prop: 'img',
    valueType: 'img',
    fieldProps: {
      style: {
        width: '100%'
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

const getList = async () => {
  try {
    const { data } = await TestServe.getList()
    tableData.value = data
  } catch (error) {}
}
getList()
</script>
