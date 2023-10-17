import { describe, expect, test } from 'vitest'
import ElementPlus from 'element-plus'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import InputTag from '../src/index.vue'

describe('input-tag/index.vue', () => {
  test('render test', async () => {
    const wrapper = mount(() => <InputTag />, {
      global: {
        plugins: [ElementPlus]
      }
    })
    await nextTick()
    expect(wrapper.find('.plus-input-tag').exists()).toBe(true)
    expect(wrapper.find('.plus-input-tag__tag').exists()).toBe(false)
    expect(wrapper.find('.plus-input-tag__input').exists()).toBe(true)
  })

  test('modelValue test', async () => {
    const wrapper = mount(() => <InputTag modelValue={['tag1', 'tag2']} />, {
      global: {
        plugins: [ElementPlus]
      }
    })
    await nextTick()
    expect(wrapper.find('.plus-input-tag').text()).includes('tag1')
    expect(wrapper.find('.plus-input-tag').text()).includes('tag2')
  })

  test('limit props test', async () => {
    const wrapper = mount(
      () => <InputTag modelValue={['tag1', 'tag2', 'tag11', 'tag22']} limit={3} />,
      {
        global: {
          plugins: [ElementPlus]
        }
      }
    )
    await nextTick()
    expect(wrapper.find('.plus-input-tag').text()).includes('tag1')
    expect(wrapper.find('.plus-input-tag').text()).includes('tag2')
    expect(wrapper.find('.plus-input-tag').text()).includes('tag11')
    expect(wrapper.find('.plus-input-tag').text()).not.include('tag22')
  })

  test('instance test', async () => {
    const wrapper = mount(InputTag, {
      props: {
        modelValue: ['tag1', 'tag2', 'tag11', 'tag22']
      },
      global: {
        plugins: [ElementPlus]
      }
    })
    await nextTick()
    expect(wrapper.vm.inputInstance).toHaveProperty('focus')
    expect(wrapper.vm.inputInstance?.blur())
    expect(wrapper.find('.plus-input-tag').trigger('click'))
    expect(wrapper.find('.plus-input-tag__is-focus').exists()).toBe(false)
    expect((wrapper.vm.tagInstance as any)[0]).toHaveProperty('closable')
  })
})
