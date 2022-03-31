<template>
  <DefaultLayout />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import DefaultLayout from '~~/packages/layouts/Default'

export default defineComponent({
  name: 'DefaultLayoutContainer',
  components: {
    DefaultLayout,
  },
})
</script>
