export { default as en } from './lang/en'
export { default as zhCn } from './lang/zh-cn'
export { default as ja } from './lang/ja'
export { default as ko } from './lang/ko'
export { default as zhTw } from './lang/zh-tw'
export { default as zhHk } from './lang/zh-hk'

export type Translate = {
  [key: string]: string | string[] | Translate
}

export type Language = {
  name: string
  plus: Translate
}
