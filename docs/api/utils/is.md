## isArray

判断是否是数组

```ts
/**
 * 判断是否是数组
 */
declare const isArray: (arg: any) => arg is any[]
```

使用示例

```ts
import { isArray } from '@plus-pro-components/utils'

isArray([]) // true
```

## isMap

判断是否是 Map

```ts
/**
 * 判断是否是Map
 * @param val
 * @returns
 */
declare const isMap: (val: any) => boolean
```

使用示例

```ts
import { isMap } from '@plus-pro-components/utils'

isMap(new Map()) // true
```

## isSet

判断是否是 Set

```ts
/**
 * 判断是否是Set
 * @param val
 * @returns
 */
declare const isSet: (val: any) => boolean
```

使用示例

```ts
import { isSet } from '@plus-pro-components/utils'

isSet(new Set()) // true
```

## isDate

判断是否是 Date

```ts
/**
 * 判断是否是Date
 * @param val
 * @returns
 */
declare const isDate: (val: any) => boolean
```

使用示例

```ts
import { isDate } from '@plus-pro-components/utils'

isDate(new Date()) // true
```

## isRegExp

判断是否是 Reg

```ts
/**
 * 判断是否是Reg
 * @param val
 * @returns
 */
declare const isRegExp: (val: any) => boolean
```

使用示例

```ts
import { isRegExp } from '@plus-pro-components/utils'

isRegExp(new RegExp()) // true
```

## isFunction

判断是否是函数

```ts
/**
 * 判断是否是函数
 * @param val
 * @returns
 */
declare const isFunction: (val: any) => boolean
```

使用示例

```ts
import { isFunction } from '@plus-pro-components/utils'

const func = () => {}
isFunction(func) // true
```

## isString

判断是否是字符串

```ts
/**
 * 判断是否是字符串
 * @param val
 * @returns
 */
declare const isString: (val: any) => boolean
```

使用示例

```ts
import { isString } from '@plus-pro-components/utils'

isString('str') // true
```

## isSymbol

判断是否是 Symbol

```ts
/**
 * 判断是否是Symbol
 * @param val
 * @returns
 */
declare const isSymbol: (val: any) => boolean
```

使用示例

```ts
import { isSymbol } from '@plus-pro-components/utils'

isSymbol(Symbol('str')) // true
```

## isObject

判断是否是 object

```ts
/**
 * 判断是否是object
 * @param val
 * @returns
 */
declare const isObject: (val: any) => boolean
```

使用示例

```ts
import { isObject } from '@plus-pro-components/utils'

isObject([]) // true
isObject({}) // true
isObject(function () {}) // true
isObject(null) // false
```

## isPromise

判断是否是 Promise

```ts
/**
 * 判断是否是Promise
 * @param val
 * @returns
 */
declare const isPromise: (val: any) => boolean
```

使用示例

```ts
import { isPromise } from '@plus-pro-components/utils'

isPromise(function () {}) // false
isPromise(new Promise()) // true
```

## isPlainObject

判断是否是 纯对象 object

```ts
/**
 * 判断是否是 纯对象 object
 * @param val
 * @returns
 */
declare const isPlainObject: (val: any) => boolean
```

使用示例

```ts
import { isPlainObject } from '@plus-pro-components/utils'

isPlainObject({}) // true
isPlainObject([]) // false
isPlainObject(function () {}) // false
isPlainObject(null) // false
```

## isEmptyObject

是否是空纯对象

```ts
/**
 * 是否是空对象
 * @param val
 * @returns
 */
declare const isEmptyObject: (val: any) => boolean
```

使用示例

```ts
import { isEmptyObject } from '@plus-pro-components/utils'

isEmptyObject({}) // true
isEmptyObject({ data: 'data' }) // false
isEmptyObject([]) // false
```
