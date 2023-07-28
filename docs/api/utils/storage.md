## getStorage

获取 storage

```ts
/**
 * 获取storage
 * @returns storage
 */
export function getStorage(key: string): string {
  return storage.get(key)
}
```

## setStorage

```ts
/**
 * 设置storage
 * @returns storage
 */
export function setStorage(key: string, data: any): string {
  return storage.set(key, data)
}
```

设置 storage

## removeStorage

移除 storage

```ts
/**
 * 移除storage
 */
export function removeStorage(key: string): void {
  storage.remove(key)
}
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

## setToken

设置 token 带 AES 加密

```ts
/**
 * 设置token 带AES加密
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
