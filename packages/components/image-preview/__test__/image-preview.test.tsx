import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import ElementPlus from 'element-plus'
import { describe, expect, test } from 'vitest'
import PlusDialog from '@plus-pro-components/components/dialog'
import ImagePreview from '../src/index.vue'
import type { PlusImagePreviewRow } from '../src/type'

describe('image-preview/index.vue', () => {
  test('render test', async () => {
    const url = 'https://web-1252186245.cos.ap-beijing.myqcloud.com/h5/static/image/bank-card.png'
    const srcList: PlusImagePreviewRow[] = [
      {
        url
      }
    ]
    const wrapper = mount(() => <ImagePreview srcList={srcList} modelValue={true} />, {
      global: {
        plugins: [ElementPlus],
        components: {
          PlusDialog
        }
      }
    })
    await nextTick()
    expect(wrapper.find('.plus-image-preview-body__image').attributes('src')).toBe(url)
  })
})
