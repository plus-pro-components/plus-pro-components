/**
 * 是否是ios
 * @returns {boolean}
 */
export function isIOS(): boolean {
  const isIphone = navigator.userAgent.includes('iPhone')
  const isIpad = navigator.userAgent.includes('iPad')
  return isIphone || isIpad
}
