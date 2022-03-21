const devConfig = require('./env/env.development')
const ftConfig = require('./env/env.ft')
const prodConfig = require('./env/env.production')

module.exports = function (env) {
  switch (env) {
    case 'development':
      return devConfig
    case 'ft':
      return ftConfig
    case 'production':
      return prodConfig
    case 'cms':
      return cmsConfig
    default:
      return devConfig
  }
}
