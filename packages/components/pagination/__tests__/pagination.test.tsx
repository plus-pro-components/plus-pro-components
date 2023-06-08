import { nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import ElementPlus from 'element-plus'
import { describe, expect, test } from 'vitest'
import Pagination from '../src/index.vue'

describe('pagination/index.vue', () => {
  test('render test', async () => {
    const pageInfo = ref()
    const wrapper = mount(
      () => <Pagination show total={100} modelValue={pageInfo.value}></Pagination>,
      {
        global: {
          plugins: [ElementPlus]
        }
      }
    )
    await nextTick()
    expect(wrapper.find('.el-pagination').text()).includes('Total')
  })

  test('total test', async () => {
    const total = 100
    const pageInfo = ref()
    const wrapper = mount(
      () => <Pagination total={total} show modelValue={pageInfo.value}></Pagination>,
      {
        global: {
          plugins: [ElementPlus]
        }
      }
    )
    await nextTick()
    expect(wrapper.find('.el-pagination__total').text()).includes(total)
  })
})
