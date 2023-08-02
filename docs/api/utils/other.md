## getBigLetter

生成大写字母

```ts
/**
 * @desc 生成大写字母
 * @returns
 */
declare const getBigLetter: () => string[]
```

使用示例

```ts
import { getBigLetter } from '@plus-pro-components/utils'

getBigLetter() // ["A","B","C", "D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
```

## getSmallLetter

生成小写字母

```ts
/**
 * @desc 生成小写字母
 * @returns
 */
declare const getSmallLetter: () => string[]
```

使用示例

```ts
import { getSmallLetter } from '@plus-pro-components/utils'

getSmallLetter() // ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
```

## WS

WebSocket 支持自动重连，心跳检测

```ts
/**
 * setTimeout 类型
 */
type Timeout = ReturnType<typeof setTimeout>
/**
 * setInterval 类型
 */
type Interval = ReturnType<typeof setInterval>
/**
 * 允许null的泛型
 */
type Nullable<T> = T | null
type AutoReconnect = {
  /**
   *重连尝试次数 默认 3
   */
  reconnectMaxCount?: number
}
type Heartbeat = {
  /**
   * 心跳信息 默认`ping`
   */
  message: string
  /**
   * 心跳间隔时间 默认 `3000` 毫秒
   */
  interval: number
}
interface WSOptions {
  /**
   * 是否自动重连 默认`true`
   */
  autoReconnect: boolean | AutoReconnect
  /**
   * 心跳 默认`false`
   */
  heartbeat: boolean | Heartbeat
  /**
   * url 携带的参数
   */
  query: Record<string, string>
}
declare class WS {
  url: string
  socket: WebSocket | null
  reconnectCount: number
  delay: Nullable<Timeout>
  timer: Nullable<Interval>
  autoReconnect: WSOptions['autoReconnect']
  heartbeat: WSOptions['heartbeat']
  query: WSOptions['query']
  constructor(url?: string, options?: WSOptions)
  /**
   * 连接
   */
  connect(): void
  /**
   * 监听连接
   */
  onOpen(): void
  /**
   * 开启心跳
   */
  startHeartbeat(): void
  /**
   * 监听错误
   */
  onError(): void
  /**
   * 关闭连接
   */
  close(): void
  /**
   *  监听消息
   * @param callback
   */
  onMessage(callback: (...data: any[]) => any): void
  /**
   * 发送消息
   * @param data
   */
  send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void
}
```

使用示例

```ts
import { WS } from '@plus-pro-components/utils'

const ws = new WS('ws://domain.com')
ws.onMessage(data => {
  console.log(data)
})
```

## openExe

打开电脑本地软件

```ts
/**
 * @description 打开电脑本地软件
 * @param protocol  本地软件协议， 如 vscode 的协议 `vscode://`
 * @param event  点击按钮事件， `el-button` 或者原生 `button`
 * @param timeout 默认`1000`ms，没响应则认为打开失败
 */
declare const openExe: (protocol: string, event: Event, timeout?: number) => Promise<FocusEvent>
```

使用示例

```html
<button @click="handleCLick">打开vscode</button>
```

```ts
import { openExe } from '@plus-pro-components/utils'

const url = 'vscode://'

const handleCLick = async (event: MouseEvent) => {
  await openExe(url, event)
}
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

使用示例

```ts
import { isIOS } from '@plus-pro-components/utils'

isIOS() // false
```
