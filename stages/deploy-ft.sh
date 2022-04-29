#!/usr/bin/env bash

cd /root/www/nuxt-app-starter

yarn install

yarn build:ft

yarn pm2:start-ft