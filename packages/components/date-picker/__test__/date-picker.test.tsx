import { nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import ElementPlus from 'element-plus'
import { describe, expect, test } from 'vitest'
import DatePicker from '../src/index.vue'

describe('date-picker/index.vue', () => {
  test('props rangeSeparator test', async () => {
    const date = ref<string[]>([])
    const rangeSeparator = '***'

    const wrapper = mount(
      () => <DatePicker rangeSeparator={rangeSeparator} modelValue={date.value} />,
      {
        global: {
          plugins: [ElementPlus]
        }
      }
    )
    await nextTick()
    expect(wrapper.find('.plus-date-picker__middle').text()).includes(rangeSeparator)
  })
})
