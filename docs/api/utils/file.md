## download

下载文件

```ts
import type { FileSaverOptions } from 'file-saver'

interface Download<T = Blob | string> {
  (data: T, filename: string, options?: FileSaverOptions): Promise<T>
}

/**
 * @description 下载文件
 * @param {Blob | string} data  文件 Blob
 * @param  {string} filename 文件名称
 * @param  {object} options 可选参数
 */
declare const download: Download
```

示例

```ts
import { download } from '@plus-pro-components/utils'

const handleDownload = async () => {
  await download('data', 'test.txt')
}
```

## isLegalFile

判断文件类型是否符合预期

```ts
/**
 *
 * @desc 限制文件类型
 * @param {File|Blob} file 源文件
 * "默认限制图"片
 * @return 合法文件返回true否则返回false
 */
declare const isLegalFile: (file: File | Blob, types: string[]) => boolean
```

## isMaxFileSize

判断文件文件上传大小是否符合预期

```ts
/**
 * @desc 限制文件上传大小
 * @param {File|Blob} file 源文件
 * @param {number} fileMaxSize  图片限制大小单位（MB）
 * @return 在限制内返回true否则返回false
 */
declare const isMaxFileSize: (file: File | Blob, fileMaxSize?: number) => boolean
```

## fileToDataURL

读取文件为 DataURL 文件格式 （base64）

```ts
/**
 *
 * @desc 读取文件为DataURL文件格式 （base64）
 * @param {file|Blob} file 源文件
 * @return 返回DataURL文件 （base64）
 */
declare const fileToDataURL: (file: File | Blob) => Promise<string>
```

## fileToText

读取文件为 text 文件格式

```ts
/**
 * @desc 读取文件为text文件格式
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
