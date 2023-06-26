import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import ElementPlus from 'element-plus'
import { describe, expect, test } from 'vitest'
import PlusTable from '../src/index.vue'
import type { TableConfigRow } from '../src/type'

describe('table/index.vue', () => {
  test('render test', async () => {
    const tableConfig: TableConfigRow[] = [
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
        valueType: 'switch',
        attrs: {
          activeColor: '#13ce66',
          inactiveColor: '#ff4949'
        }
      },
      {
        label: '时间',
        width: 190,
        prop: 'time',
        valueType: 'date'
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
      () => <PlusTable config={tableConfig} table-data={tableData}></PlusTable>,
      {
        global: {
          plugins: [ElementPlus]
        }
      }
    )
    await nextTick()
    expect(wrapper.find('.el-table__header').text()).includes('')
  })
})
