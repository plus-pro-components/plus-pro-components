import { describe, expect, test } from 'vitest'
import { nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import ElementPlus from 'element-plus'
import type { PlusColumn } from '@plus-pro-components/types'
import Descriptions from '../src/index.vue'

const TestServe = {
  getList: async () => {
    const index = Math.random() * 10
    const data = {
      index,
      id: index,
      title: '序号' + (index + 1),
      name: 'name'.repeat(10),
      status: '1',
      tag: index === 1 ? 'success' : 'danger',
      progress: 30,
      rate: index > 3 ? 2 : 3.5,
      switch: index > 3 ? true : false,
      indexColStyle:
        index < 3
          ? {
              backgroundColor: '#314659'
            }
          : {
              backgroundColor: '#979797'
            },
      time: new Date(),
      code: `
  const getData = async params => {
    const data = await getData(params)
    return { list: data.data, ...data }
  }`
    }
    return {
      data
    }
  }
}

describe('descriptions/index.vue', () => {
  test('render test', async () => {
    const columns: PlusColumn[] = [
      {
        label: '名称',
        width: 120,
        prop: 'name',
        valueType: 'copy'
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
        valueType: 'tag'
      },
      {
        label: '执行进度',
        width: 200,
        prop: 'progress',
        valueType: 'progress'
      },
      {
        label: '代码块',
        width: 250,
        prop: 'code',
        valueType: 'code'
      },
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
        editable: true
      },
      {
        label: '时间',
        width: 190,
        prop: 'time',
        valueType: 'date-picker'
      }
    ]
    const labels = columns.map(item => item.label)

    const descriptionsData = ref<any>({})
    const wrapper = mount(() => <Descriptions columns={columns} data={descriptionsData.value} />, {
      global: {
        plugins: [ElementPlus]
      }
    })

    const getList = async () => {
      try {
        const { data } = await TestServe.getList()
        descriptionsData.value = data || {}
      } catch (error) {}
    }
    await getList()
    await nextTick()
    expect(wrapper.find('.plus-description').exists()).toBe(true)
    expect(wrapper.find('.plus-description__name').exists()).toBe(true)
    expect(wrapper.find('.plus-description__label').exists()).toBe(true)
    expect(wrapper.find('.plus-description__label').text()).toContain(labels[0])
    expect(wrapper.find('.plus-description__name').text()).toContain('name'.repeat(10))
    expect(wrapper.find('.el-switch').exists()).toBe(true)
    expect(wrapper.find('.el-tag').exists()).toBe(true)
    expect(wrapper.find('.el-progress').exists()).toBe(true)
    expect(wrapper.find('.plus-display-item__pre').exists()).toBe(true)
  })

  test('props test', async () => {
    const title = 'title'
    const wrapper = mount(() => <Descriptions title={title} data={{}} />, {
      global: {
        plugins: [ElementPlus]
      }
    })
    await nextTick()
    expect(wrapper.find('.el-descriptions__title').text()).toContain(title)
  })

  test('slots test', async () => {
    const columns: PlusColumn[] = [
      {
        label: '名称',
        width: 120,
        prop: 'name'
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
      }
    ]
    const title = 'title'
    const data = {
      index: 0,
      status: '1',
      name: '小明'
    }
    const slot = {
      ['plus-desc-name']: ({ value }: { value: string }) => '自定义' + value,
      ['plus-desc-label-name']: ({ label }: { label: string }) => '自定义label' + label,
      ['plus-desc-status']: ({ value }: { value: string }) => '自定义' + value,
      ['plus-desc-label-status']: ({ label }: { label: string }) => '自定义label' + label
    }
    const wrapper = mount(
      () => <Descriptions title={title} columns={columns} data={data} v-slots={slot} />,
      {
        global: {
          plugins: [ElementPlus]
        }
      }
    )
    await nextTick()
    expect(wrapper.find('.plus-description').text()).toContain('自定义小明')
    expect(wrapper.find('.plus-description').text()).toContain('自定义label名称')
    expect(wrapper.find('.plus-description').text()).toContain('自定义1')
    expect(wrapper.find('.plus-description').text()).toContain('自定义label状态')
  })
})
