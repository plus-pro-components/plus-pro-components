import dayjs from 'dayjs'
import type { QUnitType, OpUnitType, ConfigType } from 'dayjs'

/**
 *
 * @param {string | number | Date | Dayjs | null | undefined} date
 * @param format 默认 YYYY-MM-DD HH:mm:ss
 * @returns YYYY-MM-DD HH:mm:ss
 */
export function formatDate(date?: ConfigType, format = 'YYYY-MM-DD HH:mm:ss'): string {
  return dayjs(date || new Date()).format(format)
}

/**
 * 格式化时间到天
 * @param  {string | number | Date | Dayjs | null | undefined} date
 * @returns YYYY-MM-DD
 */
export const formatDateToDay = (date: ConfigType): string => formatDate(date, 'YYYY-MM-DD')

/**
 * 格式化时间到分钟
 * @param  {string | number | Date | Dayjs | null | undefined} date
 * @returns YYYY-MM-DD HH:mm
 */
export const formatDateToMinute = (date: ConfigType): string => formatDate(date, 'YYYY-MM-DD HH:mm')

/**
 * 获取两个 Dayjs 对象的时间差，默认秒。
 * @param date1
 * @param date2
 * @param format
 * @returns {*}
 */
export function diffDate(
  date1: ConfigType,
  date2: ConfigType = dayjs(),
  format: QUnitType | OpUnitType = 'second'
): number | string | undefined {
  if (!date1) return
  return dayjs(date1).diff(dayjs(date2), format)
}

/**
 * @desc 获取距离当前时间差，返回多少年（月/天/小时/分钟/秒）前
 * @param date  秒数
 * @returns
 */
export function diffDateFromCurrent(date: number): string {
  if (date >= 60 * 60 * 24 * 365) {
    return `${parseInt(String(date / (60 * 60 * 24 * 365)))}年前`
  }
  if (date >= 60 * 60 * 24 * 30) {
    return `${parseInt(String(date / (60 * 60 * 24 * 30)))}月前`
  }
  if (date >= 60 * 60 * 24) {
    return `${parseInt(String(date / (60 * 60 * 24)))}天前`
  }
  if (date >= 60 * 60) {
    return `${parseInt(String(date / (60 * 60)))}小时前`
  }
  if (date >= 60) {
    return `${parseInt(String(date / 60))}分钟前`
  }
  return `${parseInt(String(date))}秒前`
}
