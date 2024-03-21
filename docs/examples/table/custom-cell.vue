<template>
  <div>
    <PlusTable
      :columns="tableConfig"
      :table-data="tableData"
      table-title="表格"
      :pagination="{ total, modelValue: pageInfo }"
      @paginationChange="handlePaginationChange"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Component } from 'vue'
import { h, Fragment } from 'vue'
import { useTable } from 'plus-pro-components'
import type { PageInfo, PlusColumn } from 'plus-pro-components'
import { ElAlert, ElButton, ElMessage, ElUpload, ElResult } from 'element-plus'
import CustomPageHeader from './components/page-header.vue'

defineOptions({
  name: 'CustomCell'
})

interface TableRow {
  index: number
  id: number
  name: string
  status: string
  custom: string
}

const TestServe = {
  getList: async () => {
    const data = Array.from({ length: 3 }).map((item, index) => {
      return {
        index,
        id: index,
        name: index + 'name',
        status: String(index % 3),
        status0: String(index % 3),
        status1: String(index % 3),
        status2: String(index % 3),
        custom: 'custom' + index,
        custom0: 'custom' + index,
        custom1: 'custom' + index
      }
    })
    return {
      data: data as TableRow[],
      total: data.length
    }
  }
}

const { tableData, pageInfo, total, loadingStatus } = useTable<TableRow[]>()
const statusOptions = [
  {
    label: '待审核',
    value: '0',
    type: 'info'
  },
  {
    label: '进行中',
    value: '1',
    type: 'success'
  },
  {
    label: '已结束',
    value: '2',
    type: 'warning'
  }
]
const typeList = ['success', 'warning', 'info']
const tableConfig: PlusColumn[] = [
  {
    label: '自定义组件div',
    tooltip: '名称最多显示6个字符',
    width: 140,
    prop: 'name',
    // 返回一个标签字符串
    render: value => h('div', null, `${value}`),
    // 传递给  'div' props
    fieldProps: value => {
      return { value: value }
    }
  },
  {
    label: '自定义组件ElResult',
    width: 150,
    prop: 'status',
    // 返回一个组件
    render: (value, { index }) =>
      h(
        ElResult,
        {},
        // 插槽
        {
          extra: () => {
            return h(ElButton, { type: typeList[index % 4] as any }, () => `按钮${value}`)
          }
        }
      ),
    // 传递给 ElResult 组件的props
    fieldProps: (value, { index }) => {
      return { icon: typeList[index % 4] as any, title: `Tip${value}` }
    }
  },
  {
    label: '自定义组件ElAlert',
    width: 150,
    prop: 'status0',
    // 返回一个VNode
    render: value => {
      const item = statusOptions.find(item => item.value === value)
      return h(ElAlert as unknown as Component, { type: item?.type }, () => item?.label)
    }
  },
  {
    label: '自定义组件',
    width: 100,
    prop: 'status1',
    // 返回一个组件
    render: () => {
      return h(CustomPageHeader)
    },
    // 传递给CustomPageHeader 组件的props
    fieldProps: (value, { index }) => ({
      content: index
    })
  },
  // renderHTML 返回一个 HTML 字符串
  {
    label: '自定义html',
    width: 100,
    prop: 'custom',
    renderHTML: (value: any) => {
      return `<div style='color:red;'>${value}</div>`
    }
  },
  // renderHTML 返回一个 HTML 字符串
  {
    label: '自定义html',
    width: 110,
    prop: 'custom0',
    renderHTML: (value: any) => {
      return `<input  style="border:1px solid #ccc;width:80px;padding:0 10px;" value=${value} />`
    }
  },
  {
    label: '自定义表单ElUpload',
    width: 160,
    prop: 'custom1',
    // editable 为true  renderField才生效
    editable: true,
    // 返回一个VNode
    renderField(_, onChange) {
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
          drag: true,
          httpRequest: handleHttpRequest,
          onChange: (file: any) => {
            onChange(file.raw.name)
          }
        },
        () => '你可以将文件拖拽到特定区域以进行上传。'
      )
    }
  },

  {
    label: '自定义操作栏',
    width: 200,
    prop: 'status2',
    render: (value, { index, row }) => {
      const buttons = index > 1 ? ['编辑', '删除'] : ['保存', '删除']
      const CustomButton = buttons.map(item =>
        h(
          ElButton,
          {
            type: index > 1 ? 'warning' : 'primary',
            onClick: e => handleClickButton(e, value, index, row, item)
          },
          () => item
        )
      )
      return h(Fragment, CustomButton)
    }
  }
]

const handleClickButton = (
  e: MouseEvent,
  value: any,
  index: number,
  row: any,
  buttonText: string
) => {
  console.log(e, value, index, row)
  ElMessage.success(buttonText)
}

const getList = async () => {
  try {
    loadingStatus.value = true
    const { data, total: dataTotal } = await TestServe.getList()
    tableData.value = data || []
    total.value = dataTotal
  } catch (error) {}
  loadingStatus.value = false
}
getList()

const handlePaginationChange = (_pageInfo: PageInfo): void => {
  pageInfo.value = _pageInfo
  getList()
}
</script>
