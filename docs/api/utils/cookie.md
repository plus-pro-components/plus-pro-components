## setCookie

设置 cookie

```ts
/**
 * 设置 cookie
 * @returns
 */
declare function setCookie(key: string, data: any): string | undefined
```

使用示例

```ts
import { setCookie } from '@plus-pro-components/utils'

setCookie('username', 'name')
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

使用示例

```ts
import { getCookie } from '@plus-pro-components/utils'

getCookie('username') // name
```

## removeCookie

移除 cookie

```ts
/**
 * 移除 cookie
 */
declare function removeCookie(key: string): void
```

使用示例

```ts
import { removeCookie } from '@plus-pro-components/utils'

removeCookie('username')
```
