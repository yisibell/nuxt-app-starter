const { Nuxt, Builder } = require('nuxt')
const consola = require('consola')
const { getThemeDirNames } = require('../scripts/util')
const siteConfig = require('./middleware/siteConfig')

const { NUXT_APP_THEME_NAME } = process.env

const createNuxtInstanceMap = async () => {
  const themeNames = getThemeDirNames()
  const res = {}

  for (let i = 0; i < themeNames.length; i++) {
    const themeName = themeNames[i]

    const config = require('../nuxt.config.js')({
      themeName,
    })

    config.dev = false

    res[themeName] = new Nuxt(config)

    await res[themeName].ready()

    consola.success(`theme: [${themeName}] is ready now!`)
  }

  return res
}

module.exports = async (app) => {
  const isDev = !(app.env === 'production')

  let nuxtDev = null
  let nuxtProdMap = null

  if (isDev) {
    consola.info(`[${app.env}]-[${NUXT_APP_THEME_NAME}]: \n`)

    // Import and Set Nuxt.js options
    const config = require('../nuxt.config.js')({
      themeName: NUXT_APP_THEME_NAME,
    })

    config.dev = true
    nuxtDev = new Nuxt(config)

    // Build in development
    const builder = new Builder(nuxtDev)
    await builder.build()
  } else {
    nuxtProdMap = await createNuxtInstanceMap()
  }

  app.use(siteConfig())

  // last middleware to render nuxt app
  app.use((ctx) => {
    const { themeName } = ctx.req.ctx.$config
    const nuxt = nuxtDev || nuxtProdMap[themeName || 'default']

    ctx.status = 200
    ctx.respond = false // Mark request as handled for Koa

    nuxt.render(ctx.req, ctx.res)
  })
}
