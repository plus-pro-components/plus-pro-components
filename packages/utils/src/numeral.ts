import numeral from 'numeral'

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
 * 格式化数字
 * @param value
 * @param decimal 默认2位小数
 * @returns x.xx
 */
export function numberFormatFixed(value: string, decimal = 2): string {
  let temp = String(value)
  if (String(value).includes('.')) {
    temp = value.slice(0, value.indexOf('.') + decimal + 1)
  }
  const format = '0.' + '0'.repeat(decimal)
  return numberFormat(temp, format)
}
