import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import ElementPlus from 'element-plus'
import { describe, expect, test } from 'vitest'
import Dialog from '../src/index.vue'

describe('dialog/index.vue', () => {
  test('render test', async () => {
    const content = 'content'
    const wrapper = mount(
      () => (
        <Dialog modelValue={true} append-to-body={false}>
          {content}
        </Dialog>
      ),
      {
        global: {
          plugins: [ElementPlus]
        }
      }
    )
    await nextTick()
    expect(wrapper.find('.el-dialog__body').text()).includes(content)
  })
  test('slots test', async () => {
    const content = 'content'
    const wrapper = mount(
      () => (
        <Dialog
          modelValue={true}
          append-to-body={false}
          v-slots={{
            header: () => content
          }}
        >
          {content}
        </Dialog>
      ),
      {
        global: {
          plugins: [ElementPlus]
        }
      }
    )
    await nextTick()
    expect(wrapper.find('.el-dialog__header').text()).includes(content)
  })
})
