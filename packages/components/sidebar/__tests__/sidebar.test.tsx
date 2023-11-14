import { describe, expect, test } from 'vitest'
import { ElMenu, ElMenuItem, ElIcon, ElScrollbar, ElSubMenu } from 'element-plus'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import type { PlusRouteRecordRaw } from 'plus-pro-components'
import { Document as DocumentIcon } from '@element-plus/icons-vue'
import Sidebar from '../src/index.vue'

describe('sidebar/index.vue', () => {
  test('render test', async () => {
    const routes: PlusRouteRecordRaw[] = [
      {
        path: '/breadcrumb',
        name: 'breadcrumb',
        meta: {
          icon: DocumentIcon
        }
      },
      {
        path: '/description',
        name: 'description',
        meta: {
          icon: DocumentIcon
        }
      }
    ]
    const wrapper = mount(() => <Sidebar routes={routes} />, {
      components: {
        ElMenu,
        ElMenuItem,
        ElIcon,
        ElScrollbar,
        ElSubMenu
      }
    })
    await nextTick()
    expect(wrapper.find('.plus-sidebar').exists()).toBe(true)
    expect(wrapper.find('.plus-sidebar__item').exists()).toBe(true)
    expect(wrapper.find('.plus-sidebar__item-icon').exists()).toBe(true)
    expect(wrapper.find('.plus-sidebar__item-title').exists()).toBe(true)
    expect(wrapper.find('.plus-sidebar').text()).includes(routes[0].name)
    expect(wrapper.find('.plus-sidebar').text()).includes(routes[1].name)
  })

  test('hideInMenu test', async () => {
    const routes: PlusRouteRecordRaw[] = [
      {
        path: '/breadcrumb',
        name: 'breadcrumb',
        meta: {
          icon: DocumentIcon
        }
      },
      {
        path: '/description',
        name: 'description',
        meta: {
          icon: DocumentIcon,
          hideInMenu: true
        }
      }
    ]
    const wrapper = mount(() => <Sidebar routes={routes} />, {
      components: {
        ElMenu,
        ElMenuItem,
        ElIcon,
        ElScrollbar,
        ElSubMenu
      }
    })
    await nextTick()
    expect(wrapper.find('.plus-sidebar').text()).includes(routes[0].name)
    expect(wrapper.find('.plus-sidebar').text()).not.includes(routes[1].name)
  })

  test('renderTitle test', async () => {
    const routes: PlusRouteRecordRaw[] = [
      {
        path: '/breadcrumb',
        name: 'breadcrumb',
        meta: {
          icon: DocumentIcon
        }
      },
      {
        path: '/description',
        name: 'description',
        meta: {
          icon: DocumentIcon
        }
      }
    ]

    const renderTitle = (route: PlusRouteRecordRaw) => {
      return route.path as string
    }

    const wrapper = mount(() => <Sidebar routes={routes} renderTitle={renderTitle} />, {
      components: {
        ElMenu,
        ElMenuItem,
        ElIcon,
        ElScrollbar,
        ElSubMenu
      }
    })
    await nextTick()
    expect(wrapper.find('.plus-sidebar').text()).includes(routes[0].path)
    expect(wrapper.find('.plus-sidebar').text()).includes(routes[1].path)
  })

  test('slots test', async () => {
    const routes: PlusRouteRecordRaw[] = [
      {
        path: '/breadcrumb',
        name: 'breadcrumb',
        meta: {
          icon: DocumentIcon
        }
      },
      {
        path: '/description',
        name: 'description',
        meta: {
          icon: DocumentIcon
        }
      }
    ]

    const slots = {
      'sidebar-extra': () => 'sidebar-extra',
      'sidebar-item': () => 'sidebar-item'
    }

    const wrapper = mount(() => <Sidebar routes={routes} v-slots={slots} />, {
      components: {
        ElMenu,
        ElMenuItem,
        ElIcon,
        ElScrollbar,
        ElSubMenu
      }
    })
    await nextTick()
    expect(wrapper.find('.plus-sidebar').text()).includes('sidebar-extra')
    expect(wrapper.find('.plus-sidebar').text()).includes('sidebar-item')
  })
})
