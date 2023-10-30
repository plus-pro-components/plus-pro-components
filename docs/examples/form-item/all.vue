<template>
  <PlusFormItem
    v-for="item in columns"
    :key="item.label"
    v-model="values[item.prop]"
    v-bind="item"
    @change="(val:any) =>handleChange(val, item.prop)"
  />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import type { PlusColumn, FieldValues } from 'plus-pro-components'

interface RestaurantItem {
  value: string
  link: string
}

const restaurants = ref<RestaurantItem[]>([])

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

onMounted(() => {
  restaurants.value = loadAll()
})

const columns: PlusColumn[] = [
  {
    label: 'autocomplete',
    width: 120,
    prop: 'autocomplete',
    valueType: 'autocomplete',
    tooltip: '自动补全输入框',
    fieldProps: {
      fetchSuggestions: (queryString: string, cb: any) => {
        const results = queryString
          ? restaurants.value.filter(createFilter(queryString))
          : restaurants.value
        // call callback function to return suggestions
        cb(results)
      }
    }
  },
  {
    label: 'cascader',
    prop: 'cascader',
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
    label: 'checkbox',
    prop: 'checkbox',
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
    label: 'color-picker',
    prop: 'color-picker',
    valueType: 'color-picker'
  },
  {
    label: 'time',
    prop: 'time',
    valueType: 'date-picker'
  },
  {
    label: 'select',
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
  },
  {
    label: 'input',
    width: 120,
    prop: 'input'
  },
  {
    label: 'input-number',
    prop: 'number',
    valueType: 'input-number',
    fieldProps: { precision: 2, step: 2 }
  },
  {
    label: 'textarea',
    prop: 'textarea',
    valueType: 'textarea',
    fieldProps: {
      maxlength: 10,
      showWordLimit: true,
      autosize: { minRows: 2, maxRows: 4 }
    }
  },

  {
    label: 'rate',
    width: 200,
    prop: 'rate',
    valueType: 'rate'
  },
  {
    label: 'switch',
    width: 100,
    prop: 'switch',
    valueType: 'switch'
  },
  {
    label: 'radio',
    prop: 'radio',
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
    label: 'slider',
    prop: 'slider',
    valueType: 'slider'
  },
  {
    label: 'time-picker',
    prop: 'time-picker',
    valueType: 'time-picker'
  },
  {
    label: 'time-select',
    prop: 'time-select',
    valueType: 'time-select'
  },
  {
    label: 'text',
    prop: 'text',
    valueType: 'text'
  },
  {
    label: 'plus-radio',
    prop: 'plus-radio',
    valueType: 'plus-radio',
    options: [
      { label: '选项一', value: 1 },
      { label: '选项二', value: 2 }
    ]
  },
  {
    label: 'plus-date-picker',
    prop: 'plus-date-picker',
    valueType: 'plus-date-picker'
  },
  {
    label: 'plus-input-tag',
    prop: 'plus-input-tag',
    valueType: 'plus-input-tag'
  }
]

const row = {
  name: 'name',
  status: '1',
  tag: 'success',
  money: '100',
  text: '文本',
  progress: 30,
  rate: 4,
  switch: true,
  number: 30,
  time: new Date(),
  slider: 10,
  code: `const data = 100`,
  copy: 'copy',
  img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
}
const values = ref<FieldValues>({ ...row })

const handleChange = (values: FieldValues, prop: string) => {
  console.log(values, prop)
}
</script>
