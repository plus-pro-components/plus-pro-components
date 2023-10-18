import { nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { ElDatePicker } from 'element-plus'
import { describe, expect, test } from 'vitest'
import DatePicker from '../src/index.vue'

describe('date-picker/index.vue', () => {
  test('render test', async () => {
    const wrapper = mount(DatePicker, {
      components: {
        ElDatePicker
      }
    })
    await nextTick()
    expect(wrapper.find('.plus-date-picker').exists()).toBe(true)
    expect(wrapper.find('.plus-date-picker__start').exists()).toBe(true)
    expect(wrapper.find('.plus-date-picker__middle').exists()).toBe(true)
    expect(wrapper.find('.plus-date-picker__end').exists()).toBe(true)
  })

  test('rangeSeparator props test', async () => {
    const date = ref<string[]>([])
    const rangeSeparator = '***'
    const wrapper = mount(
      () => <DatePicker rangeSeparator={rangeSeparator} modelValue={date.value} />,
      {
        components: {
          ElDatePicker
        }
      }
    )
    await nextTick()
    expect(wrapper.find('.plus-date-picker__middle').text()).includes(rangeSeparator)
  })

  test('modelValue test', async () => {
    const start = '2026-8-1 14:12:12'
    const end = '2026-8-8 14:12:12'
    const date = ref<string[]>([start, end])
    const wrapper = mount(DatePicker, {
      components: {
        ElDatePicker
      },
      props: {
        modelValue: date.value,
        'onUpdate:modelValue': (data: string[]) => wrapper.setProps({ modelValue: data })
      }
    })
    expect(wrapper.props('modelValue')[0]).toBe(start)
    expect(wrapper.props('modelValue')[1]).toBe(end)
  })

  test('instance test', async () => {
    const wrapper = mount(DatePicker, {
      components: {
        ElDatePicker
      }
    })
    expect(wrapper.vm.startPickerInstance).toHaveProperty('focus')
    expect(wrapper.vm.startPickerInstance).toHaveProperty('handleOpen')
    expect(wrapper.vm.startPickerInstance).toHaveProperty('handleClose')
    expect(wrapper.vm.endPickerInstance).toHaveProperty('focus')
    expect(wrapper.vm.endPickerInstance).toHaveProperty('handleOpen')
    expect(wrapper.vm.endPickerInstance).toHaveProperty('handleClose')
  })

  test('input test', async () => {
    const wrapper = mount(DatePicker, {
      components: {
        ElDatePicker
      }
    })
    await nextTick()
    const input = wrapper.find('.el-input__inner')
    input.setValue('2023-08-01 12:12:12')
    const changeEvent = wrapper.emitted()
    expect(changeEvent).toHaveProperty('input')
  })
})
