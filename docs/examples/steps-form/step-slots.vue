<template>
  <PlusStepsForm v-model="active" direction="vertical" :space="120" :data="stepForm" @next="next">
    <template #step-1>
      <h3>自定义第一步内容</h3>
    </template>
  </PlusStepsForm>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const stepForm = ref([
  {
    title: '第一步',
    description: '这是第一步的描述内容'
  },
  {
    title: '第二步',
    description: '这是第二步的描述内容',
    form: {
      modelValue: {},
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
      ],
      rules: {
        tag: [
          {
            required: true,
            message: '请输入标签'
          }
        ],
        progress: [
          {
            required: true,
            message: '请输入执行进度'
          }
        ]
      }
    }
  },
  {
    title: '第三步',
    description: '这是第三步的描述内容',
    form: {
      modelValue: {},
      columns: [
        {
          label: '时间',
          prop: 'time',
          valueType: 'date-picker'
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
      ],
      rules: {
        time: [
          {
            required: true,
            trigger: 'change',
            message: '请选择时间'
          }
        ],
        demand: [
          {
            required: true,
            trigger: 'change',
            message: '请选择要求'
          }
        ]
      }
    }
  }
])
const active = ref(1)
const next = (actives: number, values: any) => {
  active.value = actives
  console.log(actives, values, stepForm.value)
}
</script>
