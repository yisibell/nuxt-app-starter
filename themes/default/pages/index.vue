<template>
  <div>nuxt app starter</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, useContext } from '@nuxtjs/composition-api'
import useSiteConfig from '~~/packages/composables/helper/useSiteConfig'

export default defineComponent({
  setup() {
    const ctx = useContext()
    const { $api } = ctx
    const siteConfig = useSiteConfig()

    // test api
    const fetchNav = async () => {
      const res = await $api.nav.get()
      console.log('nav data:', res)
    }

    onMounted(() => {
      console.log('ctx:', ctx)
      console.log('site config:', siteConfig)

      fetchNav()
    })
  },
  async asyncData(ctx) {
    const res = await ctx.$api.user.getInfo()
    console.log(res)
  },
})
</script>
