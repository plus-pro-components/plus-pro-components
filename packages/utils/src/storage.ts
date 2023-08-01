import storage from 'good-storage'
import CryptoJS from 'crypto-js'

/**
 * AES加密
 * @param key 加密的key
 * @param data 需要加密的字符串
 * @returns encrypted 加密的字符串
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
 * @param key 解密的key 需要和加密的key 一致
 * @param encrypted 加密后字符串
 * @returns data  解密后的字符串
 */
export function decrypt(
  key: string | CryptoJS.lib.WordArray,
  encrypted: string | CryptoJS.lib.CipherParams
): string {
  const decrypted = CryptoJS.AES.decrypt(encrypted, key)
  const data = decrypted.toString(CryptoJS.enc.Utf8)
  return data
}

/**
 * 获取storage
 * @returns storage
 */
export function getStorage(key: string): string {
  return storage.get(key)
}
/**
 * 设置storage
 * @returns storage
 */
export function setStorage(key: string, data: any): string {
  return storage.set(key, data)
}

/**
 * 移除storage
 */
export function removeStorage(key: string): void {
  storage.remove(key)
}

/**
 * 获取token  带AES解密
 * @returns token
 */
export function getToken(key: string): string {
  const data = storage.get(key)
  const res = data ? decrypt(key, data) : ''
  return res
}
/**
 * 设置token  带AES加密
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
