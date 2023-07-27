# @plus-pro-components/utils

## 简介

`@plus-pro-components/utils` 会随着主包一起下载，无需单独安装。这是一个独立的 npm 包，也可以独立安后用于其他项目。

**使用示例**

```ts
import { formatMoney } from '@plus-pro-components/utils'

formatMoney('100')
```

下面是所有内置的方法

## formatMoney

格式化金钱

```ts
/**
 * 格式化金钱  $12,345,678.00
 * @param val
 * @returns
 */
declare function formatMoney(val: string | number, format?: string): string
```

## getCookie

获取 cookie

```ts
/**
 * 获取 cookie
 * @returns
 */
declare function getCookie(key: string): string | undefined
```

## setCookie

设置 cookie

```ts
/**
 * 设置 cookie
 * @returns
 */
declare function setCookie(key: string, data: any): string | undefined
```

## removeCookie

设置 cookie

```ts
/**
 * 移除 cookie
 */
declare function removeCookie(key: string): void
```

## formatDate

格式化时间

```ts
/**
 * 格式化时间
 * @param date
 * @param format
 * @returns
 */
declare function formatDate(date?: ConfigType, format?: string): string
```

## formatDateToDay

格式化时间到天

```ts
/**
 * 格式化时间到天
 * @param  {number | string | Date} date
 * @returns YYYY-MM-DD
 */
declare const formatDateToDay: (date: ConfigType) => string
```

## formatDateToMinute

格式化时间到分钟

```ts
/**
 * 格式化时间到分钟
 * @param  {number | string | Date} date
 * @returns YYYY-MM-DD HH:mm
 */
declare const formatDateToMinute: (date: ConfigType) => string
```

## dateDiff

获取两个 Dayjs 对象的时间差，默认秒。

```ts
/**
 * 获取两个 Dayjs 对象的时间差，默认秒。
 * @param date1
 * @param date2
 * @param format
 * @returns {*}
 */
declare function dateDiff(
  date1: string | number | Date,
  date2?: dayjs.Dayjs,
  format?: QUnitType | OpUnitType
): number | string | undefined
```

## getDiffDateFromCurrent

获取距离当前时间差 返回多少年（月/天/小时/分钟/秒）前

```ts
/**
 * @desc 获取距离当前时间差
 * @param date  秒数
 * @returns
 */
declare function getDiffDateFromCurrent(date: number): string
```

## download

下载文件

```ts
/**
 * @description 下载文件
 * @param data
 * @param filename
 * @param options
 */
declare const download: Download
```

## isLegalFile

判断文件类型是否符合预期

```ts
/**
 *
 * @desc 限制文件类型
 * @param {file} file 源文件
 * "默认限制图"片
 * @return 合法文件返回true否则返回false
 */
declare const isLegalFile: (file: File, types: string[]) => boolean
```

## isMaxFileSize

判断文件文件上传大小是否符合预期

```ts
/**
 * @desc 限制文件上传大小
 * @param {file} file 源文件
 * @param {number} fileMaxSize  图片限制大小单位（MB）
 * @return 在限制内返回true否则返回false
 */
declare const isMaxFileSize: (file: File | Blob, fileMaxSize?: number) => boolean
```

## fileToDataURL

读取图片文件为 DataURL 文件格式

```ts
/**
 *
 * @desc 读取图片文件为base64文件格式
 * @param {file} file 源文件
 * @return 返回base64文件
 */
declare const fileToDataURL: (file: File | Blob) => Promise<string>
```

## fileToText

读取图片文件为 text 文件格式

```ts
/**
 * @desc 读取图片文件为text文件格式
 * @param {file} file 源文件
 * @return 返回text文件
 */
declare const fileToText: (file: File | Blob) => Promise<string>
```

## loadImage

加载图片

```ts
/**
 * @desc 加载真实图片，读取成功返回图片真实宽高和图片本身对象 ag: { width: 100,height: 100,image: '' }
 * @param {string} src  图片地址
 * @return `{ width: ,height: , image:  }`
 */
declare const loadImage: (src: string) => Promise<{
  width: number
  height: number
  image: HTMLImageElement
}>
```

## isLegalResolutionRatio

判断图片文件的分辨率是否在限定范围之内

```ts
/**
 * @desc  判断图片文件的分辨率是否在限定范围之内，分辨率不在限定范围之内则抛出异常
 * @param {file} file 源文件
 * @param {object} props   文件分辨率的宽和高   ag: props={width:100, height :100}
 */
declare const isLegalResolutionRatio: (
  file: File | Blob,
  props: {
    width: number
    height: number
  }
) => Promise<boolean>
```

## getCustomProps

获取自定义的 props 支持对象 函数 和 Promise

```ts
/**
 * 获取自定义的props 支持对象 函数 和 Promise
 * @param props
 * @param value
 * @param row
 * @returns
 */
declare const getCustomProps: (props: any, value: any, row: any, index: number) => Promise<any>
```

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

## getBigLetter

生成大写字母

```ts
/**
 * @desc 生成大写字母
 * @returns
 */
declare const getBigLetter: () => string[]
```

## getSmallLetter

生成大写字母

```ts
/**
 * @desc 生成小写字母
 * @returns
 */
declare const getSmallLetter: () => string[]
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

## numberFormat

格式化数字

```ts
/**
 * 格式化数字
 * @param {number} number
 * @param {string}  format
 * @returns {*}
 */
declare function numberFormat(number: number | string, format?: string): string
```

## numberFormatFixed

格式化数字保留几位小数

```ts
/**
 * 格式化数字保留几位小数
 * @param value
 * @param decimal 默认2位小数
 * @returns x.xx
 */
declare function numberFormatFixed(value: string, decimal?: number): string
```

## encrypt

AES 加密

```ts
/**
 * AES加密
 * @param key
 * @param data
 * @returns
 */
declare function encrypt(
  key: string | CryptoJS.lib.WordArray,
  data: string | CryptoJS.lib.WordArray
): string
```

## decrypt

AES 解密

```ts
/**
 * AES 解密
 * @param key
 * @param encrypted
 * @returns
 */
declare function decrypt(
  key: string | CryptoJS.lib.WordArray,
  encrypted: string | CryptoJS.lib.CipherParams
): string
```

## getToken

获取 token

```ts
/**
 * 获取token
 * @returns token
 */
declare function getToken(key: string): string
```

## setToken

设置 token

```ts
/**
 * 设置token
 * @returns token
 */
declare function setToken(key: string, token: string): string
```

## removeToken

设置 token

```ts
/**
 * 移除token
 */
declare function removeToken(key: string): void
```

## validateRegexUrl

校验链接地址

```ts
/**
 * @desc 校验链接地址
 * @param url
 * @returns
 */
declare function validateRegexUrl(url: string): boolean
```

## validatePhone

检验电话

```ts
/**
 * @desc 检验电话
 * @param phone
 * @returns
 */
declare const validatePhone: (phone: string) => boolean
```

## validateLocalPhone

检验固定电话

```ts
/**
 * @desc 检验固定电话
 * @param localPhone
 * @returns
 */
declare const validateLocalPhone: (localPhone: string) => boolean
```

## validateEmail

检验邮箱

```ts
/**
 * @desc 检验邮箱
 * @param mail
 * @returns
 */
declare const validateEmail: (mail: string) => boolean
```

## validateExternal

判断是否是可跳转 URL

```ts
/**
 * @desc 判断是否是可跳转URL
 * @param {string} path
 * @returns
 */
declare const validateExternal: (path: string) => boolean
```
