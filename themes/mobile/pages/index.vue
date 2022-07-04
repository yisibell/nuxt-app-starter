<template>
  <div>
    <h1>Welcome To {{ settings.appName }}!</h1>

    <h3>the current theme is: {{ themeName }}</h3>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  useContext,
} from '@nuxtjs/composition-api'
import useSiteConfig from '~~/packages/composables/helper/useSiteConfig'
import settings from '~~/packages/settings'

export default defineComponent({
  setup() {
    const ctx = useContext()
    const { $api } = ctx
    const siteConfig = useSiteConfig()

    const themeName = computed(() => siteConfig.themeName)

    onMounted(() => {
      console.log('ctx:', ctx)
      console.log('site config:', siteConfig)
      console.log('api repo:', $api)
    })

    return {
      settings,
      themeName,
    }
  },
})
</script>
