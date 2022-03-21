const execa = require('execa')
const consola = require('consola')
const argv = require('yargs/yargs')(process.argv.slice(2)).parse()
const { getThemeDirNames } = require('./util')

async function buildTheme(themeName, env, { analyze = false } = {}) {
  consola.info(`start building ${themeName} theme...`)

  const cmdArr = [
    'cross-env',
    `NUXT_APP_ENV=${env}`,
    `NUXT_APP_THEME_NAME=${themeName}`,
    'nuxt build',
  ]

  analyze && cmdArr.push('--analyze')

  const cmdStr = cmdArr.join(' ')

  await execa.command(cmdStr, {
    stdio: 'inherit',
  })

  consola.success(`${themeName} theme build complete.`)
}

async function run() {
  try {
    const { all, theme = 'default', env = 'production', analyze } = argv

    // 构建所有皮肤
    if (all) {
      const themeNames = getThemeDirNames()

      for (let i = 0; i < themeNames.length; i++) {
        await buildTheme(themeNames[i], env)
      }
    } else {
      await buildTheme(theme, env, { analyze })
    }
  } catch (err) {
    consola.error(err)
  }
}

run()
