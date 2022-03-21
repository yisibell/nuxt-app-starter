const execa = require('execa')
const consola = require('consola')
const argv = require('yargs/yargs')(process.argv.slice(2)).parse()

async function run() {
  try {
    const { env = 'production', host = '0.0.0.0', port = 4008, local } = argv
    const cmdStr = `cross-env NODE_ENV=production HOST=${host} PORT=${port} NUXT_APP_ENV=${env} LOCAL=${local} node server/index.js`

    await execa.command(cmdStr, {
      stdio: 'inherit',
    })
  } catch (err) {
    consola.error(err)
  }
}

run()
