<template>
  <el-card>
    <PlusSearch
      v-model="state"
      :columns="columns"
      :has-unfold="false"
      :col-props="{
        xs: 24,
        sm: 12,
        md: 8,
        lg: 8,
        xl: 8
      }"
      label-width="120px"
      @change="handleChange"
      @search="handleSearch"
      @reset="handleRest"
    />
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { PlusColumn } from '@plus-pro-components/types'

const state = ref({
  status: '0',
  async: '0',
  promise: '0-0-0',
  time: new Date().toString()
})

const columns: PlusColumn[] = [
  {
    label: '函数状态',
    prop: 'status',
    valueType: 'select',
    options: () => [
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
    label: 'async函数状态',
    prop: 'async',
    valueType: 'select',
    options: async () => {
      // 等待2s
      await new Promise(resolve => {
        setTimeout(() => {
          resolve('')
        }, 2000)
      })

      return [
        {
          label: 'pending',
          value: '0'
        },
        {
          label: 'fulfilled',
          value: '1'
        },
        {
          label: 'rejected',
          value: '1'
        }
      ]
    }
  },
  {
    label: 'promise城市',
    prop: 'promise',
    valueType: 'cascader',
    options: () => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([
            {
              value: '0',
              label: '陕西',
              children: [
                {
                  value: '0-0',
                  label: '西安',
                  children: [
                    {
                      value: '0-0-0',
                      label: '新城区'
                    },
                    {
                      value: '0-0-1',
                      label: '高新区'
                    },
                    {
                      value: '0-0-2',
                      label: '灞桥区'
                    }
                  ]
                }
              ]
            },
            {
              value: '1',
              label: '山西',
              children: [
                {
                  value: '1-0',
                  label: '太原',
                  children: [
                    {
                      value: '1-0-0',
                      label: '小店区'
                    },
                    {
                      value: '1-0-1',
                      label: '古交市'
                    },
                    {
                      value: '1-0-2',
                      label: '万柏林区'
                    }
                  ]
                }
              ]
            }
          ])
        }, 2000)
      })
    }
  }
]

const handleChange = (values: any) => {
  console.log(values, 'change')
}
const handleSearch = (values: any) => {
  console.log(values, 'search')
}
const handleRest = () => {
  console.log('handleRest')
}
</script>
