<template>
  <div>
    <PlusTable
      ref="plusTable"
      row-key="id"
      size="small"
      :loading-status="loadingStatus"
      :config="tableConfig"
      :table-data="tableData"
      :is-show-number="true"
      :is-show-drag-sort="true"
      table-title="表格"
      :pagination="{ show: true, total, modelValue: pageInfo }"
      :action-bar="{
        show: true,
        buttonsName,
        buttonType: 'link',
        buttonCount: 3,
        optionColumnWidth: 300
      }"
      @subPaginationChange="handlePaginationChange"
      @subClickButton="subClickButton"
      @subSortEnd="subSortEnd"
    >
      <template #button>
        <el-button plain size="small">查看日志</el-button>
        <el-button plain size="small">导出数据</el-button>
        <el-button type="primary" size="small">创建应用</el-button>
      </template>
    </PlusTable>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useTable } from '@plus-pro-components/hooks'
import type {
  TableConfigRow,
  PlusTableInstance,
  ButtonsCallBackParams
} from '@plus-pro-components/components/table'

defineOptions({
  name: 'PlusTableTest'
})

const TestServe = {
  getList: async () => {
    const data = [...new Array(10)].map((item, index) => {
      return {
        index,
        id: index,
        name: index === 0 ? 'name'.repeat(20) : index + 'name',
        status:
          index === 0 ? 'processing' : index === 1 ? 'error' : index === 2 ? 'open' : 'closed',
        tag: index === 1 ? 'success' : index === 2 ? 'warning' : index === 3 ? 'info' : 'danger',
        progress:
          index === 0
            ? { progress: 30, status: 'exception' }
            : index === 1
            ? { progress: 60, status: 'warning' }
            : index > 3
            ? {
                progress: 100,
                status: 'success'
              }
            : { progress: 50 },
        rate: index > 3 ? 2 : 3.5,
        switch: index > 3 ? true : false,
        indexColStyle:
          index < 3
            ? {
                backgroundColor: '#314659'
              }
            : {
                backgroundColor: '#979797'
              },
        img: {
          img: '1',
          url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          name: '1'
        },
        time: new Date(),
        srcList: [
          {
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            name: '1'
          }
        ]
        //         code: `
        // const getData = async params => {
        //   const data = await getData(params)
        //   return { list: data.data, ...data }
        // }`
      }
    })
    return {
      data,
      total: data.length
    }
  }
}

const plusTable = ref<PlusTableInstance>()

const { tableData, pageInfo, total, buttonsName, loadingStatus } = useTable()

buttonsName.value = {
  normal: [
    {
      // 查看
      text: '查看',
      type: 'primary'
    },
    {
      // 修改
      text: '修改',
      type: 'success'
    },
    {
      // 删除
      text: '删除',
      type: 'danger'
    },
    {
      text: '复制',
      type: 'primary'
    }
  ]
}

const tableConfig: TableConfigRow[] = [
  {
    label: '名称',
    width: 120,
    prop: 'name',
    valueType: 'copy'
  },
  {
    label: '状态',
    width: 120,
    prop: 'status',
    valueType: 'status',
    valueEnum: {
      open: {
        text: '未解决',
        color: '#666'
      },
      closed: {
        text: '已解决',
        color: 'green'
      },
      processing: {
        text: '解决中',
        color: 'blue'
      },
      error: {
        text: '失败',
        color: 'red'
      }
    }
  },
  {
    label: '标签',
    width: 120,
    prop: 'tag',
    valueType: 'tag',
    valueEnum: {
      primary: {
        text: 'primarys',
        color: 'primary'
      },
      success: {
        text: 'successs',
        color: 'success'
      },
      danger: {
        text: 'dangers',
        color: 'danger'
      },
      info: {
        text: 'infos',
        color: 'info'
      },
      warning: {
        text: 'warnings',
        color: 'warning'
      }
    }
  },
  {
    label: '执行进度',
    width: 200,
    prop: 'progress',
    valueType: 'progress'
  },
  // {
  //   label: '代码块',
  //   width: 250,
  //   prop: 'code',
  //   valueType: 'code'
  // },
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
    valueType: 'switch',
    elSwitchOnColor: '#13ce66',
    elSwitchOffColor: '#ff4949'
  },
  {
    label: '图片',
    prop: 'img',
    width: 100,
    valueType: 'img'
  },
  {
    label: '时间',
    width: 190,
    prop: 'time',
    valueType: 'date'
  }
]

const formatTableItem = (item: any) => {
  return {
    ...item,
    buttonKey: 'normal'
  }
}

const getList = async () => {
  try {
    loadingStatus.value = true

    const { data, total: dataTotal } = await TestServe.getList()
    const items = data.map(item => formatTableItem(item))
    tableData.value = items || []
    total.value = dataTotal
  } catch (error) {}
  loadingStatus.value = false
}
getList()

const handlePaginationChange = (_pageInfo: PageInfo): void => {
  pageInfo.value = _pageInfo
  getList()
}
const subClickButton = (data: ButtonsCallBackParams) => {
  console.log(data.buttonRow.text)
}
const subSortEnd = (newIndex: number, oldIndex: number) => {
  const currRow = tableData.value.splice(oldIndex, 1)[0]
  tableData.value.splice(newIndex, 0, currRow)
  console.log(newIndex, oldIndex, tableData.value)
}
</script>
