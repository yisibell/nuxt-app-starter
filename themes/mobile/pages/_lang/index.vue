<template>
  <div>
    <h1>{{ $t('welcome') }} {{ settings.appName }}!</h1>
    <h3>{{ $t('msg') }}: {{ themeName }}</h3>

    <LangPicker />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import useSiteConfig from '~~/packages/composables/helper/useSiteConfig'
import settings from '~~/packages/settings'
import LangPicker from '~/components/LangPicker/index.vue'

export default defineComponent({
  components: {
    LangPicker,
  },
  setup() {
    const siteConfig = useSiteConfig()
    const themeName = computed(() => siteConfig.themeName)

    return {
      settings,
      themeName,
    }
  },
})
</script>
