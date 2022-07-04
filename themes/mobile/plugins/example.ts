import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import { ISiteConfig } from '~~/packages/types/siteConfig'

export default defineNuxtPlugin((ctx, inject) => {
  const { store } = ctx

  const getSiteConfig = () => {
    return store.state.env as ISiteConfig
  }

  inject('getSiteConfig', getSiteConfig)
})
