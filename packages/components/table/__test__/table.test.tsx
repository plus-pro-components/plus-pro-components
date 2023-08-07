import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import ElementPlus from 'element-plus'
import { describe, expect, test } from 'vitest'
import type { PlusColumn } from '@plus-pro-components/types'
import PlusTable from '../src/index.vue'

describe('table/index.vue', () => {
  test('render test', async () => {
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
    expect(wrapper.find('.plus-table-toolbar__title').text()).includes('Table')
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
    expect(wrapper.find('.plus-table-toolbar__title').text()).include('Table')
    expect(wrapper.find('.plus-pagination').exists()).toBe(false)
    expect(wrapper.find('.plus-table-action-bar').exists()).toBe(false)
    expect(wrapper.find('.el-tag').exists()).toBe(false)
  })
})
