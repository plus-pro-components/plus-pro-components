import { nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { ElRadio, ElRadioGroup } from 'element-plus'
import { describe, expect, test } from 'vitest'
import type { PlusRadioProps } from '../src/index.vue'
import PlusRadio from '../src/index.vue'

const options = [
  { label: 'Option A', value: 1 },
  { label: 'Option B', value: 2 }
]

describe('radio/index.vue', () => {
  test('render test', async () => {
    const wrapper = mount(
      () => <PlusRadio options={options} modelValue={1} isCancel={false}></PlusRadio>,
      {
        components: {
          ElRadio,
          ElRadioGroup
        }
      }
    )
    await nextTick()
    expect(wrapper.find('.el-radio').text()).includes('Option A')
  })
  test('isCancel test', async () => {
    const value = ref(1)
    const handleRadioChange = (data: PlusRadioProps['modelValue']) => {
      value.value = data as number
    }
    const wrapper = mount(
      () => (
        <PlusRadio
          options={options}
          modelValue={value.value}
          isCancel={true}
          onChange={handleRadioChange}
        ></PlusRadio>
      ),
      {
        components: {
          ElRadio,
          ElRadioGroup
        }
      }
    )
    await wrapper.find('.el-radio').trigger('click')
    expect(value.value).toEqual('')
    await wrapper.find('.el-radio').trigger('click')
    expect(value.value).toEqual(1)
  })
})
