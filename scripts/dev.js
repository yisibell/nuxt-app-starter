/* for development mode */

const minimist = require('minimist')
const execa = require('execa')

async function run() {
  try {
    const argv = minimist(process.argv.slice(2))

    const {
      theme = 'default',
      env = 'development',
      host = '127.0.0.1',
      port = 3389,
      https,
    } = argv

    const cmdStr = `cross-env NODE_ENV=development HOST=${host} PORT=${port} NUXT_APP_HTTPS=${https} NUXT_APP_ENV=${env} NUXT_APP_THEME_NAME=${theme} node server/index.js`

    await execa.command(cmdStr, {
      stdio: 'inherit',
    })
  } catch (err) {
    console.error(err)
  }
}

run()
