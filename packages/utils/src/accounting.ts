import accounting from 'accounting'

/**
 * 格式化金钱  $12,345,678.00
 * @param val
 * @returns
 */
export function formatMoney(val: string | number, format = '￥'): string {
  return accounting.formatMoney(val, format)
}
