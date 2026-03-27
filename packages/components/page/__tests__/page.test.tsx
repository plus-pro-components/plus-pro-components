import { describe, expect, test, vi } from 'vitest'
import type { PlusColumn, PageInfo, FieldValues } from '@plus-pro-components/types'
import ElementPlus from 'element-plus'
import { h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { useTable } from '@plus-pro-components/hooks'
import { PlusSearch } from '@plus-pro-components/components/search'
import PlusPage from '../src/index.vue'

type PlusPageExposed = {
  setSearchFieldsValue: (values: FieldValues) => void
  getSearchFieldsValue: (key?: keyof FieldValues) => FieldValues | FieldValues[keyof FieldValues]
  clearSearchFieldsValue: () => void
}

describe('page/index.vue', () => {
  test('render  and instance  test', async () => {
    const getList = async (
      query: PageInfo & {
        status?: string
        name?: string
      }
    ) => {
      const { page = 1, pageSize = 20, status, name } = query || {}
      const total = 1000
      const List = Array.from({ length: total }).map((item, index) => {
        return {
          id: index,
          name: index === 0 ? 'name'.repeat(20) : index + 'name',
          status: String(index % 3),
          tag: index === 1 ? 'success' : index === 2 ? 'warning' : index === 3 ? 'info' : 'danger',
          progress: 10,
          rate: index > 3 ? 2 : 3.5,
          switch: index % 2 === 0 ? true : false,
          img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          time: new Date(),
          code: `
          const getData = async params => {
            const data = await getData(params)
            return { list: data.data, ...data }
          }`,
          custom: 'custom' + index
        }
      })

      const mockList = List.filter(item => {
        if (status && status !== item.status) {
          return false
        }
        if (name && name !== item.name) {
          return false
        }

        return true
      })

      const pageList = mockList.filter(
        (item, index) => index < pageSize * page && index >= pageSize * (page - 1)
      )

      // 等待2s
      await new Promise(resolve => {
        setTimeout(() => {
          resolve('')
        }, 2000)
      })

      return { data: pageList, success: true, total: mockList.length }
    }

    const tableConfig: PlusColumn[] = [
      {
        label: '名称',
        tooltip: '名称最多显示6个字符',
        width: 120,
        prop: 'name',

        tableColumnProps: {
          showOverflowTooltip: true
        }
      },
      {
        label: '状态',
        width: 120,
        prop: 'status',
        valueType: 'select',
        options: [
          {
            label: '未解决',
            value: '0',
            color: 'red'
          },
          {
            label: '已解决',
            value: '1',
            color: 'blue'
          },
          {
            label: '解决中',
            value: '2',
            color: 'yellow'
          },
          {
            label: '失败',
            value: '3',
            color: 'red'
          }
        ]
      },
      {
        label: '标签',
        width: 120,
        prop: 'tag',
        valueType: 'tag',
        fieldProps: (value: string) => {
          return { type: value }
        }
      },
      {
        label: '执行进度',
        width: 200,
        prop: 'progress',
        valueType: 'progress',
        fieldProps: (value: number) => {
          const data =
            value === 0
              ? { status: 'exception' }
              : value > 5
              ? { status: 'warning' }
              : value > 3
              ? { status: 'success' }
              : { status: 'exception' }

          return data
        }
      },
      {
        label: '代码块',
        width: 250,
        prop: 'code',
        hideInSearch: true,
        valueType: 'code'
      },
      {
        label: '评分',
        width: 200,
        prop: 'rate',
        valueType: 'rate',
        hideInSearch: true,
        editable: true
      },
      {
        label: '开关',
        width: 100,
        prop: 'switch',
        hideInSearch: true,
        valueType: 'switch',
        editable: true
      },

      {
        label: '时间',
        prop: 'time',
        valueType: 'date-picker',
        hideInForm: true
      }
    ]

    const wrapper = mount(PlusPage, {
      props: {
        columns: tableConfig,
        request: getList
      },
      global: {
        plugins: [ElementPlus]
      }
    })
    await nextTick()
    expect(wrapper.find('.plus-search').exists()).toBe(true)
    expect(wrapper.find('.plus-table').exists()).toBe(true)
    expect(wrapper.find('.plus-pagination').exists()).toBe(true)

    const wrapper1 = mount(
      () => h(PlusPage, { search: false, columns: tableConfig, request: getList }),
      {
        global: {
          plugins: [ElementPlus]
        }
      }
    )
    await nextTick()
    expect(wrapper1.find('.plus-search').exists()).toBe(false)
    expect(wrapper1.find('.plus-table').exists()).toBe(true)

    // instance
    expect(wrapper.vm).toHaveProperty('plusSearchInstance')
    expect(wrapper.vm).toHaveProperty('plusTableInstance')
    expect(wrapper.vm).toHaveProperty('getList')
    expect(wrapper.vm).toHaveProperty('handleReset')
    expect(wrapper.vm).toHaveProperty('setSearchFieldsValue')
    expect(wrapper.vm).toHaveProperty('getSearchFieldsValue')
    expect(wrapper.vm).toHaveProperty('clearSearchFieldsValue')
  })
  test('slots test', async () => {
    const getList = async (
      query: PageInfo & {
        status?: string
        name?: string
      }
    ) => {
      const { page = 1, pageSize = 20, status, name } = query || {}
      const total = 1000
      const List = Array.from({ length: total }).map((item, index) => {
        return {
          id: index,
          name: index === 0 ? 'name'.repeat(20) : index + 'name',
          status: String(index % 3),
          tag: index === 1 ? 'success' : index === 2 ? 'warning' : index === 3 ? 'info' : 'danger',
          progress: 10,
          rate: index > 3 ? 2 : 3.5,
          switch: index % 2 === 0 ? true : false,
          img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          time: new Date(),
          code: `
          const getData = async params => {
            const data = await getData(params)
            return { list: data.data, ...data }
          }`,
          custom: 'custom' + index
        }
      })

      const mockList = List.filter(item => {
        if (status && status !== item.status) {
          return false
        }
        if (name && name !== item.name) {
          return false
        }

        return true
      })

      const pageList = mockList.filter(
        (item, index) => index < pageSize * page && index >= pageSize * (page - 1)
      )

      // 等待2s
      await new Promise(resolve => {
        setTimeout(() => {
          resolve('')
        }, 2000)
      })

      return { data: pageList, success: true, total: mockList.length }
    }

    const columns: PlusColumn[] = [
      {
        label: '名称',
        tooltip: '名称最多显示6个字符',
        width: 120,
        prop: 'name',
        tableColumnProps: {
          showOverflowTooltip: true
        }
      },
      {
        label: '多级数据',
        width: 120,
        prop: 'level.state.value'
      },
      {
        label: '状态',
        width: 120,
        prop: 'status',
        valueType: 'select',
        options: [
          {
            label: '未解决',
            value: '0',
            type: 'warning'
          },
          {
            label: '已解决',
            value: '1',
            type: 'success'
          },
          {
            label: '解决中',
            value: '2',
            type: 'primary'
          },
          {
            label: '失败',
            value: '3',
            type: 'danger'
          }
        ]
      },
      {
        label: '标签',
        width: 120,
        prop: 'tag',
        valueType: 'tag',
        fieldProps: (value: string) => {
          return { type: value }
        }
      },

      {
        label: '评分',
        width: 200,
        prop: 'rate',
        valueType: 'rate',
        editable: true
      },
      {
        label: '开关',
        width: 100,
        prop: 'switch',
        valueType: 'switch',
        editable: true
      },
      {
        label: '图片',
        prop: 'img',
        width: 100,
        valueType: 'img'
      }
    ]

    const { pageInfo, buttons } = useTable()

    buttons.value = [
      {
        // 查看
        text: '查看',
        props: {
          type: 'primary'
        }
      },
      {
        // 修改
        text: '修改',
        props: {
          type: 'success'
        }
      },
      {
        // 删除
        text: '删除',
        props: {
          type: 'warning'
        },
        confirm: {}
      },
      {
        text: '复制',
        props: {
          type: 'primary'
        },
        confirm: {}
      }
    ]

    const wrapper = mount(
      () =>
        h(
          PlusPage,
          {
            columns,
            request: getList,
            table: {
              pagination: { total: 3, modelValue: pageInfo.value },
              actionBar: { buttons: buttons.value, showNumber: 3 },
              dragSortable: {},
              hasIndexColumn: true
            }
          },
          {
            'action-bar-more-icon': () => 'action-bar-more-icon',
            'tooltip-icon': () => 'tooltip-icon',
            'drag-sort-icon': () => 'drag-sort-icon',
            'column-settings-icon': () => 'column-settings-icon',
            'density-icon': () => 'density-icon',
            'pagination-left': () => 'pagination-left',
            extra: () => 'extra'
          }
        ),
      {
        global: {
          plugins: [ElementPlus]
        }
      }
    )
    await nextTick()

    // slots
    expect(wrapper.find('.plus-pagination').text()).includes('pagination-left')
    expect(wrapper.find('.plus-table').text()).includes('column-settings-icon')
    expect(wrapper.find('.plus-table').text()).includes('density-icon')
    expect(wrapper.find('.plus-page').text()).includes('extra')
  })

  test('v-model:searchValues and searchChange event', async () => {
    const getList = async (_query: PageInfo & Record<string, unknown>) => {
      return { data: [], success: true, total: 0 }
    }

    const columns: PlusColumn[] = [
      {
        label: '名称',
        prop: 'name'
      },
      {
        label: '状态',
        prop: 'status',
        valueType: 'select',
        options: [
          { label: '未解决', value: '0' },
          { label: '已解决', value: '1' }
        ]
      }
    ]

    const searchValues = ref<FieldValues>({})
    const searchChangeHandler = vi.fn()

    const wrapper = mount(PlusPage, {
      props: {
        searchValues: searchValues.value,
        'onUpdate:searchValues': (val: FieldValues) => {
          searchValues.value = val
        },
        onSearchChange: searchChangeHandler,
        columns,
        request: getList,
        immediate: false
      },
      global: {
        plugins: [ElementPlus]
      }
    })
    await nextTick()

    expect(wrapper.find('.plus-search').exists()).toBe(true)

    // Test initial searchValues is empty
    expect(searchValues.value).toEqual({})

    // Test setSearchFieldsValue triggers update:searchValues
    const pageVm = wrapper.findComponent(PlusPage).vm as unknown as PlusPageExposed
    pageVm.setSearchFieldsValue({ name: 'test', status: '1' })
    await nextTick()
    expect(searchValues.value).toEqual({ name: 'test', status: '1' })

    wrapper.findComponent(PlusSearch).vm.$emit('change', { name: 'next' }, columns[0])
    await nextTick()
    expect(searchChangeHandler).toHaveBeenCalledWith({ name: 'next' }, columns[0])

    // Test clearSearchFieldsValue triggers update:searchValues
    pageVm.clearSearchFieldsValue()
    await nextTick()
    expect(searchValues.value).toEqual({})
  })

  test('searchValues prop initializes internal values', async () => {
    const getList = async (_query: PageInfo & Record<string, unknown>) => {
      return { data: [], success: true, total: 0 }
    }

    const columns: PlusColumn[] = [{ label: '名称', prop: 'name' }]

    const wrapper = mount(PlusPage, {
      props: {
        searchValues: { name: 'initial' },
        columns,
        request: getList,
        immediate: false
      },
      global: {
        plugins: [ElementPlus]
      }
    })
    await nextTick()

    const values = (wrapper.vm as unknown as PlusPageExposed).getSearchFieldsValue()
    expect(values).toEqual({ name: 'initial' })
  })
})
