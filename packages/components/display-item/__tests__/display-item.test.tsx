import { nextTick, h } from 'vue'
import ElementPlus, { ElEmpty, ElIcon } from 'element-plus'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import type { PlusColumn } from '@plus-pro-components/types'
import { formatDate } from '@plus-pro-components/components/utils'
import { Link, DocumentCopy, Select } from '@element-plus/icons-vue'

import DisplayItem from '../src/index.vue'

const columns: PlusColumn[] = [
  {
    label: '名称',
    width: 120,
    prop: 'name',
    valueType: 'copy',
    tooltip: '名称最多显示6个字符'
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
    prop: 'tag'
  },
  {
    label: 'money',
    width: 120,
    prop: 'money',
    valueType: 'money'
  },
  {
    label: '执行进度',
    width: 200,
    prop: 'progress',
    valueType: 'progress'
  },
  {
    label: '评分',
    width: 200,
    prop: 'rate',
    editable: true,
    valueType: 'rate'
  },
  {
    label: '是否显示',
    width: 100,
    prop: 'switch',
    editable: true,
    valueType: 'switch'
  },
  {
    label: '时间',
    prop: 'time',
    valueType: 'date-picker'
  },
  {
    label: 'img',
    prop: 'img',
    valueType: 'img'
  },
  {
    label: '链接',
    prop: 'place',
    valueType: 'link',
    linkText: 'link'
  },
  {
    label: 'code',
    prop: 'code',
    valueType: 'code'
  },
  {
    label: 'copy',
    prop: 'copy',
    valueType: 'copy'
  }
]
const row = {
  name: 'name',
  status: '1',
  tag: 'success',
  money: '100',
  progress: 30,
  rate: 4,
  switch: true,
  time: new Date(),
  code: `const data = 100`,
  copy: 'copy',
  img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
}

describe('display-item/index.vue', () => {
  test('render test', async () => {
    const wrapper = mount(
      () => (
        <div class="container">
          {columns.map(item => (
            <DisplayItem key={item.label} column={item} row={row} />
          ))}
        </div>
      ),
      {
        global: {
          plugins: [ElementPlus]
        }
      }
    )
    await nextTick()
    expect(wrapper.find('.plus-display-item__icon__copy').exists()).toBe(true)
    expect(wrapper.find('.container').text()).includes(row.name)
    expect(wrapper.find('.container').text()).includes(row.status)
    expect(wrapper.find('.container').text()).includes(row.tag)
    expect(wrapper.find('.container').text()).includes(formatDate(row.time))
    expect(wrapper.find('.container').text()).includes('￥' + row.money)
    expect(wrapper.find('.el-progress-bar__inner').attributes('style')).includes(row.progress + '%')
    expect(wrapper.find('.el-rate').attributes('aria-valuenow')).includes(row.rate)
    expect(wrapper.find('.el-link__inner').text()).includes('link')
    setTimeout(() => {
      expect(wrapper.find('.el-switch__input').attributes('aria-checked')).includes(row.switch)
    })
  })

  test('render display test', async () => {
    const label = 'label'
    const prop = 'input'
    const column: PlusColumn = {
      label: label,
      width: 120,
      prop: prop,
      render: () => {
        return h(
          'div',
          {
            style: {
              color: 'green'
            },
            class: 'custom-cell'
          },
          prop
        )
      }
    }

    const wrapper = mount(() => <DisplayItem column={column} row={{}} />, {
      global: {
        plugins: [ElementPlus],
        components: {
          DocumentCopy,
          Select
        }
      }
    })
    await nextTick()
    expect(wrapper.find('.custom-cell').text()).includes(prop)
    expect(wrapper.find('.custom-cell').attributes('style')).includes('green')
  })

  test('slots test', async () => {
    const label = 'label'
    const prop = 'input'
    const column: PlusColumn = {
      label: label,
      width: 120,
      prop: prop
    }
    const slots = {
      ['plus-cell-' + prop]: () => (
        <div style="color: green" class="custom-cell">
          {prop}
        </div>
      )
    }
    const wrapper = mount(() => <DisplayItem column={column} row={{}} v-slots={slots} />, {
      global: {
        plugins: [ElementPlus]
      }
    })
    await nextTick()
    expect(wrapper.find('.custom-cell').text()).includes(prop)
    expect(wrapper.find('.custom-cell').attributes('style')).includes('green')
  })
  test('fieldSlots test', async () => {
    const row = {
      img: '',
      link: '',
      progress: 30
    }
    const columns: PlusColumn[] = [
      {
        label: '图片',
        prop: 'img',
        valueType: 'img',
        fieldProps: {
          style: {
            width: '100%'
          }
        },
        fieldSlots: {
          error: () => h(ElEmpty, { width: '100%', description: '图片坏了' })
        }
      },
      {
        label: 'link',
        prop: 'link',
        valueType: 'link',
        fieldSlots: {
          default: () => h('div', null, '按钮'),
          icon: () => h(ElIcon, null, () => h(Link))
        }
      },
      {
        label: 'progress',
        prop: 'progress',
        valueType: 'progress',
        fieldSlots: {
          default: () => h('div', null, '默认')
        }
      }
    ]
    const wrapper = mount(() => {
      return (
        <div class="plus-example-field-slots">
          {columns.map(item => (
            <DisplayItem column={item} row={row} />
          ))}
        </div>
      )
    })
    await nextTick()
    expect(wrapper.find('.plus-example-field-slots .el-image').exists()).toBe(true)
    expect(wrapper.find('.plus-example-field-slots').text()).includes('按钮')
    expect(wrapper.find('.plus-example-field-slots').text()).includes('默认')
  })
})
