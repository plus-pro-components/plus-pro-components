<template>
  <el-card>
    <PlusForm
      v-model="state"
      :columns="columns"
      :rules="rules"
      @change="handleChange"
      @submit="handleSubmit"
      @submit-error="handleSubmitError"
      @reset="handleReset"
    />
  </el-card>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { PlusColumn, FieldValues } from 'plus-pro-components'

const state = ref<FieldValues>({
  status: '0',
  name: '',
  rate: 4,
  progress: 100,
  number: 100,
  switch: true,
  time: new Date().toString(),
  img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
})

const rules = {
  name: [
    {
      required: true,
      message: '请输入名称'
    }
  ],
  tag: [
    {
      required: true,
      message: '请输入标签'
    }
  ]
}

const columns: PlusColumn[] = [
  {
    label: '状态',
    width: 120,
    prop: 'status',
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
    formItemProps: async () => {
      return { labelWidth: '100px' }
    }
  },
  {
    label: '数量',
    prop: 'number',
    valueType: 'input-number',
    fieldProps: () => {
      return { precision: 2, step: 2 }
    },
    formItemProps: () => {
      return { labelWidth: '100px' }
    }
  },
  {
    label: '城市',
    prop: 'city',
    valueType: 'cascader',
    options: async () => {
      // 等待2s
      await new Promise(resolve => {
        setTimeout(() => {
          resolve('')
        }, 2000)
      })
      return [
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
      ]
    },
    formItemProps: async () => {
      return { labelWidth: '100px' }
    }
  },
  {
    label: '地区',
    prop: 'place',
    tooltip: '请精确到门牌号',
    fieldProps: async () => {
      // 等待2s
      await new Promise(resolve => {
        setTimeout(() => {
          resolve('')
        }, 2000)
      })
      return {
        placeholder: '请精确到门牌号'
      }
    },
    formItemProps: async () => {
      return { labelWidth: '100px' }
    }
  },
  {
    label: '要求',
    prop: 'demand',
    valueType: 'checkbox',
    formItemProps: () => {
      return new Promise(resolve => {
        resolve({ labelWidth: '100px' })
      })
    },
    options: () => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([
            {
              label: '四六级',
              value: '0'
            },
            {
              label: '计算机二级证书',
              value: '1'
            },
            {
              label: '普通话证书',
              value: '2'
            }
          ])
        }, 2000)
      })
    }
  },
  {
    label: '要求1',
    prop: 'demand1',
    valueType: 'checkbox',
    options: computed(() =>
      state.value.status === '0'
        ? [
            {
              label: '四六级',
              value: '0'
            },
            {
              label: '计算机二级证书',
              value: '1'
            },
            {
              label: '普通话证书',
              value: '2'
            }
          ]
        : [
            {
              label: '四六级',
              value: '0'
            }
          ]
    )
  },
  {
    label: '梦想',
    prop: 'gift',
    valueType: 'radio',
    options: new Promise(resolve => {
      setTimeout(() => {
        resolve([
          {
            label: '诗',
            value: '0'
          },
          {
            label: '远方',
            value: '1'
          },
          {
            label: '美食',
            value: '2'
          }
        ])
      }, 2000)
    })
  },
  {
    label: '到期时间',
    prop: 'endTime',
    valueType: 'date-picker',
    fieldProps: () => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            type: 'datetimerange',
            startPlaceholder: '请选择开始时间',
            endPlaceholder: '请选择结束时间'
          })
        }, 2000)
      })
    }
  },
  {
    label: '说明',
    prop: 'desc',
    valueType: 'textarea',
    fieldProps: new Promise(resolve => {
      setTimeout(() => {
        resolve({
          placeholder: '请输入详情',
          maxlength: 10,
          showWordLimit: true,
          autosize: { minRows: 2, maxRows: 4 }
        })
      }, 2000)
    })
  }
]

const handleChange = (values: FieldValues, prop: PlusColumn) => {
  console.log(values, prop, 'change')
}
const handleSubmit = (values: FieldValues) => {
  console.log(values, 'Submit')
}
const handleSubmitError = (err: any) => {
  console.log(err, 'err')
}
const handleReset = () => {
  console.log('handleReset')
}
</script>
