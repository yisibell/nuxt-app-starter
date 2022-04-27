# nuxt-app-starter
A ssr app starter build by Nuxt + Koa + Vuetify + Typescript + Composition API.

# Setup

**注：** 

1. `node` 版本需 `>= 14.x`。推荐使用 `nvm` 管理 `node` 版本。
2. 包管理工具推荐使用 `yarn`。没有的话请预先安装: `npm i yarn -g`。
3. 生产环境推荐使用 `pm2` 启动应用。

``` zsh
# 安装依赖
$ yarn install

# 开发
$ yarn dev

# 构建
$ yarn build
# 构建（ft）
$ yarn build:ft

# 启动
$ yarn start
# 启动（ft）
$ yarn start:ft
# 通过 pm2 启动
$ yarn pm2:start
# 通过 pm2 启动（ft）
$ yarn pm2:start-ft
# 在 docker 环境中通过 pm2-runtime 启动
$ yarn pm2:docker:start
# 在 docker 环境中通过 pm2-runtime 启动（ft）
$ yarn pm2:docker:start-ft

```


