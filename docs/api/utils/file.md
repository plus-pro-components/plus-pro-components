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

使用示例

```ts
import { download } from '@plus-pro-components/utils'

const handleDownload = async () => {
  await download('data', 'test.txt')
}

handleDownload()
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

使用示例

```ts
import { isLegalFile } from '@plus-pro-components/utils'

const file = new File(['data'], 'test.txt', {
  type: 'text/plain'
})

isLegalFile(file, ['.txt', '.cad', '.bom', '.dwg', '.job', '.lib']) // true
```

## isMaxFileSize

判断文件文件上传大小是否符合预期

```ts
/**
 * @desc 限制文件上传大小
 * @param {File|Blob} file 源文件
 * @param {number} fileMaxSize  文件大小单位（MB）
 * @return 在限制内返回true否则返回false
 */
declare const isMaxFileSize: (file: File | Blob, fileMaxSize?: number) => boolean
```

使用示例

```ts
import { isMaxFileSize } from '@plus-pro-components/utils'

const file = new File(['data'], 'test.txt', {
  type: 'text/plain'
})

isMaxFileSize(file, 1) // true
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

使用示例

```ts
import { fileToDataURL } from '@plus-pro-components/utils'

const file = new File(['data'], 'test.txt', {
  type: 'text/plain'
})

const handleFileToDataURL = async () => {
  const data = await fileToDataURL(file) // data:text/plain;base64,ZGF0YQ==
}

handleFileToDataURL()
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

使用示例

```ts
import { fileToText } from '@plus-pro-components/utils'

const file = new File(['hello-data'], 'test.txt', {
  type: 'text/plain'
})

const handleFileToText = async () => {
  const data = await fileToText(file) // hello-data
}

handleFileToText()
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

使用示例

```ts
import { loadImage } from '@plus-pro-components/utils'

const handleLoadImage = async () => {
  const url = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
  const data = await loadImage(url) //  {width: 800, height: 572, image: img}
}

handleLoadImage()
```

## isLegalResolutionRatio

判断图片文件的分辨率是否在限定范围之内

```ts
/**
 * @desc  判断图片文件的分辨率是否在限定范围之内，分辨率不在限定范围之内则抛出异常
 * @param {File | Blob} file 源文件
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

使用示例

```ts
import { isLegalResolutionRatio } from '@plus-pro-components/utils'

const file = new File(['image'], 'test.jpeg', {
  type: 'image/jpeg'
})

const handleIsLegalResolutionRatio = async () => {
  try {
    await isLegalResolutionRatio(file, { width: 100, height: 100 })
  } catch (error) {
    console.log(error) // false
  }
}

handleIsLegalResolutionRatio()
```
