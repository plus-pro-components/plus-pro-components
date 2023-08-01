## setStorage

设置 localStorage

```ts
/**
 * 设置 localStorage
 * @returns storage
 */
export function setStorage(key: string, data: any): string {
  return storage.set(key, data)
}
```

使用示例

```ts
import { setStorage } from '@plus-pro-components/utils'

setStorage('key', { data: { username: 'name' } })
```

## getStorage

获取 localStorage

```ts
/**
 * 获取 localStorage
 * @returns storage
 */
export function getStorage(key: string): string {
  return storage.get(key)
}
```

使用示例

```ts
import { getStorage } from '@plus-pro-components/utils'

getStorage('key') // { data: { username: "name" } }
```

## removeStorage

移除 localStorage

```ts
/**
 * 移除storage
 */
export function removeStorage(key: string): void {
  storage.remove(key)
}
```

使用示例

```ts
import { removeStorage } from '@plus-pro-components/utils'

removeStorage('key')
```

## setToken

设置 token 带 AES 加密

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

获取 token 带 AES 解密

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

设置 token

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
