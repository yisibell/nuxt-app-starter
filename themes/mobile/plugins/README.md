# PLUGINS

**This directory is not required, you can delete it if you don't want to use it.**

This directory contains Javascript plugins that you want to run before mounting the root Vue.js application.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/guide/plugins).

## EXAMPLE

使用 `@nuxtjs/composition-api` 提供的 `defineNuxtPlugin` 辅助函数进行定义。

``` ts
import { defineNuxtPlugin } from '@nuxtjs/composition-api'

export default defineNuxtPlugin((ctx, inject) => {
  const { $config } = ctx

  const getConfig = () => {
    return $config
  }

  inject('getConfig', getConfig)
})
```
