const UAParser = require('ua-parser-js')

/**
 * 获取站点配置
 */
const getSiteConfig = ({ request }) => {
  const { header } = request
  const userAgent = header['user-agent']
  const uaInstance = new UAParser(userAgent)

  const os = uaInstance.getOS()
  const { type } = uaInstance.getDevice()

  const isMobile = type === 'mobile'

  return {
    os,
    userAgent,
    isMobile,
  }
}

module.exports = {
  getSiteConfig,
}
