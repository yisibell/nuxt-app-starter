<template>
  <div>
    <lu-svg-icon name="twitter" font-size="38px" />
    <lu-svg-icon name="huiyuan" font-size="38px" color="red" />
    <lu-svg-icon name="baogao" font-size="38px" />
    <lu-svg-icon name="piano" font-size="38px" />

    <div>
      Welcome To
      {{ settings.appName }}!
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, useContext } from '@nuxtjs/composition-api'
import useSiteConfig from '~~/packages/composables/helper/useSiteConfig'
import settings from '~~/packages/settings'

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

    return {
      settings,
    }
  },
})
</script>
