import * as yup from 'yup'

/**
 * 验证邮箱格式
 */
export const emailValidator = (str: string) => {
  return yup.string().email().isValidSync(str)
}

/**
 * 验证密码格式
 */
export const passwordValidator = (str: string) => {
  if (!str) return false
  return str.length >= 6
}

/**
 * 验证是否外部链接
 */
export const externalLinksValidator = (str: string) => {
  return /^http[s]?[:]\/\//.test(str)
}

/**
 *  验证字数是否在5-1000
 */
export const messageValidator = (str: string) => {
  const realStr = str && str.trim()
  if (!realStr) return false
  return str.length >= 5 && str.length <= 1000
}
