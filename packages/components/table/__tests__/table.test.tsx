import { nextTick, h } from 'vue'
import { mount } from '@vue/test-utils'
import ElementPlus from 'element-plus'
import { describe, expect, test } from 'vitest'
import type { PlusColumn, FieldValueType } from '@plus-pro-components/types'
import { useTable } from '@plus-pro-components/hooks'
import PlusTable from '../src/index.vue'

describe('table/index.vue', () => {
  test('render test', async () => {
    const columns: PlusColumn[] = [
      {
        label: '评分',
        width: 200,
        prop: 'rate',
        valueType: 'rate'
      },
      {
        label: '开关',
        width: 100,
        prop: 'switch',
        valueType: 'switch'
      },
      {
        label: '时间',
        width: 190,
        prop: 'time',
        valueType: 'date-picker'
      }
    ]
    const tableData = [...new Array(100)].map((item, index) => {
      return {
        index,
        name: index === 0 ? 'name'.repeat(20) : index + 'name',
        rate: index > 3 ? 2 : 3.5,
        switch: index > 3 ? true : false,
        time: new Date()
      }
    })
    const wrapper = mount(() => <PlusTable columns={columns} table-data={tableData}></PlusTable>, {
      global: {
        plugins: [ElementPlus]
      }
    })
    await nextTick()
    expect(wrapper.find('.plus-table-title-bar').exists()).toBe(true)
  })

  test('visible test', async () => {
    const tableConfig: PlusColumn[] = [
      {
        label: '评分',
        width: 200,
        prop: 'rate',
        valueType: 'rate'
      },
      {
        label: '开关',
        width: 100,
        prop: 'switch',
        valueType: 'switch'
      },
      {
        label: '时间',
        width: 190,
        prop: 'time',
        valueType: 'date-picker'
      }
    ]
    const tableData = [...new Array(100)].map((item, index) => {
      return {
        index,
        name: index === 0 ? 'name'.repeat(20) : index + 'name',
        rate: index > 3 ? 2 : 3.5,
        switch: index > 3 ? true : false,
        time: new Date()
      }
    })
    const wrapper = mount(
      () => <PlusTable columns={tableConfig} table-data={tableData}></PlusTable>,
      {
        global: {
          plugins: [ElementPlus]
        }
      }
    )
    await nextTick()
    expect(wrapper.find('.plus-table').exists()).toBe(true)
    expect(wrapper.find('.plus-pagination').exists()).toBe(false)
    expect(wrapper.find('.plus-table-action-bar').exists()).toBe(false)
    expect(wrapper.find('.el-tag').exists()).toBe(false)
  })

  test('render and renderHeader test', async () => {
    const render = (value: FieldValueType) =>
      h(
        'div' as any,
        {
          style: {
            color: 'red'
          },
          class: 'custom-cell'
        },
        value as string
      )

    const renderHeader = (label: string) =>
      h(
        'div',
        {
          style: {
            color: 'green'
          },
          class: 'custom-header'
        },
        label
      )

    const columns: PlusColumn[] = [
      {
        label: '评分',
        width: 200,
        prop: 'rate',
        valueType: 'rate'
      },
      {
        label: 'label',
        prop: 'name',
        width: 120,
        render,
        renderHeader
      }
    ]

    const tableData = [...new Array(5)].map((item, index) => {
      return {
        index,
        name: index === 0 ? 'name'.repeat(20) : index + 'name',
        rate: index > 3 ? 2 : 3.5,
        switch: index > 3 ? true : false,
        time: new Date()
      }
    })

    const wrapper = mount(() => <PlusTable columns={columns} tableData={tableData} />, {
      global: {
        plugins: [ElementPlus]
      }
    })
    await nextTick()
    setTimeout(() => {
      expect(wrapper.find('.custom-cell').exists()).toBe(true)
      expect(wrapper.find('.custom-cell').attributes('style')).includes('red')
      expect(wrapper.find('.custom-header').exists()).toBe(true)
      expect(wrapper.find('.custom-header').attributes('style')).includes('green')
    })
  })

  test('plus-header-* plus-cell-*  slots test', async () => {
    const label = 'label'
    const prop = 'input'

    const columns: PlusColumn[] = [
      {
        label: label,
        width: 120,
        prop: prop
      }
    ]

    const tableData = [...new Array(5)].map((item, index) => {
      return {
        index,
        name: index === 0 ? 'name'.repeat(20) : index + 'name',
        rate: index > 3 ? 2 : 3.5,
        switch: index > 3 ? true : false,
        time: new Date()
      }
    })

    const slots = {
      ['plus-header-' + prop]: ({ label }: { label: string }) => (
        <div style="color: red" class="custom-header">
          {label}
        </div>
      ),
      ['plus-cell-' + prop]: () => (
        <div style="color: green" class="custom-cell">
          {prop}
        </div>
      )
    }
    const wrapper = mount(
      () => <PlusTable columns={columns} tableData={tableData} v-slots={slots} />,
      {
        global: {
          plugins: [ElementPlus]
        }
      }
    )
    await nextTick()

    setTimeout(() => {
      expect(wrapper.find('.plus-table-column__header').text()).includes(label)
      expect(
        wrapper.find('.plus-table-column__header .custom-header').attributes('style')
      ).includes('red')
      expect(wrapper.find('.el-table__body .cell').text()).includes(prop)
      expect(wrapper.find('.el-table__body .cell .custom-cell').attributes('style')).includes(
        'green'
      )
    })
  })
  test('pagination slots test', async () => {
    const label = 'label'
    const prop = 'input'

    const columns: PlusColumn[] = [
      {
        label: label,
        width: 120,
        prop: prop
      }
    ]

    const tableData = [...new Array(5)].map((item, index) => {
      return {
        index,
        name: index === 0 ? 'name'.repeat(20) : index + 'name',
        rate: index > 3 ? 2 : 3.5,
        switch: index > 3 ? true : false,
        time: new Date()
      }
    })

    const wrapper = mount(
      () => (
        <PlusTable
          columns={columns}
          tableData={tableData}
          pagination={{ total: 100 }}
          v-slots={{
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

    const wrapper1 = mount(
      () => (
        <PlusTable
          columns={columns}
          tableData={tableData}
          pagination={{ total: 100, align: 'left' }}
          v-slots={{
            'pagination-right': () => 'pagination-right'
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
    expect(wrapper1.find('.plus-pagination').text()).includes('pagination-right')
  })
  test('icon slots test', async () => {
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

    const tableData = [...new Array(3)].map((item, index) => {
      return {
        index,
        id: index,
        name: index === 0 ? 'name'.repeat(20) : index + 'name',
        status: String(index % 3),
        tag: index === 1 ? 'success' : index === 2 ? 'warning' : index === 3 ? 'info' : 'danger',
        progress: Math.ceil(Math.random() * index * 10),
        rate: index > 3 ? 2 : 3.5,
        switch: index % 2 === 0 ? true : false,
        img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        time: new Date(),
        code: `
            const getData = async params => {
              const data = await getData(params)
              return { list: data.data, ...data }
            }`,
        custom: 'custom' + index,
        level: {
          state: {
            value: 'level' + index
          }
        }
      }
    })

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
        <PlusTable
          drag-sortable
          has-index-column
          columns={columns}
          tableData={tableData}
          pagination={{ total: 3, modelValue: pageInfo.value }}
          action-bar={{ buttons: buttons.value, showNumber: 3 }}
          v-slots={{
            'action-bar-more-icon': () => 'action-bar-more-icon',
            'tooltip-icon': () => 'tooltip-icon',
            'drag-sort-icon': () => 'drag-sort-icon',
            'column-settings-icon': () => 'column-settings-icon',
            'density-icon': () => 'density-icon'
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

    setTimeout(() => {
      expect(wrapper.find('.plus-table').text()).includes('action-bar-more-icon')
      expect(wrapper.find('.plus-table').text()).includes('tooltip-icon')
      expect(wrapper.find('.plus-table').text()).includes('drag-sort-icon')
      expect(wrapper.find('.plus-table').text()).includes('column-settings-icon')
      expect(wrapper.find('.plus-table').text()).includes('density-icon')
    })
  })
})
