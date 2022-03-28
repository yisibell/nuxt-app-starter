# MIDDLEWARE

**This directory is not required, you can delete it if you don't want to use it.**

This directory contains your application middleware.
Middleware let you define custom functions that can be run before rendering either a page or a group of pages.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/guide/routing#middleware).

## EXAMPLE

使用 `@nuxtjs/composition-api` 提供的 `defineNuxtMiddleware` 辅助函数进行定义。

``` ts
import { defineNuxtMiddleware } from '@nuxtjs/composition-api'

export default defineNuxtMiddleware((ctx) => {
  console.log('this is an example middleware, log the ctx:', ctx)
})
```
