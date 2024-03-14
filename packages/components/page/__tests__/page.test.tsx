import { describe, expect, test } from 'vitest'
import type { PlusColumn, PageInfo } from '@plus-pro-components/types'
import ElementPlus from 'element-plus'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { useTable } from '@plus-pro-components/hooks'
import PlusPage from '../src/index.vue'

describe('page/index.vue', () => {
  test('render test', async () => {
    const getList = async (
      query: PageInfo & {
        status?: string
        name?: string
      }
    ) => {
      const { page = 1, pageSize = 20, status, name } = query || {}
      const total = 1000
      const List = [...new Array(total)].map((item, index) => {
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

    const wrapper = mount(() => <PlusPage columns={tableConfig} request={getList} />, {
      global: {
        plugins: [ElementPlus]
      }
    })
    await nextTick()
    expect(wrapper.find('.plus-search').exists()).toBe(true)
    expect(wrapper.find('.plus-table').exists()).toBe(true)
    expect(wrapper.find('.plus-pagination').exists()).toBe(true)

    const wrapper1 = mount(
      () => <PlusPage search={false} columns={tableConfig} request={getList} />,
      {
        global: {
          plugins: [ElementPlus]
        }
      }
    )
    await nextTick()
    expect(wrapper1.find('.plus-search').exists()).toBe(false)
    expect(wrapper1.find('.plus-table').exists()).toBe(true)
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
      const List = [...new Array(total)].map((item, index) => {
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
      () => (
        <PlusPage
          columns={columns}
          request={getList}
          table={{
            pagination: { total: 3, modelValue: pageInfo.value },
            actionBar: { buttons: buttons.value, showNumber: 3 },
            dragSortable: {},
            hasIndexColumn: true
          }}
          v-slots={{
            'action-bar-more-icon': () => 'action-bar-more-icon',
            'tooltip-icon': () => 'tooltip-icon',
            'drag-sort-icon': () => 'drag-sort-icon',
            'column-settings-icon': () => 'column-settings-icon',
            'density-icon': () => 'density-icon',
            'pagination-left': () => 'pagination-left'
          }}
        />
      ),
      {
        global: {
          plugins: [ElementPlus]
        }
      }
    )
    await nextTick()
    expect(wrapper.find('.plus-pagination').text()).includes('pagination-left')
    expect(wrapper.find('.plus-table').text()).includes('column-settings-icon')
    expect(wrapper.find('.plus-table').text()).includes('density-icon')
  })
})
