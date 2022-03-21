// pm2 config for ft
module.exports = {
  apps: [
    {
      name: 'LubanPwa',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: './server/index.js',
      env: {
        NODE_ENV: 'production',
        HOST: '0.0.0.0',
        PORT: 4008,
        NUXT_APP_ENV: 'ft',
      },
    },
  ],
}
