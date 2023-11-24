import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import PlusCheckCardGroup from '../src/index.vue'

describe('check-card-group/index.vue', () => {
  test('render test', async () => {
    test('render test', async () => {
      const wrapper = mount(PlusCheckCardGroup, {
        options: [
          {
            title: 'title0',
            description: 'description0',
            avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
          },
          {
            title: 'title1',
            description: 'description1',
            avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
          }
        ]
      })
      await nextTick()
      expect(wrapper.find('.plus-check-card-group').exists()).toBe(true)
      expect(wrapper.find('.plus-check-card').exists()).toBe(true)
      expect(wrapper.find('.plus-check-card__avatar-wrapper').exists()).toBe(true)
      expect(wrapper.find('.el-avatar').exists()).toBe(true)
      expect(wrapper.find('.plus-check-card__title').exists()).toBe(true)
      expect(wrapper.find('.plus-check-card__title-left').exists()).toBe(true)
      expect(wrapper.find('.plus-check-card__title-right').exists()).toBe(true)
      expect(wrapper.find('.plus-check-card__description').exists()).toBe(true)
    })
  })
})
