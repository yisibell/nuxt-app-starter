module.exports = {
  router: {
    middleware: ['example'],
  },
  plugins: [{ src: '~/plugins/example' }],
  css: ['~/assets/styles/index.scss'],
  vuetify: {
    defaultAssets: {
      font: {
        family: 'Poppins',
      },
      icons: 'mdi',
    },
    silent: true,
    customVariables: ['~/assets/styles/vuetify/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
      options: {
        customProperties: true,
      },
      /**
       * 主题设置
       */
      themes: {
        /**
         * 亮模式颜色
         */
        light: {
          /**
           * 主题色
           */
          primary: '#000000',
          /**
           * 应用背景色
           */
          appbody: '#f7f7f7',
        },
      },
    },
  },
}
