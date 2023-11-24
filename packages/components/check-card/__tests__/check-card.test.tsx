import { describe, expect, test } from 'vitest'
import { nextTick } from 'vue'
import { ElAvatar } from 'element-plus'
import { mount } from '@vue/test-utils'
import CheckCard from '../src/index.vue'

describe('check-card/index.vue', () => {
  test('render test', async () => {
    const wrapper = mount(CheckCard, {
      props: {
        title: 'title0',
        description: 'description0',
        avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      },
      components: {
        ElAvatar
      }
    })
    await nextTick()
    expect(wrapper.find('.plus-check-card').exists()).toBe(true)
    expect(wrapper.find('.plus-check-card__avatar-wrapper').exists()).toBe(true)
    expect(wrapper.find('.el-avatar').exists()).toBe(true)
    expect(wrapper.find('.plus-check-card__title').exists()).toBe(true)
    expect(wrapper.find('.plus-check-card__title-left').exists()).toBe(true)
    expect(wrapper.find('.plus-check-card__title-right').exists()).toBe(true)
    expect(wrapper.find('.plus-check-card__description').exists()).toBe(true)
  })
})
