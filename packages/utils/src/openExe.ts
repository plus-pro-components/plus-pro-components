/**
 * @description 打开电脑本地软件
 * @param protocol  本地软件协议， 如 vscode 的协议 `vscode://`
 * @param event  点击按钮事件， `el-button` 或者原生 `button`
 * @param timeout 默认`1000`ms，没响应则认为打开失败
 */
export const openExe = (protocol: string, event: Event, timeout = 1000): Promise<FocusEvent> => {
  window.location.href = protocol
  const target = event.target as EventTarget & {
    localName: string
    parentElement: HTMLButtonElement
    onblur: (e: FocusEvent) => void
  }
  return new Promise((resolve, reject) => {
    if (target) {
      const element =
        target.localName === 'button'
          ? target
          : target.localName === 'span'
          ? target.parentElement
          : document
      // 防止重复注册
      if (element.onblur === null) {
        // 1秒没有响应 则认为软件打开失败
        const timer = setTimeout(() => {
          element.onblur = null
          reject('error')
        }, timeout)

        element.onblur = (focusEvent: FocusEvent) => {
          // 判断焦点失去是否是按钮  防止点击界面其他地方导致失去焦点
          if (element === document.activeElement) {
            clearTimeout(timer)
            element.onblur = null
            resolve(focusEvent)
          }
        }
      }
    } else {
      reject('error')
    }
  })
}
