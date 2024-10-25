# nuxt-app-starter

A ssr app starter build by Nuxt(2) + Koa + Vuetify + Typescript + Composition API + sass.

# Setup

## Environmental preparation

1. `node` version requires `>= 14.20.0 <=18`. It is recommended to use `nvm` to manage `node` version.
2. **Package management tools** recommend using `yarn`. If not, please pre-install: `npm i yarn -g`.
3. It is recommended to use `pm2` to start the application in the production environment.

## Scripts

``` zsh
# 安装依赖
$ yarn install

# 开发(默认皮肤)
$ yarn dev
# 开发(移动端皮肤)
$ yarn dev:mobile

# 构建
$ yarn build
# 构建（ft）
$ yarn build:ft
# 构建移动端
$ yarn build:mobile
# 构建移动端（ft）
$ yarn build:mobile:ft
# 构建所有皮肤
$ yarn build:all
# 构建所有皮肤（ft）
$ yarn build:all:ft

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


