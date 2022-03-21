const { redisDB } = require('../db')
const resFormatter = require('../helpers/resFormatter')

module.exports = function () {
  return async (ctx) => {
    ctx.type = 'json'
    ctx.status = 200

    try {
      const { token } = ctx.params

      if (!token) {
        ctx.body = resFormatter(
          {},
          {
            code: 500,
            msg: 'Params token is required!',
          }
        )

        return
      }

      const data = await redisDB.get(token)

      if (!data) {
        ctx.body = resFormatter(
          {},
          {
            code: 500,
            msg: 'Token invalid',
          }
        )
        return
      }

      ctx.body = resFormatter(data)
    } catch (err) {
      ctx.body = resFormatter({}, { code: 500, msg: err })
    }
  }
}
