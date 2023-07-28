## encrypt

AES 加密

```ts
import CryptoJS from 'crypto-js'

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
import CryptoJS from 'crypto-js'

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
