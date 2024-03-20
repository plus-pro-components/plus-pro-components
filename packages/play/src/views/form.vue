<template>
  <el-card>
    <PlusForm
      v-model="state"
      label-width="140px"
      :columns="columns"
      @change="handleChange"
      @submit="handleSubmit"
      @submit-error="handleSubmitError"
      @reset="handleReset"
    />
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { PlusColumn, FieldValues } from '@plus-pro-components/types'

const state = ref<FieldValues>({
  autocomplete: 'vue',
  cascader: ['0', '0-0', '0-0-0'],
  'cascader-multiple': [
    ['0', '0-0', '0-0-0'],
    ['0', '0-0', '0-0-1'],
    ['0', '0-0', '0-0-2']
  ],
  checkbox: ['0'],
  'color-picker': 'rgba(255, 69, 0, 0.68)',
  year: '2024',
  years: ['2024', '2005'],
  month: '2024-02',
  date: '2024-03-05',
  dates: ['2024-03-05', '2024-03-06'],
  datetime: '2024-03-19 00:00:00',
  week: '2024-03-19',
  datetimerange: ['2024-03-07 00:00:00', '2024-03-09 00:00:00'],
  daterange: ['2024-02-29', '2024-03-29'],
  monthrange: ['2024-03', '2024-05'],
  select: '0',
  'select-multiple': ['0', '1'],
  input: '单行文本',
  textarea: '多行文本',
  'input-number': 4,
  rate: '3',
  switch: true,
  radio: '0',
  slider: 50,
  'time-picker': '2024-03-18 09:55:31',
  'time-select': '09:55:31',
  text: '文本',
  'plus-radio': 1,
  'plus-date-picker': ['2024-03-18 09:55:31', '2024-03-20 09:55:31'],
  'plus-input-tag': ['tag', 'tag1']
})

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

restaurants.value = loadAll()

