import type { Ref } from 'vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'

/**
 * 判断是否按住某键  默认判断shift按键
 * @param key `Shift`
 * @returns
 */
export default function useIsEnterKeyboard(key = 'Shift'): { isEnterKeyboard: Ref<boolean> } {
  const isEnterKeyboard = ref(false)
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === key && event.shiftKey) {
      // 判断是否按住key键
      isEnterKeyboard.value = true
    }
  }
  const handleKeyUp = () => {
    // 按键抬起置为false
    isEnterKeyboard.value = false
  }
  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeyDown)
    window.removeEventListener('keyup', handleKeyUp)
  })
  return { isEnterKeyboard }
}
