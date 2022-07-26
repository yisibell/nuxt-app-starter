const { defu } = require('defu')
const envConfig = require('./config')
const { getPublicRuntimeConfig } = require('./config/util')

const config = ({
  buildDirBase = '.nuxt/themes', // 构建目录基地址
  srcDirBase = 'themes', // 构建源码目录基地址
  themeName = 'default', // 皮肤名称
} = {}) => {
  const { NUXT_APP_THEME_NAME, NUXT_APP_ENV } = process.env
  themeName = NUXT_APP_THEME_NAME || themeName

  const srcDir = `${srcDirBase}/${themeName}`
  const buildDir = `${buildDirBase}/${themeName}`

  // extra nuxt config for current theme
  let extraConfig = {}
  try {
    extraConfig = require(`./${srcDir}/nuxt.config.js`)
  } catch (err) {
    extraConfig = {}
  }

  const allConfig = envConfig(NUXT_APP_ENV)
  const publicRuntimeConfig = getPublicRuntimeConfig(allConfig)

  const defaultConfig = {
    render: {
      // delete prefetch preload
      resourceHints: false,
    },

    build: {
      extractCSS: {
        ignoreOrder: true,
      },
      // 附加扩展名，使其可以编译 middleware 和 store 中的 ts 文件
      additionalExtensions: ['ts', 'tsx'],
    },

    // nuxt 构建输出目录
    buildDir,

    // nuxt 构建源码目录
    srcDir,

    telemetry: false,

    // 运行时配置
    publicRuntimeConfig,

    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
      meta: [
        { charset: 'utf-8' },
        {
          hid: 'viewport',
          name: 'viewport',
          content:
            'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0,viewport-fit=cover',
        },
      ],
    },

    buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify'],

    modules: [
      [
        '~~/packages/nuxt-module',
        {
          srcDir,
          svg: {
            // 是否禁用构建化的 svg sprite
            disableSvgSpriteBuild: allConfig.disableSvgSpriteBuild,
          },
          // 是否开启 sentry
          enableSentry: false,
        },
      ],
    ],

    plugins: [
      { src: '~~/packages/nuxt-plugins/layer', mode: 'client' },
      { src: '~~/packages/nuxt-plugins/fetch' },
      { src: '~~/packages/nuxt-plugins/globalSetup' },
      { src: '~~/packages/nuxt-plugins/i18n' },
    ],

    // pwa
    pwa: {
      meta: false,
      manifest: false,
      workbox: false,
    },

    // sentry
    sentry: {
      dsn: allConfig.sentryDsn,
      config: {},
    },

    // loading
    loading: {
      color: '#40C4FF',
      height: '5px',
    },
  }

  return defu(extraConfig, defaultConfig)
}

module.exports = config
