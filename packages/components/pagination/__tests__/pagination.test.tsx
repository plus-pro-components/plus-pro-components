import { nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import ElementPlus from 'element-plus'
import { describe, expect, test } from 'vitest'
import Pagination from '../src/index.vue'

describe('pagination/index.vue', () => {
  test('render test', async () => {
    const pageInfo = ref()
    const wrapper = mount(() => <Pagination total={100} modelValue={pageInfo.value}></Pagination>, {
      global: {
        plugins: [ElementPlus]
      }
    })
    await nextTick()
    expect(wrapper.find('.el-pagination').text()).includes('Total')
  })

  test('props test', async () => {
    const total = 100
    const pageInfo = ref()
    const wrapper = mount(
      () => <Pagination total={total} modelValue={pageInfo.value}></Pagination>,
      {
        global: {
          plugins: [ElementPlus]
        }
      }
    )
    await nextTick()
    expect(wrapper.find('.el-pagination__total').text()).includes(total)
  })

  test('slots test', async () => {
    const total = 100
    const pageInfo = ref()
    const wrapper = mount(
      () => (
        <Pagination
          total={total}
          modelValue={pageInfo.value}
          v-slots={{
            'pagination-left': () => 'pagination-left'
          }}
        ></Pagination>
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
        <Pagination
          total={total}
          align="left"
          modelValue={pageInfo.value}
          v-slots={{
            'pagination-right': () => 'pagination-right'
          }}
        ></Pagination>
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
