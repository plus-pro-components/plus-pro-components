import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import ElementPlus from 'element-plus'
import { describe, expect, test } from 'vitest'
import PlusRadio from '../src/index.vue'

describe('radio/index.vue', () => {
  test('render test', async () => {
    const data = [
      { label: 'Option A', value: 1 },
      { label: 'Option B', value: 2 }
    ]
    const wrapper = mount(
      () => <PlusRadio data={data} modelValue={1} isCancel={false}></PlusRadio>,
      {
        global: {
          plugins: [ElementPlus]
        }
      }
    )
    await nextTick()
    expect(wrapper.find('.el-radio').text()).includes('Option A')
  })
})
