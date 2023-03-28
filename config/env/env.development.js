/**
 * 开发环境运行时配置
 */
module.exports = {
  NUXT_APP_ENV: 'development',

  // 请求基地址
  // NUXT_APP_BASE_API: 'http://16.163.143.182',

  // 代理
  NUXT_APP_BASE_API: '/api2',
  proxy: {
    target: 'http://16.163.143.182',
    pathRewrite: { '^/api2': '' },
  },

  // mock 请求基地址
  NUXT_APP_MOCK_API: 'http://yapi.smaloo.com/mock/60/api',

  // 是否启用页面级缓存
  enablePageCaching: false,

  cacheStore: {
    private: true,
    type: 'redis',
    host: 'db-t.example.com',
    ttl: 10 * 60,
  },

  // 是否禁用构建化的 svg icon
  disableSvgSpriteBuild: false,

  sentryDsn: '',
}
