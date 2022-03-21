const Router = require('@koa/router')
const ApiRouter = new Router()
const compilerRouter = require('./modules/compiler')
const prefix = '/api'

const createApiRoutes = (app) => {
  ApiRouter.use(
    prefix,
    compilerRouter.routes(),
    compilerRouter.allowedMethods()
  )

  app.use(ApiRouter.routes())
}

module.exports = createApiRoutes
