import { nextTick, ref, h } from 'vue'
import ElementPlus from 'element-plus'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import type { PlusColumn, FieldValues, FieldValueType } from '@plus-pro-components/types'
import FormItem from '../src/index.vue'

describe('form-item/index.vue', () => {
  test('render test', async () => {
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
      progress: 30,
      number: 30,
      rate: 4,
      switch: '',
      time: new Date(),
      slider: 10,
      code: `const data = 100`,
      copy: 'copy',
      img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
    const values = ref<FieldValues>({ ...row })

    const handleChange = (values: FieldValueType) => {
      console.log(values)
    }
    const wrapper = mount(
      () => (
        <div class="container">
          {columns.map(item => (
            <FormItem
              key={item.label}
              modelValue={values.value[item.prop]}
              label={item.label}
              prop={item.prop}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              onChange={handleChange}
            />
          ))}
        </div>
      ),
      {
        global: {
          plugins: [ElementPlus]
        }
      }
    )

    await nextTick()
    expect(wrapper.find('.el-autocomplete')).toBeTruthy()
    expect(wrapper.find('.el-cascader')).toBeTruthy()
    expect(wrapper.find('.el-checkbox-group')).toBeTruthy()
    expect(wrapper.find('.el-color-picker')).toBeTruthy()
    expect(wrapper.find('.el-date-editor')).toBeTruthy()
    expect(wrapper.find('.el-input')).toBeTruthy()
    expect(wrapper.find('.el-input-number')).toBeTruthy()
    expect(wrapper.find('.el-textarea')).toBeTruthy()
    expect(wrapper.find('.el-rate')).toBeTruthy()
    expect(wrapper.find('.el-switch')).toBeTruthy()
    expect(wrapper.find('.el-radio-group')).toBeTruthy()
    expect(wrapper.find('.el-date-editor--time')).toBeTruthy()
    expect(wrapper.find('.plus-radio')).toBeTruthy()
    expect(wrapper.find('.plus-date-picker')).toBeTruthy()
    expect(wrapper.find('.plus-input-tag')).toBeTruthy()
  })

  test('renderLabel and renderField test', async () => {
    const label = 'label'
    const prop = 'input'

    const column: PlusColumn = {
      label: label,
      width: 120,
      prop: prop
    }
    const values = ref<FieldValues>({})

    const renderLabel = (label: string) =>
      h(
        'div',
        {
          style: {
            color: 'red'
          },
          class: 'label'
        },
        label
      )

    const renderField = (
      _: FieldValueType,
      __: (value: FieldValueType) => void,
      props: PlusColumn
    ) =>
      h(
        'div',
        {
          style: {
            color: 'green'
          },
          class: 'field'
        },
        props.prop
      )

    const wrapper = mount(
      () => (
        <FormItem
          modelValue={values.value['input']}
          {...column}
          renderLabel={renderLabel}
          renderField={renderField}
        />
      ),
      {
        global: {
          plugins: [ElementPlus]
        }
      }
    )
    await nextTick()
    expect(wrapper.find('.el-form-item__label').text()).includes(label)
    expect(wrapper.find('.el-form-item__label .label').attributes('style')).includes('red')
    expect(wrapper.find('.el-form-item__content').text()).includes(prop)
    expect(wrapper.find('.el-form-item__content .field').attributes('style')).includes('green')
  })

  test('slots test', async () => {
    const label = 'label'
    const prop = 'input'
    const column: PlusColumn = {
      label: label,
      width: 120,
      prop: prop
    }
    const values = ref<FieldValues>({})
    const slots = {
      ['plus-label-' + prop]: ({ label }: { label: string }) => (
        <div style="color: red" class="label">
          {label}
        </div>
      ),
      ['plus-field-' + prop]: () => (
        <div style="color: green" class="field">
          {prop}
        </div>
      )
    }
    const wrapper = mount(
      () => <FormItem modelValue={values.value['input']} {...column} v-slots={slots} />,
      {
        global: {
          plugins: [ElementPlus]
        }
      }
    )
    await nextTick()
    expect(wrapper.find('.el-form-item__label').text()).includes(label)
    expect(wrapper.find('.el-form-item__label .label').attributes('style')).includes('red')
    expect(wrapper.find('.el-form-item__content').text()).includes(prop)
    expect(wrapper.find('.el-form-item__content .field').attributes('style')).includes('green')
  })

  test('props test', async () => {
    const fieldProps = async () => {
      return {
        clearable: true,
        size: 'large',
        placeholder: 'placeholder',
        multiple: true
      }
    }
    const options = async () => {
      return [
        {
          label: '未解决',
          value: '0',
          color: 'red'
        },
        {
          label: '已解决',
          value: '1',
          color: 'blue',
          fieldItemProps: {
            disabled: true
          }
        }
      ]
    }
    const formItemProps = async () => {
      return {
        labelWidth: '200px'
      }
    }
    const column: PlusColumn = {
      label: 'label',
      width: 120,
      prop: 'prop',
      valueType: 'select',
      fieldProps,
      options,
      formItemProps
    }
    const values = ref<FieldValueType>(['0'])
    const wrapper = mount(() => <FormItem modelValue={values.value} {...column} />, {
      global: {
        plugins: [ElementPlus]
      }
    })
    await nextTick()
    await new Promise(resolve => setTimeout(resolve, 1000))

    expect(wrapper.find('.el-form-item__label').attributes('style')).includes('width: 200px;')
    expect(wrapper.find('.el-select--large').exists()).toBe(true)
    expect(wrapper.find('.el-select__tags-text').text()).toBe('未解决')
  })
})
