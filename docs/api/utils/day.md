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

使用示例

```ts
import { formatDate } from '@plus-pro-components/utils'

formatDate(new Date()) //  2023-01-01 01:01:01
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

使用示例

```ts
import { formatDateToDay } from '@plus-pro-components/utils'

formatDateToDay(new Date()) //  2023-01-01
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

使用示例

```ts
import { formatDateToMinute } from '@plus-pro-components/utils'

formatDateToDay(new Date()) // 2023-01-01 01:01
```

## diffDate

获取两个 Dayjs 对象的时间差，默认秒。

```ts
import type { QUnitType, OpUnitType, ConfigType } from 'dayjs'
/**
 * 获取两个 Dayjs 对象的时间差，默认秒。
 * @param date1
 * @param date2
 * @param format  默认 'second'
 * @returns
 */
declare function diffDate(
  date1: ConfigType,
  date2?: ConfigType,
  format?: QUnitType | OpUnitType
): number | string | undefined
```

使用示例

```ts
import { diffDate } from '@plus-pro-components/utils'

diffDate(new Date(), '2023-01-01 01:01:01') // 18014030
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

使用示例

```ts
import { diffDateFromCurrent } from '@plus-pro-components/utils'

diffDateFromCurrent(61) // 1秒前
```
