## formatMoney

格式化金钱

```ts
/**
 * 格式化金钱  ￥12,345,678.00
 * @param val
 * @param format 默认 '￥'
 * @returns
 */
declare function formatMoney(val: string | number, format?: string): string
```

## formatNumber

格式化数字

```ts
/**
 * 格式化数字
 * @param number
 * @param  format  默认格式 '0.00'
 * @returns
 */
declare function formatNumber(number: number | string, format?: string): string
```

## formatNumberFixed

格式化数字保留几位小数

```ts
/**
 * 格式化数字保留几位小数
 * @param value
 * @param decimal 默认2位小数
 * @returns x.xx
 */
declare function formatNumberFixed(value: string, decimal?: number): string
```
