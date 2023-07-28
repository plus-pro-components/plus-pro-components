import numeral from 'numeral'
import accounting from 'accounting'

/**
 * 格式化金钱  $12,345,678.00
 * @param val
 * @returns
 */
export function formatMoney(val: string | number, format = '￥'): string {
  return accounting.formatMoney(val, format)
}

/**
 * 格式化数字
 * @param number
 * @param format   默认格式 '0.00'
 * @returns
 */
export function formatNumber(number: number | string, format = '0.00'): string {
  return numeral(number).format(format)
}

/**
 * 格式化数字
 * @param value
 * @param decimal 默认2位小数
 * @returns x.xx
 */
export function formatNumberFixed(value: string, decimal = 2): string {
  let temp = String(value)
  if (String(value).includes('.')) {
    temp = value.slice(0, value.indexOf('.') + decimal + 1)
  }
  const format = '0.' + '0'.repeat(decimal)
  return formatNumber(temp, format)
}
