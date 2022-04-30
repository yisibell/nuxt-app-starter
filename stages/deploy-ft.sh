#!/usr/bin/env bash

# repo dir
REPO_DIR_PATH=/root/www/nuxt-app-starter

# cd repo dir
cd $REPO_DIR_PATH

# setup
sudo git pull

sudo yarn install

sudo yarn build:ft

sudo yarn pm2:start-ft