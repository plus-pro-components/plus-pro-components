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
import type { DefineComponent } from 'vue'
import { h, Fragment } from 'vue'
import { useTable } from '@plus-pro-components/hooks'
import type { PageInfo, PlusColumn } from '@plus-pro-components/types'
import { ElAlert, ElButton, ElMessage, ElUpload, ElResult } from 'element-plus'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CustomPageHeader from './components/page-header.vue'

defineOptions({
  name: 'CustomCell'
})

const TestServe = {
  getList: async () => {
    const data = [...new Array(10)].map((item, index) => {
      return {
        index,
        id: index,
        name: index + 'name',
        status: String(index % 3),
        custom: 'custom' + index
      }
    })
    return {
      data,
      total: data.length
    }
  }
}

const { tableData, pageInfo, total, loadingStatus } = useTable()

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

const tableConfig: PlusColumn[] = [
  {
    label: '名称',
    tooltip: '名称最多显示6个字符',
    width: 80,
    prop: 'name',
    valueType: 'text',
    tableColumnProps: {
      'show-overflow-tooltip': true
    }
  },
  {
    label: '自定义组件ElAlert',
    width: 150,
    prop: 'status',
    render: value => {
      const item = statusOptions.find(item => item.value === value)
      return h(ElAlert as unknown as DefineComponent, { type: item?.type }, () => item?.label)
    }
  },
  {
    label: '自定义组件ElResult',
    width: 150,
    prop: 'status',
    render: (value, { index }) => {
      const iconList = ['success', 'warning', 'info', 'error']
      return h(ElResult, { icon: iconList[index % 4] as any, title: `Tip${value}` })
    }
  },
  {
    label: '自定义组件',
    width: 100,
    prop: 'status',
    render: value => {
      return h(CustomPageHeader, {
        content: value
      })
    }
  },
  {
    label: '自定义html',
    width: 100,
    prop: 'custom',
    renderHTML: (value: any) => {
      return `<div style='color:red;'>${value}</div>`
    }
  },
  {
    label: '自定义html',
    width: 120,
    prop: 'custom',
    renderHTML: (value: any) => {
      return `<input  style="border:1px solid #ccc;width:90px;padding:0 10px;" value=${value} />`
    }
  },
  {
    label: '自定义表单ElUpload',
    width: 160,
    prop: 'custom',
    editable: true,
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
    prop: 'status',
    render: (value, { index, row }) => {
      const buttons = index > 3 ? ['编辑', '删除'] : ['保存', '删除']
      const CustomButton = buttons.map(item =>
        h(
          ElButton,
          {
            type: index > 3 ? 'primary' : 'warning',
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
