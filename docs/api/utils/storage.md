## setStorage

设置 `localStorage`

```ts
/**
 * 设置 localStorage
 * @returns storage
 */
declare function setToken(key: string, token: string): string
```

使用示例

```ts
import { setStorage } from '@plus-pro-components/utils'

setStorage('key', { data: { username: 'name' } })
```

## getStorage

获取 `localStorage`

```ts
/**
 * 获取 localStorage
 * @returns storage
 */
declare function getToken(key: string): string
```

使用示例

```ts
import { getStorage } from '@plus-pro-components/utils'

getStorage('key') // { data: { username: "name" } }
```

## removeStorage

移除 `localStorage`

```ts
/**
 * 移除storage
 */
declare function removeToken(key: string): void
```

使用示例

```ts
import { removeStorage } from '@plus-pro-components/utils'

removeStorage('key')
```

## setToken

设置 token 带 AES 加密 （存储在 `localStorage`）

```ts
/**
 * 设置token 带AES加密
 * @returns token
 */
declare function setToken(key: string, token: string): string
```

使用示例

```ts
import { setToken } from '@plus-pro-components/utils'

setToken('tokenKey', 'token')
```

## getToken

获取 token 带 AES 解密 （获取的是 `localStorage` 的值）

```ts
/**
 * 获取token  带AES解密
 * @returns token
 */
declare function getToken(key: string): string
```

使用示例

```ts
import { getToken } from '@plus-pro-components/utils'

getToken('tokenKey') //  'token'
```

## removeToken

移除 token （移除的是 `localStorage` 的值）

```ts
/**
 * 移除token
 */
declare function removeToken(key: string): void
```

使用示例

```ts
import { removeToken } from '@plus-pro-components/utils'

removeToken('tokenKey')
```
