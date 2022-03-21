const { v4: uuidv4 } = require('uuid')
const { redisDB } = require('../db')
const resFormatter = require('../helpers/resFormatter')
const { APP_CMS_COMPILER_SERVER_HOST } = require('../config')

const { NUXT_APP_ENV, HOST, PORT } = process.env

const isDev = NUXT_APP_ENV === 'development'

const BASE_API = isDev ? `${HOST}:${PORT}` : APP_CMS_COMPILER_SERVER_HOST

module.exports = function (path = '') {
  return async (ctx) => {
    ctx.type = 'json'

    try {
      const { body } = ctx.request
      const { device, content } = body
      const uuidStr = uuidv4().replace(/-/g, '')
      const key = `LUBAN_CMS_COMPILER_KEY:${uuidStr}${+new Date()}`

      await redisDB.set(key, content)

      const href = `${BASE_API}${path}?token=${key}&device=${device}`

      ctx.status = 200
      ctx.body = resFormatter({
        href,
      })
    } catch (err) {
      ctx.body = resFormatter(
        {},
        {
          code: 500,
          msg: err,
        }
      )
    }
  }
}
