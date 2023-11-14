import { describe, expect, test } from 'vitest'
import ElementPlus from 'element-plus'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Header from '../src/index.vue'

const logo = 'https://plus-pro-components.com/logo.png'
const title = 'PlusProComponents'

describe('header/index.vue', () => {
  test('render test', async () => {
    const wrapper = mount(() => <Header />, {
      global: {
        plugins: [ElementPlus]
      }
    })
    await nextTick()
    expect(wrapper.find('.plus-header').exists()).toBe(true)
    expect(wrapper.find('.plus-header__left').exists()).toBe(true)
    expect(wrapper.find('.plus-header__left .plus-header__logo').exists()).toBe(true)
    expect(wrapper.find('.plus-header__left .plus-header__title').exists()).toBe(true)
    expect(wrapper.find('.plus-header__placeholder').exists()).toBe(true)
    expect(wrapper.find('.plus-header__right').exists()).toBe(true)
    expect(wrapper.find('.plus-header__right .plus-header__dropdown-area').exists()).toBe(true)
    expect(wrapper.find('.plus-header__right .plus-header__avatar').exists()).toBe(true)
    expect(wrapper.find('.plus-header__right .plus-header__username').exists()).toBe(true)
  })

  test('renderHeaderLeft and renderHeaderRight test', async () => {
    const renderHeaderLeft = (info: { title: string; logo: string }) => {
      return info.title + info.logo
    }
    const renderHeaderRight = (info: { userInfo: any; title: string }) => {
      return info.title
    }
    const wrapper = mount(
      () => <Header renderHeaderLeft={renderHeaderLeft} renderHeaderRight={renderHeaderRight} />,
      {
        global: {
          plugins: [ElementPlus]
        }
      }
    )
    await nextTick()
    expect(wrapper.find('.plus-header__left').text()).includes(title + logo)
    expect(wrapper.find('.plus-header__right').text()).includes(title)
  })

  test('slots test', async () => {
    const slots = {
      'header-left': () => title + logo,
      'header-right': () => title
    }
    const wrapper = mount(() => <Header v-slots={slots} />, {
      global: {
        plugins: [ElementPlus]
      }
    })
    await nextTick()
    expect(wrapper.find('.plus-header__left').text()).includes(title + logo)
    expect(wrapper.find('.plus-header__right').text()).includes(title)
  })
})
