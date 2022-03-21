/**
 * 生产环境运行时配置
 */
module.exports = {
  NUXT_APP_BASE_API: 'https://luban.ft.veryvoga.com/api',
  NUXT_APP_MOCK_API: 'http://yapi.smaloo.com/mock/60/api',
  enablePageCaching: false,
  cacheStore: {
    private: true,
    type: 'redis',
    host: 'db-t.opvalue.com',
    ttl: 10 * 60,
  },
  sentryDsn: '',
}
