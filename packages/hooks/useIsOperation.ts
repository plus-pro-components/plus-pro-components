import type { Ref } from 'vue'
import { reactive, computed, toRef, onMounted, onBeforeUnmount } from 'vue'

interface IState {
  /**
   * 用户未操作页面的时间
   */
  time: number
  /**
   * 定时器
   */
  timer: any
  /**
   * 是否在指定时间内操作页面
   */
  isOperation: boolean

  /**
   * 事件列表
   */
  handlerList: string[]
}

type returnType = {
  /**
   * 是否在指定时间内操作页面
   */
  isOperation: Ref<boolean>
}

/**
 *  判断用户是否在操作页面
 * @param duration 秒 默认 10, 最小1
 * @return `{ isOperation: Ref<boolean> }`
 */
function useIsOperation(duration = 10): returnType {
  const totalDuration = computed(() => (duration < 1 ? 1 : duration))
  const state = reactive<IState>({
    time: 0,
    timer: null,
    isOperation: false,
    handlerList: ['click', 'dblclick', 'contextmenu', 'keydown', 'keyup', 'mousemove', 'mousewheel']
  })
  // 设置时间
  const setTime = () => {
    if (!state.isOperation) {
      state.time += 1
    }
    if (state.time === totalDuration.value) {
      state.time = 0
      state.isOperation = false
    }
  }
  // 事件回调
  const handler = () => {
    state.timer && clearInterval(state.timer)
    state.time = 0
    state.isOperation = true
    state.timer = setInterval(setTime, 1000)
  }
  //  添加用户操作页面事件
  const addEventListener = () => {
    const doc = document.documentElement
    state.handlerList.forEach(item => {
      doc.addEventListener(item, handler)
    })
  }
  //  移除用户操作页面事件
  const removeEventListener = () => {
    const doc = document.documentElement
    state.handlerList.forEach(item => {
      doc.removeEventListener(item, handler)
    })
  }
  onMounted(() => {
    // 设置事件
    addEventListener()
  })
  onBeforeUnmount(() => {
    // 移除事件
    removeEventListener()
  })

  return { isOperation: toRef(state, 'isOperation') }
}

export default useIsOperation
