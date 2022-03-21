const defu = require('defu')
const envConfig = require('../../config')
const { getPublicRuntimeConfig } = require('../../config/util')
const { getSiteConfig } = require('../service/site')

const { NUXT_APP_ENV, LOCAL } = process.env

const siteConfigPond = {}

const createSiteConfig = async (ctx) => {
  const isDev = NUXT_APP_ENV === 'development'

  const { origin } = ctx.request

  // 请求基地址
  const NUXT_APP_BASE_API = (LOCAL === '1' || isDev
    ? envConfig(NUXT_APP_ENV).NUXT_APP_BASE_API
    : `${origin}/api`
  ).replace('http://', 'https://')

  // 获取站点配置
  const data = await getSiteConfig({
    ctx,
    NUXT_APP_BASE_API,
  })

  if (data) {
    const allConf = defu(
      { ...data, NUXT_APP_ENV, NUXT_APP_BASE_API },
      envConfig(NUXT_APP_ENV)
    )

    siteConfigPond[origin] = getPublicRuntimeConfig(allConf)
  }

  return siteConfigPond
}

const isStaticRoute = (url) => {
  return [
    '.gif',
    '.ico',
    '.png',
    '.webp',
    '.jpg',
    '.jpeg',
    '.js',
    '.json',
    '.css',
    '__webpack_hmr',
  ].some((type) => url.includes(type))
}

module.exports = () => {
  return async (ctx, next) => {
    const { origin } = ctx.request

    if (!isStaticRoute(ctx.request.url)) {
      await createSiteConfig(ctx)
    }

    ctx.req.ctx = {
      request: ctx.request,
      $config: siteConfigPond[origin] || {},
    }

    next()
  }
}
