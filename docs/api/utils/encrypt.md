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

使用示例

```ts
import { encrypt } from '@plus-pro-components/utils'

encrypt('key', 'message') // U2FsdGVkX19GcnbMMQplTX7ZrBomhN24tzbA5Nlc1dw=
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

使用示例

```ts
import { decrypt } from '@plus-pro-components/utils'

decrypt('key', 'U2FsdGVkX19GcnbMMQplTX7ZrBomhN24tzbA5Nlc1dw=') // message
```
