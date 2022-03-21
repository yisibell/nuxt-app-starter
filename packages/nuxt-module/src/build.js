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
    test: /[\\/]node_modules[\\/](@vue|@aidol|@luban|swiper|ua-parser-js|vue-toasted|vue-i18n)[\\/]/,
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

  cacheGroups.vantUI = {
    test: /[\\/]node_modules[\\/](vant)[\\/]/,
    name: true,
  }

  cacheGroups.vuetifyUI = {
    test: /[\\/]node_modules[\\/](vuetify)[\\/]/,
    name: true,
  }

  // TODO: 样式拆包优化

  // cacheGroups.styles = {
  //   test: /\.(css|vue)$/,
  //   name: true,
  // }
}

// svg sprite
export const extendSvgSpriteLoader = (config, { srcDir, svg } = {}) => {
  const { disableSvgSpriteBuild, svgSymbolIdPrefix = 'icon-' } = svg || {}

  if (disableSvgSpriteBuild) return

  const svgDir = path.join(process.cwd(), srcDir, 'assets/icons/svg')

  /* extend svg-sprite-loader */
  const svgRule = config.module.rules.find((rule) => rule.test.test('.svg'))
  svgRule.exclude = [svgDir]

  const symbolId = `${svgSymbolIdPrefix}[name]`

  config.module.rules.push({
    test: /\.svg$/,
    include: [svgDir],
    loader: 'svg-sprite-loader',
    options: {
      symbolId,
    },
  })
}

// 扩展 webpack 配置
export const extendBuild = function (moduleObject, moduleOptions) {
  // extend Webpack config
  moduleObject.extendBuild((config, { isClient }) => {
    if (isClient) {
      extendSvgSpriteLoader(config, moduleOptions)

      extendOptimization(config)
    }
  })
}
