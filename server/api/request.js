const https = require('https')
const axios = require('axios')
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

module.exports = axiosInstance
