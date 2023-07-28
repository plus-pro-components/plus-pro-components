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
