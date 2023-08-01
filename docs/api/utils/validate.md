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

使用示例

```ts
import { validateRegexUrl } from '@plus-pro-components/utils'

validateRegexUrl('https://www.api.com') // true
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

使用示例

```ts
import { validatePhone } from '@plus-pro-components/utils'

validatePhone('18888888888') // true
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

使用示例

```ts
import { validateLocalPhone } from '@plus-pro-components/utils'

validateLocalPhone('010-88568888-6603') // true
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

使用示例

```ts
import { validateEmail } from '@plus-pro-components/utils'

validateEmail('8888@qq.com') // true
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

使用示例

```ts
import { validateExternal } from '@plus-pro-components/utils'

validateExternal('http://www.api.com') // true
```
