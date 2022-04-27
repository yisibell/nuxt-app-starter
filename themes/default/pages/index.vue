<template>
  <div>Welcome To Nuxt App Starter!</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, useContext } from '@nuxtjs/composition-api'
import useSiteConfig from '~~/packages/composables/helper/useSiteConfig'

export default defineComponent({
  setup() {
    const ctx = useContext()
    const { $api } = ctx
    const siteConfig = useSiteConfig()

    onMounted(() => {
      console.log('ctx:', ctx)
      console.log('site config:', siteConfig)
      console.log('api repo:', $api)
    })
  },
})
</script>
