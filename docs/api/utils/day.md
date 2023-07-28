## formatDate

格式化时间

```ts
import type { ConfigType } from 'dayjs'
/**
 * 格式化时间
 * @param {string | number | Date | Dayjs | null | undefined} date
 * @param format 默认YYYY-MM-DD HH:mm:ss
 * @returns YYYY-MM-DD HH:mm:ss
 */
declare function formatDate(date?: ConfigType, format?: string): string
```

## formatDateToDay

格式化时间到天

```ts
import type { ConfigType } from 'dayjs'
/**
 * 格式化时间到天
 * @param {string | number | Date | Dayjs | null | undefined} date
 * @returns YYYY-MM-DD
 */
declare const formatDateToDay: (date: ConfigType) => string
```

## formatDateToMinute

格式化时间到分钟

```ts
import type { ConfigType } from 'dayjs'
/**
 * 格式化时间到分钟
 * @param {string | number | Date | Dayjs | null | undefined} date
 * @returns YYYY-MM-DD HH:mm
 */
declare const formatDateToMinute: (date: ConfigType) => string
```

## diffDate

获取两个 Dayjs 对象的时间差，默认秒。

```ts
import type { QUnitType, OpUnitType, ConfigType } from 'dayjs'
/**
 * 获取两个 Dayjs 对象的时间差，默认秒。
 * @param date1
 * @param date2
 * @param format
 * @returns {*}
 */
declare function diffDate(
  date1: ConfigType,
  date2?: ConfigType,
  format?: QUnitType | OpUnitType
): number | string | undefined
```

## diffDateFromCurrent

获取距离当前时间差 返回多少年（月/天/小时/分钟/秒）前

```ts
/**
 * @desc 获取距离当前时间差
 * @param date 时间秒数
 * @returns
 */
declare function diffDateFromCurrent(date: number): string
```
