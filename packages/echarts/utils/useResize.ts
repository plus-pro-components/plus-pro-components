import { reactive, onMounted, onBeforeUnmount } from 'vue'
/**
 * 防抖
 * @param func
 * @param delay
 * @returns {Function}
 */
// eslint-disable-next-line @typescript-eslint/ban-types
function debounce(func: Function, delay = 16): any {
  let timer: any

  return function selfFunc(...args: any[]) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(selfFunc, args)
    }, delay)
  }
}

type ResizeCallback = (this: Window, ev: UIEvent) => any

type UseResizeState = {
  resizeHandler: ResizeCallback | null
}
/**
 * 监听窗口监听
 * @param listener
 * @param delay
 */
const useResize = (listener?: (e?: Event) => void, delay = 16): void => {
  const state = reactive<UseResizeState>({ resizeHandler: null })
  // 添加窗口监听
  const addListener = () => {
    state.resizeHandler = debounce((e: Event) => {
      listener && listener(e)
    }, delay)
    window.addEventListener('resize', state.resizeHandler as ResizeCallback)
  }
  // 销毁窗口监听
  const removeListener = () => {
    window.removeEventListener('resize', state.resizeHandler as ResizeCallback)
    state.resizeHandler = null
  }
  onMounted(() => {
    listener && listener()
    addListener()
  })
  onBeforeUnmount(() => {
    removeListener()
  })
}

export default useResize
