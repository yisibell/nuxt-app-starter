const execa = require('execa')
const consola = require('consola')
const minimist = require('minimist')

async function run() {
  try {
    const argv = minimist(process.argv.slice(2))

    const { env = 'production', host = '0.0.0.0', port = 3389 } = argv
    const cmdStr = `cross-env NODE_ENV=production HOST=${host} PORT=${port} NUXT_APP_ENV=${env} node server/index.js`

    await execa.command(cmdStr, {
      stdio: 'inherit',
    })
  } catch (err) {
    consola.error(err)
  }
}

run()
