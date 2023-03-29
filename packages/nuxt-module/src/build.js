import path from 'path'

// optimization
export const extendOptimization = (config) => {
  const { splitChunks } = config.optimization
  const { cacheGroups } = splitChunks

  // 允许入口并行加载的最大请求数
  splitChunks.maxInitialRequests = Infinity
  // 生成 chunk 的最小体积（以 bytes 为单位）
  splitChunks.minSize = 0

  cacheGroups.utilityVendors = {
    test: /[\\/]node_modules[\\/](@vue|@aidol|swiper|yup|tippy.js|ua-parser-js|sweetalert2|vue-i18n)[\\/]/,
    name: true,
  }

  cacheGroups.sentryVendors = {
    test: /[\\/]node_modules[\\/](@sentry)[\\/]/,
    name: true,
  }

  cacheGroups.svgIcons = {
    test(module) {
      // `module.resource` contains the absolute path of the file on disk.
      // Note the usage of `path.sep` instead of / or \, for cross-platform compatibility.

      return (
        module.resource &&
        module.resource.endsWith('.svg') &&
        module.resource.includes(`assets${path.sep}icons${path.sep}svg`)
      )
    },
    name: true,
  }

  cacheGroups.elementUI = {
    test: /[\\/]node_modules[\\/](element-ui)[\\/]/,
    name: true,
  }

  cacheGroups.vantUI = {
    test: /[\\/]node_modules[\\/](vant)[\\/]/,
    name: true,
  }
}

// 扩展 webpack 配置
export const extendBuild = function (moduleObject, _moduleOptions) {
  // extend Webpack config
  moduleObject.extendBuild((config, { isClient }) => {
    if (isClient) {
      extendOptimization(config)
    }
  })
}
