import type { FileSaverOptions } from 'file-saver'

const toLower = (str: string) => str.toLowerCase()

/**
 * 获取文件类型
 * @param path
 * @returns
 */
const getFileType = (path: string) => path && path.slice(path.lastIndexOf('.'))

/**
 *
 * @desc 限制文件类型
 * @param {file|Blob} file 源文件
 * "默认限制图"片
 * @return 合法文件返回true否则返回false
 */
export const isLegalFile = (file: File | Blob, types: string[]): boolean => {
  const filterTypes = types.filter(item => item && item !== '*').map(item => toLower(item))
  if (!filterTypes.length) {
    return true
  }
  const type = getFileType(file.name)

  const isLegal = filterTypes.includes(toLower(type))
  if (!isLegal) {
    // 上传文件格式有误!
    return false
  }
  return true
}

/**
 *  @desc 限制文件上传大小
 * @param {file|Blob} file 源文件
 * @param {number} fileMaxSize  图片限制大小单位（MB）
 * @return 在限制内返回true否则返回false
 */
export const isMaxFileSize = (file: File | Blob, fileMaxSize?: number): boolean => {
  if (!fileMaxSize) {
    return true
  }
  const isMaxSize = file.size / 1024 / 1024 < fileMaxSize
  if (!isMaxSize) {
    // 上传文件大小不能超过 {size} MB!
    return false
  }
  return true
}

/**
 *
 * @desc 读取文件为DataURL文件格式  （base64）
 * @param {file|Blob} file 源文件
 * @return 返回DataURL文件 （base64）
 */
export const fileToDataURL = (file: File | Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const data = (e.target as any).result
      resolve(data)
    }
    reader.onerror = e => {
      // 读取文件失败
      reject(new Error(e as any))
    }
    reader.readAsDataURL(file)
  })
}

/**
 * @desc 读取文件为text文件格式
 * @param {file} file 源文件
 * @return 返回text文件
 */
export const fileToText = (file: File | Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const data = (e.target as any).result
      resolve(data)
    }
    reader.onerror = e => {
      // 读取文件失败
      // 读取文件失败
      reject(new Error(e as any))
    }
    reader.readAsText(file, 'utf-8')
  })
}

/**
 * @desc 加载真实图片，读取成功返回图片真实宽高和图片本身对象 ag: { width: 100,height: 100,image: '' }
 * @param {string} src  图片地址
 * @return `{ width: ,height: , image:  }`
 */
export const loadImage = (
  src: string
): Promise<{ width: number; height: number; image: HTMLImageElement }> => {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = src
    image.onload = () => {
      const data = { width: image.width, height: image.height, image }
      resolve(data)
    }
    image.onerror = () => {
      // 加载文件失败
      const err = new Error('load file error')
      reject(err)
    }
  })
}

/**
 * @desc  判断图片文件的分辨率是否在限定范围之内，分辨率不在限定范围之内则抛出异常
 * @param {file} file 源文件
 * @param {object} props   文件分辨率的宽和高   ag: props={width:100, height :100}
 */
export const isLegalResolutionRatio = async (
  file: File | Blob,
  props: { width: number; height: number }
): Promise<boolean> => {
  try {
    const { width, height } = props
    const base64 = await fileToDataURL(file)
    const image = await loadImage(base64)
    if (image.width !== width || image.height !== height) {
      // 上传图片的分辨率必须为
      return Promise.reject('error')
    }
    return true
  } catch (error) {
    return Promise.reject('error')
  }
}

interface Download<T = Blob | string> {
  (data: T, filename: string, options?: FileSaverOptions): Promise<T>
}

/**
 * @description 下载文件
 * @param {Blob | string} data  文件 Blob
 * @param  {string} filename 文件名称
 * @param  {object} options 可选参数
 */
export const download: Download = async (data, filename, options) => {
  // 处理没有数据的情况
  if (!data) {
    return Promise.reject('download fail: data is empt!')
  }

  // 处理二进制数据接口异常
  try {
    const text = await (data as Blob).text()
    const res = JSON.parse(text)
    if (res) {
      return Promise.reject('download fail: server error!')
    }
  } catch (error) {}

  // 下载文件
  try {
    const { default: FileSaver } = await import('file-saver')
    FileSaver.saveAs(data, filename, options)
    return Promise.resolve(data)
  } catch (error) {
    return Promise.reject('download fail: server error!')
  }
}
