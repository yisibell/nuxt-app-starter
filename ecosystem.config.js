// pm2 config for production
module.exports = {
  apps: [
    {
      name: 'NuxtAppStarter',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: './server/index.js',
      env: {
        NODE_ENV: 'production',
        HOST: '0.0.0.0',
        PORT: 3389,
        NUXT_APP_ENV: 'production',
      },
    },
  ],
}
