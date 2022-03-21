import path from 'path'
import consola from 'consola'
import { extendBuild } from './build'

export const pluginFileName = (suffix) => {
  return `luban-${suffix}`
}

export const runModule = async function (moduleObject, moduleOptions) {
  const {
    vuetify: vuetifyOptions,
    pwa: pwaOptions,
    sentry: sentryOptions,
  } = moduleObject.options

  const { enableSentry } = moduleOptions

  consola.info('Extending webpack configuration')
  extendBuild(moduleObject, moduleOptions)

  consola.info('Add @nuxtjs/pwa module')
  await moduleObject.addModule(['@nuxtjs/pwa', pwaOptions], true)

  consola.info('Add @nuxtjs/composition-api module')
  await moduleObject.addModule('@nuxtjs/composition-api/module', true)

  consola.info('Add @nuxtjs/vuetify module')
  await moduleObject.addModule(['@nuxtjs/vuetify', vuetifyOptions], true)





  if (enableSentry) {
    consola.info('Add @nuxtjs/sentry module')
    await moduleObject.addModule(['@nuxtjs/sentry', sentryOptions], true)
  }


  consola.info('Add svg-icon plugin')
  moduleObject.addPlugin({
    src: path.join(__dirname, '..', 'plugins', 'svg-icon.js'),
    fileName: pluginFileName('svg-icon.js'),
    mode: 'client',
    options: moduleOptions,
  })

  consola.info('Add api and request plugin')
  moduleObject.addPlugin({
    src: path.join(__dirname, '..', 'plugins', 'request.js'),
    fileName: pluginFileName('request.js'),
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
