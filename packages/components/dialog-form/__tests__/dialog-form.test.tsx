import { nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import ElementPlus, { ElButton } from 'element-plus'
import { describe, expect, test } from 'vitest'
import type { PlusColumn, FieldValues } from '@plus-pro-components/types'
import DialogForm from '../src/index.vue'

const columns: PlusColumn[] = [
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
  },
  {
    label: '是否显示',
    width: 100,
    prop: 'switch',
    valueType: 'switch'
  },

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

describe('dialog-form/index.vue', () => {
  test('render test', async () => {
    const visible = ref(true)
    const values = ref<FieldValues>({})

    const wrapper = mount(
      () => (
        <DialogForm
          visible={visible.value}
          modelValue={values.value}
          append-to-body={false}
          form={{ columns }}
        />
      ),
      {
        global: {
          plugins: [ElementPlus]
        }
      }
    )
    await nextTick()
    expect(wrapper.find('.el-dialog__title').text()).includes('Dialog form')
  })

  test('dialog-footer dialog-header slots test', async () => {
    const visible = ref(true)
    const values = ref<FieldValues>({})
    const slots = {
      'dialog-footer': () => (
        <>
          <ElButton type="primary">确定</ElButton>
          <ElButton type="warning">取消</ElButton>
          <ElButton type="danger"> 返回</ElButton>
        </>
      ),
      'dialog-header': () => 'dialog-header'
    }
    const wrapper = mount(
      () => (
        <DialogForm
          visible={visible.value}
          modelValue={values.value}
          append-to-body={false}
          form={{ columns }}
          v-slots={slots}
        />
      ),
      {
        global: {
          plugins: [ElementPlus]
        }
      }
    )
    await nextTick()
    expect(wrapper.find('.plus-dialog-footer').text()).includes('确定')
    expect(wrapper.find('.plus-dialog-footer').text()).includes('取消')
    expect(wrapper.find('.plus-dialog-footer').text()).includes('返回')
    expect(wrapper.find('.el-dialog__header').text()).includes('dialog-header')
  })
  test('form-footer plus-*-* slots test', async () => {
    const visible = ref(true)
    const values = ref<FieldValues>({})
    const slots = {
      'form-footer': () => (
        <>
          <ElButton type="primary">确定</ElButton>
          <ElButton type="warning">取消</ElButton>
          <ElButton type="danger"> 返回</ElButton>
        </>
      ),
      'plus-label-name': () => 'plus-label-name',
      'plus-field-name': () => 'plus-field-name'
    }
    const wrapper = mount(
      () => (
        <DialogForm
          visible={visible.value}
          modelValue={values.value}
          append-to-body={false}
          form={{ columns, hasFooter: true }}
          dialog={{ hasFooter: false }}
          v-slots={slots}
        />
      ),
      {
        global: {
          plugins: [ElementPlus]
        }
      }
    )
    await nextTick()
    expect(wrapper.find('.plus-form__footer').text()).includes('确定')
    expect(wrapper.find('.plus-form__footer').text()).includes('取消')
    expect(wrapper.find('.plus-form__footer').text()).includes('返回')
    expect(wrapper.find('.plus-form').text()).includes('plus-label-name')
    expect(wrapper.find('.plus-form').text()).includes('plus-field-name')
  })
})
