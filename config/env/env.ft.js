/**
 * ft 测试环境运行时配置
 */
module.exports = {
  NUXT_APP_BASE_API: 'https://luban.ft.veryvoga.com/api',
  NUXT_APP_MOCK_API: 'http://yapi.smaloo.com/mock/60/api',

  // 是否开启 vconsole
  NUXT_APP_V_CONSOLE: true,

  // dlocal client
  NUXT_APP_DLOCAL_CLIENT: {
    sdk: 'https://js-sandbox.dlocal.com',
    token: '861ae0da-1a71-486a-98d7-0b7e291c173a',
  },

  // paypal env
  NUXT_APP_PAYPAL_ENV: 'sandbox',

  // paypal client
  NUXT_APP_PAYPAL_CLIENT: {
    sandbox:
      'AbFcrfWa-KYv1GBoOKhhWnWqtsukj5cQn3Sqyj_9KfHZg4Onc5dn7CrcXmVZeHe1a4BqjoT09mQm8f5L',
    production: '',
  },

  enablePageCaching: false,

  cacheStore: {
    private: true,
    type: 'redis',
    host: 'db-t.opvalue.com',
    ttl: 10 * 60,
  },

  tagManagerId: 'GTM-WH424RP',

  sentryDsn: '',
}
