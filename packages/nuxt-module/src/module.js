import path from 'path'
import consola from 'consola'
import { extendBuild } from './build'

export const pluginFileName = (suffix) => {
  return `nuxt-app-${suffix}`
}

export const runModule = async function (moduleObject, moduleOptions) {
  const {
    pwa: pwaOptions,
    sentry: sentryOptions,
    axios: axiosOptions,
  } = moduleObject.options

  const { enableSentry } = moduleOptions

  consola.info('Extending webpack configuration')
  extendBuild(moduleObject, moduleOptions)

  consola.info('Add @nuxtjs/axios module')
  await moduleObject.requireModule(['@nuxtjs/axios', axiosOptions])

  consola.info('Add @nuxtjs/composition-api module')
  await moduleObject.requireModule('@nuxtjs/composition-api/module')

  consola.info('Add @nuxtjs/pwa module')
  await moduleObject.requireModule(['@nuxtjs/pwa', pwaOptions])

  if (enableSentry) {
    consola.info('Add @nuxtjs/sentry module')
    await moduleObject.requireModule(['@nuxtjs/sentry', sentryOptions])
  }

  consola.info('Add svg-icon plugin')
  moduleObject.addPlugin({
    src: path.join(__dirname, '..', 'plugins', 'svg-icon.js'),
    fileName: pluginFileName('svg-icon.js'),
    mode: 'client',
    options: moduleOptions,
  })

  consola.info('Add vuex-persistedstate plugin')
  moduleObject.addPlugin({
    src: path.join(__dirname, '..', 'plugins', 'persistedstate.js'),
    fileName: pluginFileName('persistedstate.js'),
    options: moduleOptions,
  })

  consola.info('Add Luban UI')
  moduleObject.addPlugin({
    src: path.join(__dirname, '..', 'plugins', 'luban-ui.js'),
    fileName: pluginFileName('luban-ui.js'),
    options: moduleOptions,
  })

  consola.info('Add web font loader')
  moduleObject.addPlugin({
    src: path.join(__dirname, '..', 'plugins', 'webfontloader.js'),
    fileName: pluginFileName('webfontloader.js'),
    mode: 'client',
    options: moduleOptions,
  })
}
