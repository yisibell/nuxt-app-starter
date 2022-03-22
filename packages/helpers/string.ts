import isNumber from 'lodash/isNumber'
import isString from 'lodash/isString'
import * as uuid from 'uuid'

/**
 * 随机 uuid
 * @param {number} maintain 保留位数
 * @returns {string} 随机字符串
 */
export const getUuid = (maintain: number = 32) => {
  return uuid.v4().replace(/\-/g, '').slice(0, maintain)
}

/**
 * route path 单斜线化处理
 * @param {string} routePath 路由路径
 * @returns {string} 将有多斜线的部分替换为单斜线的正常路径字符串
 */
export const formatToSingleDiagonal = (routePath: string) => {
  if (!routePath || !isString(routePath)) return ''

  return routePath.replace(/\/\/+/g, '/')
}

/**
 * 格式化 css 样式单位至指定格式
 */
export const formatCssUnit = (val: string | number, unit = 'px') => {
  const { parseFloat } = Number

  if (isString(val)) {
    if (val === '') return

    const value = parseFloat(val as string)

    return `${value}${unit}`
  } else if (isNumber(val)) {
    return `${val}${unit}`
  }
}
