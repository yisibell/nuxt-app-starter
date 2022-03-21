/**
 * 生产环境运行时配置
 * TIPS: 该文件在发布时会被替换掉，注意新增的配置，提醒下后端。
 */
module.exports = {
  NUXT_APP_BASE_API: 'https://luban.ft.veryvoga.com/api',

  NUXT_APP_MOCK_API: 'http://yapi.smaloo.com/mock/60/api',

  // dlocal client
  NUXT_APP_DLOCAL_CLIENT: {
    sdk: 'https://js.dlocal.com',
    token: '',
  },

  // paypal env
  NUXT_APP_PAYPAL_ENV: 'production',

  // paypal client
  NUXT_APP_PAYPAL_CLIENT: {},

  enablePageCaching: true,

  cacheStore: {
    private: true,
    type: 'redis',
    host: 'db-t.opvalue.com',
    ttl: 10 * 60,
  },

  tagManagerId: 'GTM-WH424RP',

  sentryDsn: 'https://c998e2153ac84497a90be4febfc3335a@sentry.calcwell.com/7',
}
