import { defineNuxtMiddleware } from '@nuxtjs/composition-api'

export default defineNuxtMiddleware(() => {
  console.log('this is an example middleware!!!')
})
