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

  // 在采用移动端和PC端同构开发时，可以在这里通过判断 ua 是否为移动设备？
  // 然后将 themeName 设置为 mobile, 这样运行时，就会渲染 themes 下的 mobile Nuxt 实例。
  const themeName = isMobile ? 'mobile' : 'default'

  return {
    os,
    userAgent,
    isMobile,
    themeName,
  }
}

module.exports = {
  getSiteConfig,
}
