import storage from 'good-storage'
import CryptoJS from 'crypto-js'

/**
 * AES加密
 * @param key
 * @param data
 * @returns
 */
export function encrypt(
  key: string | CryptoJS.lib.WordArray,
  data: string | CryptoJS.lib.WordArray
): string {
  const encrypted = CryptoJS.AES.encrypt(data, key).toString()
  return encrypted
}

/**
 * AES 解密
 * @param key
 * @param encrypted
 * @returns
 */
export function decrypt(
  key: string | CryptoJS.lib.WordArray,
  encrypted: string | CryptoJS.lib.CipherParams
): string {
  const decrypted = CryptoJS.AES.decrypt(encrypted, key)
  const res = decrypted.toString(CryptoJS.enc.Utf8)
  return res
}

/**
 * 获取token
 * @returns token
 */
export function getToken(key: string): string {
  const data = storage.get(key)
  const res = data ? decrypt(key, data) : ''
  return res
}
/**
 * 设置token
 * @returns token
 */
export function setToken(key: string, token: string): string {
  const data = encrypt(key, token)
  return storage.set(key, data)
}
/**
 * 移除token
 */
export function removeToken(key: string): void {
  storage.remove(key)
}
