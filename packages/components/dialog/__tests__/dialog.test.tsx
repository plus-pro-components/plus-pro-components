import { nextTick, ref } from 'vue'
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

  test('props test', async () => {
    const wrapper = mount(
      () => <Dialog modelValue={true} append-to-body={false} hasFooter={false}></Dialog>,
      {
        global: {
          plugins: [ElementPlus]
        }
      }
    )

    const confirmText = 'confirmText'
    const cancelText = 'cancelText'
    const title = 'title'
    const top = '10px'
    const width = '100px'
    const wrapper1 = mount(
      () => (
        <Dialog
          modelValue={true}
          append-to-body={false}
          confirmText={confirmText}
          cancelText={cancelText}
          title={title}
          top={top}
          width={width}
        ></Dialog>
      ),
      {
        global: {
          plugins: [ElementPlus]
        }
      }
    )
    await nextTick()
    expect(wrapper.find('.plus-dialog-footer').exists()).toBe(false)

    expect(wrapper1.find('.plus-dialog-footer .el-button').text()).includes(cancelText)
    expect(wrapper1.find('.plus-dialog-footer .el-button--primary').text()).includes(confirmText)
    expect(wrapper1.find('.el-dialog__title').text()).includes(title)
    expect(wrapper1.find('.plus-dialog').attributes('style')).includes(top)
    expect(wrapper1.find('.plus-dialog').attributes('style')).includes(width)
  })

  test('emitted test', async () => {
    const visible = ref(true)
    const onConfirm = () => {
      visible.value = false
    }
    const wrapper = mount(
      () => <Dialog modelValue={visible.value} append-to-body={false}></Dialog>,
      {
        global: {
          plugins: [ElementPlus]
        },
        props: {
          onConfirm
        }
      }
    )
    expect(wrapper.emitted().confirm).toEqual(undefined)
    expect(wrapper.emitted().cancel).toEqual(undefined)
  })

  test('slots test', async () => {
    const content = 'content'
    const header = 'header'
    const footer = 'footer'
    const wrapper = mount(
      () => (
        <Dialog
          modelValue={true}
          append-to-body={false}
          v-slots={{
            header: () => header,
            footer: () => footer
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
    expect(wrapper.find('.el-dialog__header').text()).includes(header)
    expect(wrapper.find('.plus-dialog-body').text()).includes(content)
    expect(wrapper.find('.el-dialog__footer').text()).includes(footer)
  })
})
