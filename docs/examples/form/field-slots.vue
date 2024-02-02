<template>
  <el-card>
    <PlusForm v-model="state" :columns="columns" />
  </el-card>
</template>

<script lang="ts" setup>
import { ref, h } from 'vue'
import type { PlusColumn, FieldValues } from 'plus-pro-components'
import { Search } from '@element-plus/icons-vue'
import { ElButton, ElIcon, ElSelect, ElOption } from 'element-plus'

interface RestaurantItem {
  value: string
  link: string
}

const restaurants = ref<RestaurantItem[]>([])
const querySearch = (queryString: string, cb: any) => {
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value
  // call callback function to return suggestions
  cb(results)
}
const createFilter = (queryString: string) => {
  return (restaurant: RestaurantItem) => {
    return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
  }
}
const loadAll = () => {
  return [
    { value: 'vue', link: 'https://github.com/vuejs/vue' },
    { value: 'element', link: 'https://github.com/ElemeFE/element' },
    { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
    { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
    { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
    { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
    { value: 'babel', link: 'https://github.com/babel/babel' }
  ]
}
restaurants.value = loadAll()

const options = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency'
          },
          {
            value: 'feedback',
            label: 'Feedback'
          },
          {
            value: 'efficiency',
            label: 'Efficiency'
          },
          {
            value: 'controllability',
            label: 'Controllability'
          }
        ]
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation'
          },
          {
            value: 'top nav',
            label: 'Top Navigation'
          }
        ]
      }
    ]
  },
  {
    value: 'component',
    label: 'Component',
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          {
            value: 'layout',
            label: 'Layout'
          },
          {
            value: 'color',
            label: 'Color'
          },
          {
            value: 'typography',
            label: 'Typography'
          },
          {
            value: 'icon',
            label: 'Icon'
          },
          {
            value: 'button',
            label: 'Button'
          }
        ]
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          {
            value: 'radio',
            label: 'Radio'
          },
          {
            value: 'checkbox',
            label: 'Checkbox'
          },
          {
            value: 'input',
            label: 'Input'
          },
          {
            value: 'input-number',
            label: 'InputNumber'
          },
          {
            value: 'select',
            label: 'Select'
          },
          {
            value: 'cascader',
            label: 'Cascader'
          },
          {
            value: 'switch',
            label: 'Switch'
          },
          {
            value: 'slider',
            label: 'Slider'
          },
          {
            value: 'time-picker',
            label: 'TimePicker'
          },
          {
            value: 'date-picker',
            label: 'DatePicker'
          },
          {
            value: 'datetime-picker',
            label: 'DateTimePicker'
          },
          {
            value: 'upload',
            label: 'Upload'
          },
          {
            value: 'rate',
            label: 'Rate'
          },
          {
            value: 'form',
            label: 'Form'
          }
        ]
      },
      {
        value: 'data',
        label: 'Data',
        children: [
          {
            value: 'table',
            label: 'Table'
          },
          {
            value: 'tag',
            label: 'Tag'
          },
          {
            value: 'progress',
            label: 'Progress'
          },
          {
            value: 'tree',
            label: 'Tree'
          },
          {
            value: 'pagination',
            label: 'Pagination'
          },
          {
            value: 'badge',
            label: 'Badge'
          }
        ]
      },
      {
        value: 'notice',
        label: 'Notice',
        children: [
          {
            value: 'alert',
            label: 'Alert'
          },
          {
            value: 'loading',
            label: 'Loading'
          },
          {
            value: 'message',
            label: 'Message'
          },
          {
            value: 'message-box',
            label: 'MessageBox'
          },
          {
            value: 'notification',
            label: 'Notification'
          }
        ]
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'menu',
            label: 'Menu'
          },
          {
            value: 'tabs',
            label: 'Tabs'
          },
          {
            value: 'breadcrumb',
            label: 'Breadcrumb'
          },
          {
            value: 'dropdown',
            label: 'Dropdown'
          },
          {
            value: 'steps',
            label: 'Steps'
          }
        ]
      },
      {
        value: 'others',
        label: 'Others',
        children: [
          {
            value: 'dialog',
            label: 'Dialog'
          },
          {
            value: 'tooltip',
            label: 'Tooltip'
          },
          {
            value: 'popover',
            label: 'Popover'
          },
          {
            value: 'card',
            label: 'Card'
          },
          {
            value: 'carousel',
            label: 'Carousel'
          },
          {
            value: 'collapse',
            label: 'Collapse'
          }
        ]
      }
    ]
  }
]

const state = ref<FieldValues>({
  it: '',
  domain: '',
  inputSelect: '',
  cas: '',
  switch: true
})

const columns: PlusColumn[] = [
  {
    label: '域名',
    prop: 'domain',
    fieldProps: { clearable: false },
    fieldSlots: {
      suffix: () => h(ElIcon, null, () => h(Search)),
      prefix: () => '提示： ',
      prepend: () => 'http://',
      append: () => '.com'
    }
  },
  {
    label: '技术栈',
    prop: 'it',
    valueType: 'autocomplete',
    fieldProps: { clearable: false, fetchSuggestions: querySearch },
    fieldSlots: {
      suffix: () => h(ElIcon, null, () => h(Search)),
      prefix: () => 'vue 生态：',
      prepend: () => '我喜欢用',
      append: () =>
        h(
          ElButton,
          {
            icon: Search
          },
          () => '搜索'
        )
    }
  },
  {
    label: 'input选择',
    prop: 'inputSelect',
    fieldProps: { clearable: false, placeholder: '请选择' },
    fieldSlots: {
      prepend: () => h(ElIcon, null, () => h(Search)),
      append: () =>
        h(
          ElSelect,
          {
            style: { minWidth: '100px' }
          },
          () => [
            h(ElOption, {
              label: 'Restaurant',
              value: '1'
            }),
            h(ElOption, {
              label: 'Order',
              value: '2'
            }),
            h(ElOption, {
              label: 'Tel',
              value: '3'
            })
          ]
        )
    }
  },
  {
    label: '级联',
    prop: 'cas',
    valueType: 'cascader',
    options: options,
    fieldProps: { clearable: false, placeholder: '请选择' },
    fieldSlots: {
      default: ({ node, data }) => {
        return h(
          'div',
          null,
          `${data.label}${!node.isLeaf ? '（' + data.children.length + '）' : ''}`
        )
      }
    }
  },
  {
    label: '开关',
    prop: 'switch',
    valueType: 'switch',
    tooltip: 'element-plus@2.4.4 版本开始支持',
    fieldSlots: {
      // element-plus@2.4.4 版本开始支持
      'active-action': () => {
        return h('span', 'T')
      },
      // element-plus@2.4.4 版本开始支持
      'inactive-action': () => {
        return h('span', 'F')
      }
    }
  }
]
</script>
