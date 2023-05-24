import type { FileSaverOptions } from 'file-saver'

interface IDownload<T = Blob | string> {
  (
    data: T,
    filename?: string,
    options?: FileSaverOptions & {
      errorCode?: number
    }
  ): Promise<T>
}

const getFileName = (path: string) => path.slice(path.lastIndexOf('/') + 1, path.lastIndexOf('.'))

const getFileType = (path: string) => path.slice(path.lastIndexOf('.'))

/**
 * @description 下载文件
 * @param data
 * @param filename
 * @param options
 */
const download: IDownload = async (data, filename = '', options) => {
  // 处理没有数据的情况
  if (!data) {
    return Promise.reject('download fail: data is empt!')
  }

  // 处理二进制数据接口异常
  try {
    const text = await (data as Blob).text()
    const res = JSON.parse(text)
    if (res?.code === (options?.errorCode || 500)) {
      return Promise.reject('download fail: server error!')
    }
  } catch (error) {}

  // 处理文件名
  let type = ''
  let name = ''
  // const date = dateFormatMinute(new Date())
  if (filename) {
    name = getFileName(filename)
    type = getFileType(filename)
  } else {
    name = data instanceof Blob ? getFileName(data.type) : getFileName(data)
    type = data instanceof Blob ? getFileType(data.type) : getFileType(data)
  }

  // 下载文件
  try {
    const { default: FileSaver } = await import('file-saver')
    FileSaver.saveAs(data, `${name}${type}`, options)
    return Promise.resolve(data)
  } catch (error) {
    return Promise.reject('download fail: server error!')
  }
}

export default download
