<template>
  <div>nuxt app starter</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, useContext } from '@nuxtjs/composition-api'
import useSiteConfig from '~~/packages/composables/helper/useSiteConfig'

export default defineComponent({
  setup() {
    const ctx = useContext()
    const siteConfig = useSiteConfig()

    onMounted(() => {
      console.log(ctx)
      console.log(ctx.$vuetify)
      console.log(ctx.app)
      console.log(siteConfig)
    })
  },
})
</script>
