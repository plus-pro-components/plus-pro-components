<template>
  <div style="width: 600px">
    <PlusForm
      v-model="state"
      :group="group"
      :rules="rules"
      @change="handleChange"
      @submit="handleSubmit"
      @submit-error="handleSubmitError"
      @reset="handleReset"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { FieldValues, PlusColumn, PlusFormGroupRow } from 'plus-pro-components'
import { CreditCard, Calendar, Soccer } from '@element-plus/icons-vue'

const state = ref({
  status: '0',
  name: '',
  rate: 4,
  progress: 100,
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

const group: PlusFormGroupRow[] = [
  {
    title: '第一分组',
    icon: CreditCard,
    columns: [
      {
        label: '名称',
        width: 120,
        prop: 'name',
        valueType: 'copy',
        tooltip: '名称最多显示6个字符'
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
      }
    ]
  },
  {
    title: '第二分组',
    icon: Calendar,
    columns: [
      {
        label: '标签',
        width: 120,
        prop: 'tag'
      },
      {
        label: '执行进度',
        width: 200,
        prop: 'progress'
      },
      {
        label: '评分',
        width: 200,
        prop: 'rate',
        valueType: 'rate'
      },
      {
        label: '是否显示',
        width: 100,
        prop: 'switch',
        valueType: 'switch'
      }
    ]
  },
  {
    title: '第三分组',
    icon: Soccer,
    columns: [
      {
        label: '时间',
        prop: 'time',
        valueType: 'date-picker'
      },
      {
        label: '数量',
        prop: 'number',
        valueType: 'input-number',
        fieldProps: { precision: 2, step: 2 }
      },
      {
        label: '城市',
        prop: 'city',
        valueType: 'cascader',
        options: [
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
      {
        label: '地区',
        prop: 'place',
        tooltip: '请精确到门牌号',
        fieldProps: {
          placeholder: '请精确到门牌号'
        }
      },
      {
        label: '经度',
        prop: 'lng',
        tooltip: '请保留两位小数'
      },
      {
        label: '纬度',
        prop: 'lat',
        tooltip: '请保留两位小数'
      },
      {
        label: '要求',
        prop: 'demand',
        valueType: 'checkbox',
        options: [
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
      },
      {
        label: '梦想',
        prop: 'gift',
        valueType: 'radio',
        options: [
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
        ]
      },
      {
        label: '到期时间',
        prop: 'endTime',
        valueType: 'date-picker',
        fieldProps: {
          type: 'datetimerange',
          startPlaceholder: '请选择开始时间',
          endPlaceholder: '请选择结束时间'
        }
      },
      {
        label: '奖励',
        prop: 'price'
      },
      {
        label: '提成',
        prop: 'percentage'
      },
      {
        label: '说明',
        prop: 'desc',
        valueType: 'textarea',
        fieldProps: {
          maxlength: 10,
          showWordLimit: true,
          autosize: { minRows: 2, maxRows: 4 }
        }
      }
    ]
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
