<template>
  <PlusDescriptions :column="3" :columns="columns" :data="dataList" border />
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { TableConfigRow } from '@plus-pro-components/components/table'
const TestServe = {
  getList: async () => {
    const data = [...new Array(2)].map((item, index) => {
      return {
        index,
        id: index,
        title: '序号' + (index + 1),
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
        time: new Date(),
        code: `
const getData = async params => {
  const data = await getData(params)
  return { list: data.data, ...data }
}`
      }
    })
    return {
      data
    }
  }
}

const columns: TableConfigRow[] = [
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
  {
    label: '代码块',
    width: 250,
    prop: 'code',
    valueType: 'code'
  },
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
    label: '时间',
    width: 190,
    prop: 'time',
    valueType: 'date'
  }
]
const dataList = ref<any>([])
const getList = async () => {
  try {
    const { data } = await TestServe.getList()
    dataList.value = data || []
  } catch (error) {}
}
getList()
</script>
