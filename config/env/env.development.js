/**
 * 开发环境运行时配置
 */
module.exports = {
  NUXT_APP_ENV: 'development',

  // 请求基地址
  NUXT_APP_BASE_API: 'https://luban.ft.veryvoga.com/api',

  proxy: false,

  // mock 请求基地址
  NUXT_APP_MOCK_API: 'http://yapi.smaloo.com/mock/60/api',

  // 是否启用页面级缓存
  enablePageCaching: false,

  cacheStore: {
    private: true,
    type: 'redis',
    host: 'db-t.opvalue.com',
    ttl: 10 * 60,
  },

  // 是否禁用构建化的 svg icon
  disableSvgSpriteBuild: false,

  sentryDsn: '',
}
