const https = require('https')
const axios = require('axios')
const consola = require('consola')
const envConfig = require('../../config')

const { NUXT_APP_BASE_API } = envConfig()

const axiosInstance = axios.create({
  baseURL: NUXT_APP_BASE_API,
  httpsAgent: new https.Agent({
    // 忽略证书验证
    rejectUnauthorized: false,
  }),
  timeout: 20000,
})

/**
 * 获取站点配置
 */
const getSiteConfig = async ({ ctx, NUXT_APP_BASE_API } = {}) => {
  const { headers = {}, request = {} } = ctx
  const Cookie = headers.cookie || ''
  const routePath = request.url || ''
  const remoteAddr = request && request.socket && request.socket.remoteAddress

  try {
    const params = {
      routePath,
    }

    const reqHeaders = {}
    reqHeaders.cookie = Cookie
    reqHeaders['user-agent'] = headers['user-agent'] || ''
    reqHeaders['LB-Remote-Addr'] = remoteAddr || ''
    reqHeaders['LB-Cache-Key'] = headers.cachekey || ''
    reqHeaders['LB-X-Access-Token'] = headers['x-access-token'] || ''
    reqHeaders['LB-X-Forwarded-For'] = headers['x-forwarded-for'] || ''
    reqHeaders['LB-From-CMS'] = headers['from-cms'] || ''
    reqHeaders['LB-Client-IP'] = headers['client-ip'] || ''
    reqHeaders['LB-CF-IPCountry'] = headers['cf-ipcountry'] || ''
    reqHeaders['LB-CF-Connecting-IP'] = headers['cf-connecting-ip'] || ''
    reqHeaders['LB-Referer'] = headers.referer || ''

    const res = await axiosInstance.get('/v1/c1/common/config', {
      baseURL: NUXT_APP_BASE_API,
      params,
      headers: reqHeaders,
    })

    const { code, data, msg } = res.data

    if (code === 200) {
      return data
    }

    consola.error('fetch site configuration failed: ', msg)
  } catch (err) {
    consola.error('fetch site configuration error: ', err)
  }
}

module.exports = {
  getSiteConfig,
}
