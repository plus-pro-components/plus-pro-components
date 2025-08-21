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

  test('center align with both slots test', async () => {
    const total = 100
    const pageInfo = ref()
    const centerWrapper = mount(
      () => (
        <Pagination
          total={total}
          align="center"
          modelValue={pageInfo.value}
          v-slots={{
            'pagination-left': () => 'left-content',
            'pagination-right': () => 'right-content'
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
    expect(centerWrapper.find('.plus-pagination').text()).includes('left-content')
    expect(centerWrapper.find('.plus-pagination').text()).includes('right-content')
    expect(centerWrapper.find('.plus-pagination').classes()).toContain('plus-pagination--center')
  })

  test('align test', async () => {
    const total = 100
    const pageInfo = ref()

    // Test center align
    const centerWrapper = mount(
      () => <Pagination total={total} align="center" modelValue={pageInfo.value}></Pagination>,
      {
        global: {
          plugins: [ElementPlus]
        }
      }
    )
    await nextTick()
    expect(centerWrapper.find('.plus-pagination').classes()).toContain('plus-pagination--center')

    // Test left align
    const leftWrapper = mount(
      () => <Pagination total={total} align="left" modelValue={pageInfo.value}></Pagination>,
      {
        global: {
          plugins: [ElementPlus]
        }
      }
    )
    await nextTick()
    expect(leftWrapper.find('.plus-pagination').classes()).toContain('plus-pagination--left')

    // Test right align (default)
    const rightWrapper = mount(
      () => <Pagination total={total} align="right" modelValue={pageInfo.value}></Pagination>,
      {
        global: {
          plugins: [ElementPlus]
        }
      }
    )
    await nextTick()
    expect(rightWrapper.find('.plus-pagination').classes()).toContain('plus-pagination--right')
  })
})
