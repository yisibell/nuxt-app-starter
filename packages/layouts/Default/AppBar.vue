<template>
  <v-app-bar app color="primary" dark :extension-height="48">
    <v-app-bar-nav-icon @click="handleNavIconClick"></v-app-bar-nav-icon>
    <v-toolbar-title>Nuxt App Starter</v-toolbar-title>
    <v-spacer></v-spacer>

    <SearchInput />

    <v-btn icon>
      <v-badge content="0" color="red" overlap>
        <v-icon>mdi-cart</v-icon>
      </v-badge>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <template #extension>
      <v-tabs align-with-title :grow="false" slider-color="white">
        <v-tab v-for="(v, i) in items" :key="i">
          {{ v.title }}
        </v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SearchInput from './SearchInput.vue'

export default defineComponent({
  components: {
    SearchInput,
  },
  setup(_props, { emit }) {
    const items = [
      { title: 'Web', href: '' },
      { title: 'Shopping', href: '' },
      { title: 'Videos', href: '' },
      { title: 'Photos', href: '' },
      { title: 'News', href: '' },
    ]

    const handleNavIconClick = () => {
      emit('nav-icon-click')
    }

    return {
      items,
      handleNavIconClick,
    }
  },
})
</script>
