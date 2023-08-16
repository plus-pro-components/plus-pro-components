<template>
  <PlusStepsForm v-model="active" :data="stepForm" @next="next">
    <template #title="{ title }">{{ title }}</template>
    <template #description="{ description }">{{ description }}</template>
  </PlusStepsForm>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const stepForm = ref([
  {
    title: '第一步',
    description: '这是第一步的描述内容',
    form: {
      modelValue: {},
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
      ],
      rules: {
        name: [
          {
            required: true,
            message: '请输入名称'
          }
        ]
      }
    }
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
