import Cookies from 'js-cookie'

/**
 * 获取 cookie
 * @returns
 */
export function getCookie(key: string): string | undefined {
  return Cookies.get(key)
}

/**
 * 设置 cookie
 * @returns
 */
export function setCookie(key: string, data: any): string | undefined {
  return Cookies.set(key, data)
}

/**
 * 移除 cookie
 */
export function removeLanguage(key: string): void {
  Cookies.remove(key)
}
