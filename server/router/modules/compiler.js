const Router = require('@koa/router')
const compilerRouter = new Router()
const createCompilerCmsHref = require('../../controller/createCompilerCmsHref')
const getCompilerCache = require('../../controller/getCompilerCache')

compilerRouter.post(
  '/compiler/cms-element',
  createCompilerCmsHref('/compiler/cms-element')
)

compilerRouter.post(
  '/compiler/cms-block',
  createCompilerCmsHref('/compiler/cms-block')
)

compilerRouter.post('/compiler/cms', createCompilerCmsHref('/compiler/cms'))

compilerRouter.get('/compiler/content/:token', getCompilerCache())

module.exports = compilerRouter
