import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import ElementPlus, { ElButton } from 'element-plus'
import { describe, expect, test } from 'vitest'
import Popover from '../src/index.vue'

describe('popover/index.vue', () => {
  test('render test', async () => {
    const content = '点击'
    const slots = {
      reference() {
        return <ElButton> {content}</ElButton>
      }
    }

    const wrapper = mount(() => <Popover v-slots={slots}></Popover>, {
      global: {
        plugins: [ElementPlus]
      }
    })
    await nextTick()
    expect(wrapper.find('.el-button').text()).includes(content)
  })
})
