/**
 * @desc 校验链接地址
 * @param url
 * @returns
 */
export function validateRegexUrl(url: string) {
  const regex = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  )
  return regex.test(url)
}

/**
 * @desc 检验电话
 * @param phone
 * @returns
 */
export const validatePhone = (phone: string) => {
  const reg = /^1(3[0-9]|4[0-1,4-9]|5[0-3,5-9]|6[2567]|7[0-8]|8[0-9]|9[0-3,5-9])\d{8}$/
  return reg.test(phone)
}

/**
 * @desc 检验固定电话
 * @param localPhone
 * @returns
 */
export const validateLocalPhone = (localPhone: string) => {
  const reg = /^\d{3}-\d{7,8}|\d{4}-\d{7,8}$/
  return reg.test(localPhone)
}

/**
 * @desc 检验邮箱
 * @param mail
 * @returns
 */
export const validateEmail = (mail: string) => {
  // eslint-disable-next-line no-useless-escape
  const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
  return reg.test(mail)
}

/**
 * @desc 判断是否是可跳转URL
 * @param {string} path
 * @returns
 */
export const validateExternal = (path: string) => /^(https?:|mailto:|tel:)/.test(path)