const cascaderOptions = [
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

const columns: PlusColumn[] = [
  {
    label: 'autocomplete',
    width: 120,
    prop: 'autocomplete',
    valueType: 'autocomplete',
    tooltip: '自动补全输入框',
    fieldProps: {
      placeholder: '',
      clearable: false,
      disabled: false,
      valueKey: '',
      debounce: 300,
      placement: 'bottom',
      name: '',
      label: '',
      hideLoading: false,
      triggerOnFocus: false,
      selectWhenUnmatched: false,
      popperClass: '',
      teleported: false,
      highlightFirstItem: false,
      fitInputWidth: false,
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
    options: cascaderOptions,
    fieldProps: {
      options: [],
      props: {},
      size: 'large',
      showAllLevels: false,
      collapseTags: false,
      collapseTagsTooltip: false,
      separator: '/',
      filterable: false,
      filterMethod: () => {
        console.log(100)
      },
      beforeFilter: () => true,
      tagType: 'warning',
      validateEvent: false,
      maxCollapseTags: 10
    }
  },
  {
    label: 'cascader-multiple',
    prop: 'cascader-multiple',
    valueType: 'cascader',
    options: cascaderOptions,
    fieldProps: {
      props: { multiple: true, label: '', lazy: false }
    }
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
    ],
    fieldProps: {
      min: 10,
      max: 10,
      textColor: '',
      fill: '',
      tag: 'div'
    }
  },
  {
    label: 'color-picker',
    prop: 'color-picker',
    valueType: 'color-picker',
    fieldProps: {
      showAlpha: false,
      colorFormat: '',
      predefine: [],
      tabindex: ''
    }
  },
  {
    label: 'year',
    prop: 'year',
    valueType: 'date-picker',
    fieldProps: {
      type: 'year',
      tabindex: '',
      editable: false,
      startPlaceholder: '',
      endPlaceholder: '',
      status: '',
      popperOptions: {},
      rangeSeparator: '',
      defaultValue: new Date(),
      defaultTime: new Date(),
      valueFormat: '',
      format: '',
      unlinkPanels: false,
      prefixIcon: '',
      clearIcon: '',
      disabledDate: () => false,
      shortcuts: [],
      cellClassName: () => '',
      readonly: false,
      arrowControl: false,
      range: false
    }
  },
  // {
  //   label: 'years',
  //   prop: 'years',
  //   valueType: 'date-picker',
  //   fieldProps: {
  //     type: 'years'
  //   }
  // },
  {
    label: 'month',
    prop: 'month',
    valueType: 'date-picker',
    fieldProps: {
      type: 'month'
    }
  },
  {
    label: 'date',
    prop: 'date',
    valueType: 'date-picker',
    fieldProps: {
      type: 'date',
      format: ''
    }
  },
  {
    label: 'dates',
    prop: 'dates',
    valueType: 'date-picker',
    fieldProps: {
      type: 'dates'
    }
  },
  {
    label: 'datetime',
    prop: 'datetime',
    valueType: 'date-picker',
    fieldProps: {
      type: 'datetime'
    }
  },
  {
    label: 'week',
    prop: 'week',
    valueType: 'date-picker',
    fieldProps: {
      type: 'week'
    }
  },
  {
    label: 'datetimerange',
    prop: 'datetimerange',
    valueType: 'date-picker',
    fieldProps: {
      type: 'datetimerange'
    }
  },
  {
    label: 'daterange',
    prop: 'daterange',
    valueType: 'date-picker',
    fieldProps: {
      type: 'daterange'
    }
  },
  {
    label: 'monthrange',
    prop: 'monthrange',
    valueType: 'date-picker',
    fieldProps: {
      type: 'monthrange'
    }
  },
  {
    label: 'select',
    width: 120,
    prop: 'select',
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
    ],
    fieldProps: {
      collapseTagsTooltip: false,
      multiple: false,
      multipleLimit: 10,
      effect: 'light',
      allowCreate: false,
      remote: false,
      remoteShowSuffix: false,
      loadingText: '',
      noDataText: '',
      noMatchText: '',
      reserveKeyword: false,
      defaultFirstOption: false,
      persistent: false,
      automaticDropdown: false,
      tagType: 'danger',
      fallbackPlacements: [],
      maxCollapseTags: 10
    }
  },
  {
    label: 'select-multiple',
    width: 120,
    prop: 'select-multiple',
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
    ],
    fieldProps: {
      multiple: true
    }
  },
  {
    label: 'input',
    width: 120,
    prop: 'input',
    fieldProps: {
      maxlength: '',
      minlength: 10,
      showPassword: false,
      formatter: () => '',
      parser: () => '',
      showWordLimit: false,
      suffixIcon: '',
      autocomplete: '',
      autofocus: false,
      form: '',
      inputStyle: ''
    }
  },
  {
    label: 'input-number',
    prop: 'input-number',
    valueType: 'input-number',
    fieldProps: {
      precision: 2,
      step: 2,
      stepStrictly: false,
      controls: false,
      controlsPosition: '',
      valueOnClear: null
    }
  },
  {
    label: 'textarea',
    prop: 'textarea',
    valueType: 'textarea',
    fieldProps: {
      rows: 100,
      maxlength: 10,
      showWordLimit: true,
      autosize: { minRows: 2, maxRows: 4 }
    }
  },
  {
    label: 'rate',
    width: 200,
    prop: 'rate',
    valueType: 'rate',
    fieldProps: {
      allowHalf: false,
      lowThreshold: 1,
      highThreshold: 10,
      colors: [],
      voidColor: '',
      // voidIcon: '',
      disabledVoidColor: '',
      // disabledVoidIcon: '',
      showText: false,
      showScore: false,
      texts: [],
      scoreTemplate: '',
      clearable: false,
      id: ''
    }
  },
  {
    label: 'switch',
    width: 100,
    prop: 'switch',
    valueType: 'switch',
    fieldProps: {
      inlinePrompt: false,
      activeColor: '',
      activeIcon: '',
      inactiveActionIcon: '',
      inactiveIcon: '',
      inactiveText: '',
      activeText: '',
      activeActionIcon: '',
      beforeChange: () => false
    }
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
    ],
    fieldProps: {
      textColor: ''
    }
  },
  {
    label: 'slider',
    prop: 'slider',
    valueType: 'slider',
    fieldProps: {
      showInput: false,
      showInputControls: false,
      inputSize: 'default',
      showStops: false,
      showTooltip: false,
      formatTooltip: () => '',
      vertical: false,
      height: '',
      rangeStartLabel: '',
      rangeEndLabel: '',
      formatValueText: () => '',
      tooltipClass: '',
      marks: {
        0: '0°C',
        8: '8°C',
        37: '37°C'
      }
    }
  },
  {
    label: 'time-picker',
    prop: 'time-picker',
    valueType: 'time-picker',
    fieldProps: {
      disabledHours: () => [],
      disabledMinutes: () => [],
      disabledSeconds: () => [],
      isRange: false,
      prefixIcon: '',
      clearIcon: ''
    }
  },
  {
    label: 'time-select',
    prop: 'time-select',
    valueType: 'time-select',
    fieldProps: {
      minTime: '',
      maxTime: '',
      start: '',
      end: '',
      effect: 'dark'
    }
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
