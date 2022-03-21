const redis = require('redis')
const consola = require('consola')
const { REDIS_CONFIG } = require('../../config')

const createClient = (option = {}) => {
  const client = redis.createClient({ ...REDIS_CONFIG, ...option })
  client.on('error', (err) => {
    consola.error(err)
    client.quit()
  })

  return client
}

/**
 * 获取
 */
const get = (key) => {
  const client = createClient()

  return new Promise((resolve, reject) => {
    client.get(key, (err, res) => {
      err && reject(err)

      try {
        resolve(JSON.parse(res))
      } catch (error) {
        consola.error(error)
        resolve(res)
      }
    })

    client.quit()
  })
}

/**
 * 插入
 * @param {string} key 键名
 * @param {any} value 需要存储的数据
 * @param {object} options 可选配置
 */
const set = (key, value, options = {}) => {
  const { ttl = 60 * 10 } = options

  const client = createClient()

  return new Promise((resolve, reject) => {
    /* Only strings, dates and buffers are accepted */
    const jsonStrValue = JSON.stringify(value)

    client.set(key, jsonStrValue, (err, res) => {
      err && reject(err)
      resolve(res)
    })

    client.expire(key, ttl)

    client.quit()
  })
}

module.exports = {
  createClient,
  get,
  set,
}
