import type { Ref } from 'vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'

/**
 * 判断是否是点击元素外面
 * @param elementRef
 * @returns
 */
const useClickOutside = (
  elementRef: Ref<ElementRefType>
): { isOutSide: Ref<boolean>; setIsOutSide: (value: boolean) => void } => {
  const isOutSide = ref(false)
  const callback = (e: MouseEvent) => {
    if (elementRef.value) {
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isOutSide.value = false
      } else {
        isOutSide.value = true
      }
    }
  }
  const setIsOutSide = (value: boolean): void => {
    isOutSide.value = value
  }
  onMounted(() => {
    document.addEventListener('click', callback)
  })
  onBeforeUnmount(() => {
    document.removeEventListener('click', callback)
  })
  return { isOutSide, setIsOutSide }
}

export default useClickOutside
