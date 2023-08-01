export { default as en } from './lang/en'
export { default as zhCn } from './lang/zh-cn'

export type Translate = {
  [key: string]: string | string[] | Translate
}

export type Language = {
  name: string
  plus: Translate
}
