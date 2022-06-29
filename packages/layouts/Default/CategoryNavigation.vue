<template>
  <v-tabs align-with-title background-color="white" :grow="true" hide-slider>
    <v-tab v-for="(v, i) in items" :key="i">
      {{ v.title }}
    </v-tab>
  </v-tabs>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const items = [
      { title: 'Web', href: '' },
      { title: 'Shopping', href: '' },
      { title: 'Videos', href: '' },
      { title: 'Photos', href: '' },
      { title: 'News', href: '' },
    ]

    return {
      items,
    }
  },
})
</script>
