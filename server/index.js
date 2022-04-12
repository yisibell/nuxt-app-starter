const https = require('https')
const fs = require('fs')
const path = require('path')
const consola = require('consola')
const Koa = require('koa')
const { default: sslify } = require('koa-sslify')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const createApiRoutes = require('./router')
const createNuxtRoutes = require('./nuxtApp')
const proxy = require('./middleware/proxy')

const { NUXT_APP_HTTPS } = process.env

const resolve = (filePath) => {
  return path.join(process.cwd(), filePath)
}

async function start() {
  try {
    const app = new Koa()
    const isHttps = NUXT_APP_HTTPS === '1'

    // proxy
    app.use(proxy())

    // ssl
    if (isHttps) {
      app.use(sslify())
    }

    app.use(cors())

    app.use(bodyParser())

    // api routes
    createApiRoutes(app)

    // nuxt render routes
    await createNuxtRoutes(app)

    const host = process.env.HOST || '127.0.0.1'
    const port = process.env.PORT || 4005

    if (isHttps) {
      https
        .createServer(
          {
            key: fs.readFileSync(resolve('server/ssl/server.key')),
            cert: fs.readFileSync(resolve('server/ssl/server.crt')),
          },
          app.callback()
        )
        .listen(port, host)

      consola.success(`Server listening on https://${host}:${port}`)
    } else {
      app.listen(port, host)
      consola.success(`Server listening on http://${host}:${port}`)
    }

    app.on('error', (err, ctx) => {
      console.error('server error', err, ctx)
    })
  } catch (err) {
    consola.error(err)
  }
}

start()
