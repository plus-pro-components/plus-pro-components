import { nextTick, h } from 'vue'
import { mount } from '@vue/test-utils'
import ElementPlus from 'element-plus'
import { describe, expect, test } from 'vitest'
import type { PlusColumn, FieldValueType } from '@plus-pro-components/types'
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
})
