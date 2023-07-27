/**
 * @desc 生成大写字母
 * @returns
 */
export const getBigLetter = () => {
  return [...new Array(26)].map((_, index) => String.fromCharCode(65 + index))
}

/**
 * @desc 生成小写字母
 * @returns
 */
export const getSmallLetter = () => {
  return [...new Array(26)].map((_, index) => String.fromCharCode(97 + index))
}
