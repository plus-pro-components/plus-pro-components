import { describe, expect, test } from 'vitest'
import ElementPlus from 'element-plus'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import type { PlusRouteRecordRaw } from 'plus-pro-components'
import { Document as DocumentIcon } from '@element-plus/icons-vue'
import Layout from '../src/index.vue'

describe('layout/index.vue', () => {
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
    const wrapper = mount(
      () => <Layout sidebarProps={{ routes }} breadcrumbProps={{ routes }} backtop={false} />,
      {
        global: {
          plugins: [ElementPlus]
        }
      }
    )
    await nextTick()
    expect(wrapper.find('.plus-sidebar').exists()).toBe(true)
    expect(wrapper.find('.plus-sidebar__item').exists()).toBe(true)
    expect(wrapper.find('.plus-sidebar__item-icon').exists()).toBe(true)
    expect(wrapper.find('.plus-sidebar__item-title').exists()).toBe(true)
    expect(wrapper.find('.plus-sidebar').text()).includes(routes[0].name)
    expect(wrapper.find('.plus-sidebar').text()).includes(routes[1].name)

    expect(wrapper.find('.plus-breadcrumb').exists()).toBe(true)
    expect(wrapper.find('.plus-breadcrumb-item').exists()).toBe(true)
    expect(wrapper.find('.plus-breadcrumb').text()).includes(routes[0].name)
    expect(wrapper.find('.plus-breadcrumb').text()).includes(routes[1].name)
  })

  test('hideInMenu and hideInBreadcrumb test', async () => {
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
          hideInMenu: true,
          hideInBreadcrumb: true
        }
      }
    ]
    const wrapper = mount(
      () => <Layout sidebarProps={{ routes }} breadcrumbProps={{ routes }} backtop={false} />,
      {
        global: {
          plugins: [ElementPlus]
        }
      }
    )
    await nextTick()
    expect(wrapper.find('.plus-sidebar').text()).includes(routes[0].name)
    expect(wrapper.find('.plus-sidebar').text()).not.includes(routes[1].name)

    expect(wrapper.find('.plus-breadcrumb').text()).includes(routes[0].name)
    expect(wrapper.find('.plus-breadcrumb').text()).not.includes(routes[1].name)
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

    const wrapper = mount(
      () => (
        <Layout
          breadcrumbProps={{ routes, renderTitle }}
          sidebarProps={{ routes, renderTitle }}
          backtop={false}
        />
      ),
      {
        global: {
          plugins: [ElementPlus]
        }
      }
    )
    await nextTick()
    expect(wrapper.find('.plus-sidebar').text()).includes(routes[0].path)
    expect(wrapper.find('.plus-sidebar').text()).includes(routes[1].path)
    expect(wrapper.find('.plus-breadcrumb').text()).includes(routes[0].path)
    expect(wrapper.find('.plus-breadcrumb').text()).includes(routes[1].path)
  })
})
