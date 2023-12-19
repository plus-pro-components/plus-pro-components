import cookie from 'js-cookie'
import { ElMessageBox } from 'element-plus'

const isJumpKey = 'Plus-Pro-Components-Jump-Key'

/**
 * 文档地址自动跳转
 */
export const jump = () => {
  // SSR 兼容
  if (!typeof navigator || !typeof location) return

  const isZh = navigator.language === 'zh-CN'
  const isGithub = location.host === 'plus-pro-components.github.io'

  if (isZh && isGithub && !cookie.get(isJumpKey)) {
    ElMessageBox.alert('检测到你的访问地址是国内，是否跳转到国内镜像文档？', {
      confirmButtonText: '是',
      callback: (action: string) => {
        if (action === 'cancel') {
          cookie.set(isJumpKey, '1')
        } else {
          location.href = 'https://plus-pro-components.com/'
        }
      }
    })
  }
}
