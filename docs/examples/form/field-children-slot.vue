<template>
  <el-card>
    <PlusForm
      v-model="state"
      label-width="180px"
      :columns="columns"
      @change="handleChange"
      @submit="handleSubmit"
      @submit-error="handleSubmitError"
      @reset="handleReset"
    />
  </el-card>
</template>

<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { ref, h } from 'vue'
import type { PlusColumn, FieldValues } from 'plus-pro-components'

const state = ref<FieldValues>({
  checkbox: ['0'],
  checkboxAll: ['0'],
  checkboxMixed: ['0'],
  radio: '0',
  radioAll: '0',
  radioMixed: '0',
  select: '0',
  selectAll: '0',
  selectMixed: '0',
  plusRadio: '0',
  plusRadioAll: '0',
  plusRadioMixed: '0'
})

const columns: PlusColumn[] = [
  {
    label: '单个自定义checkbox',
    prop: 'checkbox',
    valueType: 'checkbox',
    options: [
      {
        label: '四六级',
        value: '0',
        fieldSlot: ({ label }) => {
          return `单个自定义1-${label}`
        }
      },
      {
        label: '计算机二级证书',
        value: '1',
        fieldSlot: ({ label }) => {
          return h('div', { style: { color: 'var(--el-color-warning )' } }, `单个自定义1-${label}`)
        }
      },
      {
        label: '普通话证书',
        value: '2',
        fieldSlot: ({ label }) => {
          return h('div', { style: { color: 'var(--el-color-info)' } }, `单个自定义1-${label}`)
        }
      }
    ]
  },
  {
    label: '单个自定义radio',
    prop: 'radio',
    valueType: 'radio',
    options: [
      {
        label: '诗',
        value: '0',
        fieldSlot: ({ label }) => {
          return `单个自定义1-${label}`
        }
      },
      {
        label: '远方',
        value: '1',
        fieldSlot: ({ label }) => {
          return h('div', { style: { color: 'var(--el-color-warning )' } }, `单个自定义1-${label}`)
        }
      },
      {
        label: '美食',
        value: '2',
        fieldSlot: ({ label }) => {
          return h('div', { style: { color: 'var(--el-color-info)' } }, `单个自定义1-${label}`)
        }
      }
    ]
  },
  {
    label: '单个自定义select',
    prop: 'select',
    valueType: 'select',
    options: [
      {
        label: '未解决',
        value: '0',
        color: 'var(--el-color-warning )',
        fieldSlot: ({ label, color }) => {
          return h('div', { style: { color } }, `${label}`)
        }
      },
      {
        label: '已解决',
        value: '1',
        color: 'var(--el-color-success )',
        fieldSlot: ({ label, color }) => {
          return h('div', { style: { color } }, `${label}`)
        }
      },
      {
        label: '解决中',
        value: '2',
        color: 'var(--el-color-info )',
        fieldSlot: ({ label, color }) => {
          return h('div', { style: { color } }, `${label}`)
        }
      }
    ]
  },
  {
    label: '单个自定义plus-radio',
    prop: 'plusRadio',
    valueType: 'plus-radio',
    options: [
      {
        label: '诗',
        value: '0',
        fieldSlot: ({ label }) => {
          return `单个自定义1-${label}`
        }
      },
      {
        label: '远方',
        value: '1',
        fieldSlot: ({ label }) => {
          return h('div', { style: { color: 'var(--el-color-warning )' } }, `单个自定义1-${label}`)
        }
      },
      {
        label: '美食',
        value: '2',
        fieldSlot: ({ label }) => {
          return h('div', { style: { color: 'var(--el-color-info)' } }, `单个自定义1-${label}`)
        }
      }
    ]
  },
  {
    label: '整体自定义checkbox',
    prop: 'checkboxAll',
    valueType: 'checkbox',
    fieldChildrenSlot: ({ label }) => {
      return h('div', { style: { color: 'var(--el-color-success)' } }, `整体自定义-${label}`)
    },
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
    label: '整体自定义radio',
    prop: 'radioAll',
    valueType: 'radio',
    fieldChildrenSlot: ({ label }) => {
      return h('div', { style: { color: 'var(--el-color-success)' } }, `整体自定义-${label}`)
    },
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
    label: '整体自定义select',
    prop: 'selectAll',
    valueType: 'select',
    fieldChildrenSlot: ({ label }) => {
      return h('div', { style: { color: 'var(--el-color-warning)' } }, `整体自定义-${label}`)
    },
    options: [
      {
        label: '未解决',
        value: '0',
        color: 'var(--el-color-warning )'
      },
      {
        label: '已解决',
        value: '1',
        color: 'var(--el-color-success )'
      },
      {
        label: '解决中',
        value: '2',
        color: 'var(--el-color-info )'
      }
    ]
  },
  {
    label: '整体自定义plus-radio',
    prop: 'plusRadioAll',
    valueType: 'plus-radio',
    fieldChildrenSlot: ({ label }) => {
      return h('div', { style: { color: 'var(--el-color-success)' } }, `整体自定义-${label}`)
    },
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
    label: '混合checkbox',
    prop: 'checkboxMixed',
    valueType: 'checkbox',
    // 整体自定义优先级低于单个自定义
    fieldChildrenSlot: ({ label }) => {
      return h('div', { style: { color: 'var(--el-color-success)' } }, `整体自定义-${label}`)
    },
    options: [
      {
        label: '四六级',
        value: '0',
        // 单个自定义优先级高于 整体自定义
        fieldSlot: ({ label }) => {
          return `单个自定义-${label}`
        }
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
    label: '混合自定义radio',
    prop: 'radioMixed',
    valueType: 'radio',
    // 整体自定义优先级低于单个自定义
    fieldChildrenSlot: ({ label }) => {
      return h('div', { style: { color: 'var(--el-color-success)' } }, `整体自定义-${label}`)
    },
    options: [
      {
        label: '诗',
        value: '0',
        // 单个自定义优先级高于 整体自定义
        fieldSlot: ({ label }) => {
          return `单个自定义-${label}`
        }
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
    label: '混合自定义select',
    prop: 'selectMixed',
    valueType: 'select',
    fieldChildrenSlot: ({ label }) => {
      return h('div', { style: { color: 'var(--el-color-success)' } }, `${label}`)
    },
    options: [
      {
        label: '未解决',
        value: '0',
        color: 'var(--el-color-warning )',
        fieldSlot: ({ label, color }) => {
          return h('div', { style: { color } }, `${label}`)
        }
      },
      {
        label: '已解决',
        value: '1',
        color: 'var(--el-color-success )'
      },
      {
        label: '解决中',
        value: '2',
        color: 'var(--el-color-info )'
      }
    ]
  },
  {
    label: '混合自定义plus-radio',
    prop: 'plusRadioMixed',
    valueType: 'plus-radio',
    // 整体自定义优先级低于单个自定义
    fieldChildrenSlot: ({ label }) => {
      return h('div', { style: { color: 'var(--el-color-success)' } }, `整体自定义-${label}`)
    },
    options: [
      {
        label: '诗',
        value: '0',
        // 单个自定义优先级高于 整体自定义
        fieldSlot: ({ label }) => {
          return `单个自定义-${label}`
        }
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
