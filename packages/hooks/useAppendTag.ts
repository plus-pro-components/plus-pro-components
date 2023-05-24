import { ref } from 'vue'

/**
 * 在页面head中添加标签
 * @param tag
 * @param attrs
 * @returns
 */

function useAppendTag(
  tag = 'script',
  attrs: Record<string, unknown>
): () => Promise<HTMLElement | unknown> {
  const element = ref<HTMLElement | any>(null)

  const getScript = function () {
    return new Promise((resolve, reject) => {
      element.value = document.createElement(tag)
      Object.keys(attrs).forEach(key => {
        element.value[key] = attrs[key]
      })
      document.head.appendChild(element.value)
      element.value.onload = () => {
        resolve(element)
      }
      element.value.onerror = (err: any) => {
        reject(err)
      }
    })
  }
  return getScript
}

export default useAppendTag
