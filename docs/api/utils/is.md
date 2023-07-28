## toTypeString

获取类型

```ts
/**
 * 获取类型
 * @param value
 * @returns
 */
declare const toTypeString: (value: any) => string
```

## toRawType

获取类型

```ts
/**
 * 拿到类型字符串
 * @param value
 * @returns
 */
declare const toRawType: (value: any) => string
```

## isArray

判断是否是数组

```ts
/**
 * 判断是否是数组
 */
declare const isArray: (arg: any) => arg is any[]
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

## isIOS

是否是 ios

```ts
/**
 * 是否是ios
 * @returns {boolean}
 */
declare function isIOS(): boolean
```
