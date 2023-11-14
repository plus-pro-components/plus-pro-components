import { describe, expect, test } from 'vitest'
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import type { PlusRouteRecordRaw } from 'plus-pro-components'
import Breadcrumb from '../src/index.vue'

describe('breadcrumb/index.vue', () => {
  test('render test', async () => {
    const routes: PlusRouteRecordRaw[] = [
      {
        path: '/breadcrumb/1',
        name: 'Breadcrumb1',
        meta: {
          title: '面包屑1'
        },
        children: []
      },
      {
        path: '/breadcrumb/2',
        name: 'Breadcrumb2',
        meta: {
          title: '面包屑2'
        },
        children: []
      }
    ]
    const wrapper = mount(() => <Breadcrumb routes={routes} />, {
      components: {
        ElBreadcrumb,
        ElBreadcrumbItem
      }
    })
    await nextTick()
    expect(wrapper.find('.plus-breadcrumb').exists()).toBe(true)
    expect(wrapper.find('.plus-breadcrumb-item').exists()).toBe(true)
    expect(wrapper.find('.plus-breadcrumb').text()).includes(routes[0].meta?.title)
    expect(wrapper.find('.plus-breadcrumb').text()).includes(routes[1].meta?.title)
  })

  test('hideInBreadcrumb test', async () => {
    const routes: PlusRouteRecordRaw[] = [
      {
        path: '/breadcrumb/1',
        name: 'Breadcrumb1',
        meta: {
          title: '面包屑1'
        },
        children: []
      },
      {
        path: '/breadcrumb/2',
        name: 'Breadcrumb2',
        meta: {
          title: '面包屑2',
          hideInBreadcrumb: true
        },
        children: []
      }
    ]
    const wrapper = mount(() => <Breadcrumb routes={routes} />, {
      components: {
        ElBreadcrumb,
        ElBreadcrumbItem
      }
    })
    await nextTick()
    expect(wrapper.find('.plus-breadcrumb').text()).includes(routes[0].meta?.title)
    expect(wrapper.find('.plus-breadcrumb').text()).not.includes(routes[1].meta?.title)
  })

  test('renderTitle test', async () => {
    const routes: PlusRouteRecordRaw[] = [
      {
        path: '/breadcrumb/1',
        name: 'Breadcrumb1',
        meta: {
          title: '面包屑1'
        },
        children: []
      },
      {
        path: '/breadcrumb/2',
        name: 'Breadcrumb2',
        meta: {
          title: '面包屑2',
          hideInBreadcrumb: true
        },
        children: []
      }
    ]

    const renderTitle = (route: PlusRouteRecordRaw) => {
      return route.name as string
    }

    const wrapper = mount(() => <Breadcrumb routes={routes} renderTitle={renderTitle} />, {
      components: {
        ElBreadcrumb,
        ElBreadcrumbItem
      }
    })
    await nextTick()
    expect(wrapper.find('.plus-breadcrumb').text()).includes(routes[0].name)
    expect(wrapper.find('.plus-breadcrumb').text()).not.includes(routes[1].name)
  })

  test('slots test', async () => {
    const routes: PlusRouteRecordRaw[] = [
      {
        path: '/breadcrumb/1',
        name: 'Breadcrumb1',
        meta: {
          title: '面包屑1'
        },
        children: []
      },
      {
        path: '/breadcrumb/2',
        name: 'Breadcrumb2',
        meta: {
          title: '面包屑2',
          hideInBreadcrumb: true
        },
        children: []
      }
    ]

    const slots = {
      'breadcrumb-item-title': (item: PlusRouteRecordRaw) => item.name
    }
    const wrapper = mount(() => <Breadcrumb routes={routes} v-slots={slots} />, {
      components: {
        ElBreadcrumb,
        ElBreadcrumbItem
      }
    })
    await nextTick()
    expect(wrapper.find('.plus-breadcrumb').text()).includes(routes[0].name)
  })
})
