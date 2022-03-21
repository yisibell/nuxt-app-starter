import UAParser from 'ua-parser-js'

export interface IIsMobileDeviceOptions {
  /**
   * 是否返回设备信息
   */
  toInfo?: boolean
  /**
   * 查询参数
   */
  query?: {
    device?: string
  }
}

/**
 * 判断当前 device 是否为移动端
 * @param {string} userAgent 浏览器端的 navigator.userAgent 或者 http 请求头的 user-agent
 * @param {object} options 配置项
 */
export const isMobileDevice = (
  userAgent: string,
  options?: IIsMobileDeviceOptions
) => {
  const toInfo = options?.toInfo
  const { device } = options?.query || {}

  if (device === 'mb' || device === 'm') return true
  if (device === 'pc') return false

  const uaInfo = new UAParser(userAgent)
  const { name } = uaInfo.getOS()
  const { type } = uaInfo.getDevice()
  const isMobile = type === 'mobile' || name === 'Android' || name === 'iOS'

  if (toInfo) {
    return isMobile ? 'm' : 'pc'
  }

  return isMobile
}

/**
 * 当前是否为 app 环境
 */
export const isAppEnv = (query: { isApp?: string }) => {
  return query.isApp === '1'
}
