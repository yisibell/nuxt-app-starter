/**
 * 生产环境运行时配置
 */
module.exports = {
  NUXT_APP_ENV: 'production',
  // 请求基地址
  // NUXT_APP_BASE_API: 'http://16.163.143.182',

  // 代理
  NUXT_APP_BASE_API: '/api2',
  proxy: {
    target: 'http://16.163.143.182',
    pathRewrite: { '^/api2': '' },
  },

  NUXT_APP_MOCK_API: 'http://yapi.smaloo.com/mock/60/api',

  enablePageCaching: false,
  cacheStore: {
    private: true,
    type: 'redis',
    host: 'db-t.example.com',
    ttl: 10 * 60,
  },
  sentryDsn: '',
}
