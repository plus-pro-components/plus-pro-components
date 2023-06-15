import type { QUnitType, OpUnitType, ConfigType } from 'dayjs'
import dayjs from 'dayjs'
import numeral from 'numeral'
import accounting from 'accounting'

/**
 * 格式化时间到秒
 * @param  {number | string | Date} date
 * @param  {string} format
 * @returns YYYY-MM-DD HH:mm:ss
 */
export function dateFormat(date: ConfigType, format = 'YYYY-MM-DD HH:mm:ss'): string {
  if (!date) return ''
  return dayjs(date).format(format)
}

/**
 * 格式化时间到天
 * @param  {number | string | Date} date
 * @returns YYYY-MM-DD
 */
export const dateFormatDay = (date: ConfigType): string => dateFormat(date, 'YYYY-MM-DD')

/**
 * 格式化时间到分钟
 * @param  {number | string | Date} date
 * @returns YYYY-MM-DD HH:mm
 */
export const dateFormatMinute = (date: ConfigType): string => dateFormat(date, 'YYYY-MM-DD HH_mm')

/**
 * 格式化金钱  $12,345,678.00
 * @param val
 * @returns
 */
export function formatToCurrency(val: string | number, format = '￥'): string {
  return accounting.formatMoney(val, format)
}

/**
 * 格式化数字
 * @param {number} number
 * @param {string}  format
 * @returns {*}
 */
export function numberFormat(number: number | string, format = '0.0000'): string {
  return numeral(number).format(format)
}

/**
 * 判断url
 * @param  {string} path
 * @returns {boolean}
 */
export function isUrl(path: string): boolean {
  /* eslint no-useless-escape:0 */
  const reg =
    /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
  return reg.test(path)
}

/**
 * 防抖
 * @param func
 * @param delay
 * @returns {Function}
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function debounce(func: Function, delay = 16): any {
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

/**
 * 节流
 * @param func
 * @param gapTime
 * @returns {Function}
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function throttle(func: Function, gapTime: number): any {
  let _lastTime = 0

  return function () {
    const _nowTime = +new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      func()
      _lastTime = _nowTime
    }
  }
}

/**
 * 是否拥有类名
 * @param el
 * @param className
 * @returns {boolean}
 */
export function hasClass(el: HTMLElement, className: string): boolean {
  const reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

/**
 * 添加类名
 * @param el
 * @param className
 */
export function addClass(el: HTMLElement, className: string): void {
  if (hasClass(el, className)) {
    return
  }
  const newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

/**
 * 移除类名
 * @param el
 * @param className
 */
export function removeClass(el: HTMLElement, className: string): void {
  if (!hasClass(el, className)) {
    return
  }

  const reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g')
  el.className = el.className.replace(reg, ' ')
}

/**
 * 获取值
 * @param el
 * @param name
 * @param val
 * @returns {*}
 */
export function getData(el: HTMLElement, name: string, val: string): string | null | void {
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}

/**
 * @desc 获取距离
 * @param el
 * @returns {{top: number, left: number, width: number, height: number}}
 */
export function getRect(el: HTMLElement): {
  top: number
  left: number
  width: number
  height: number
} {
  if (el instanceof window.SVGElement) {
    const rect = el.getBoundingClientRect()
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    }
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    }
  }
}

/**
 * 是否是空对象
 * @param object
 * @returns {boolean}
 */
export function isEmptyObject(object: Record<string, unknown>): boolean {
  return Object.keys(object).length === 0
}

/**
 * 是否是ios
 * @returns {boolean}
 */
export function isIOS(): boolean {
  const isIphone = navigator.userAgent.includes('iPhone')
  const isIpad = navigator.userAgent.includes('iPad')
  return isIphone || isIpad
}

/**
 * 获取两个 Dayjs 对象的时间差，默认秒。
 * @param date1
 * @param date2
 * @param format
 * @returns {*}
 */
export function dateDiff(
  date1: string | number | Date,
  date2 = dayjs(),
  format: QUnitType | OpUnitType = 'second'
): number | string | undefined {
  if (!date1) return
  return dayjs(date1).diff(date2, format)
}

/**
 * @desc 生成大写字母
 * @returns
 */
export function generateBig(): string[] {
  const str: string[] = []
  for (let i = 65; i < 91; i++) {
    str.push(String.fromCharCode(i))
  }
  return str
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const deepClone = <T extends object>(obj: T): T => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (obj === null) return null
  const clone = Object.assign({}, obj)
  Object.keys(clone).forEach(
    key => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
  )
  if (Array.isArray(obj)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    clone.length = obj.length
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return Array.from(clone)
  }
  return clone
}

/**
 * @desc http  to https
 * @param str
 * @returns
 */
export function http2https(str: string): string {
  if (!str || typeof str !== 'string') return str
  if (str.startsWith('https')) return str
  return str.replace('http', 'https')
}

/**
 * @desc 获取时间差
 * @param date
 * @returns
 */
export function getDiffByDate(date: number): string {
  if (date >= 60 * 60 * 24) {
    return `${parseInt(String(date / (60 * 60 * 24)))}天前`
  }
  if (date >= 60 * 60) {
    return `${parseInt(String(date / (60 * 60)))}小时前`
  }
  if (date >= 60) {
    return `${parseInt(String(date / 60))}分钟前`
  }
  return ``
}

/**
 * @desc 校验链接地址
 * @param url
 * @returns
 */
export function validateRegexUrl(url: string): boolean {
  const regex = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  )
  return regex.test(url)
}

/**
 * @desc 检验电话
 * @param phone
 * @returns
 */
export const verifyPhone = (phone: string): boolean => {
  const reg = /^1(3[0-9]|4[0-1,4-9]|5[0-3,5-9]|6[2567]|7[0-8]|8[0-9]|9[0-3,5-9])\d{8}$/
  return reg.test(phone)
}

/**
 * @desc 检验固定电话
 * @param localPhone
 * @returns
 */
export const verifyLocalPhone = (localPhone: string): boolean => {
  const reg = /^\d{3}-\d{7,8}|\d{4}-\d{7,8}$/
  return reg.test(localPhone)
}

/**
 * @desc 检验邮箱
 * @param mail
 * @returns
 */
export const verifyEmail = (mail: string): boolean => {
  const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
  return reg.test(mail)
}

/**
 * @desc 判断是否是可跳转URL
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 格式化数字
 * @param value
 * @param decimal 默认2位小数
 * @returns x.xx
 */
export function numberFormatFixed(value: string, decimal = 2): string {
  let temp = value
  if (temp.includes('.')) {
    temp = value.slice(0, value.indexOf('.') + decimal + 1)
  }
  const format = '0.' + '0'.repeat(decimal)
  return numberFormat(temp, format)
}

/**
 * 获取文件名称  带后缀 如: `/ada/ad/sad/a/d.map => d.map`
 * @param path
 * @returns
 */
export const getFileName = (path: string) => path?.slice(path?.lastIndexOf('/') + 1)
