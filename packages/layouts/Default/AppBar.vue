<template>
  <v-app-bar app color="white" :extension-height="48" class="px-10">
    <v-app-bar-nav-icon>
      <v-img src="/icon.png" width="12" contain />
    </v-app-bar-nav-icon>
    <v-toolbar-title>{{ settings.appName }}</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn icon>
      <v-badge content="0" color="red" overlap>
        <v-icon>mdi-cart</v-icon>
      </v-badge>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn icon @click="handleAccountClick">
      <v-icon>mdi-account</v-icon>
    </v-btn>

    <template #extension>
      <CategoryNavigation />
    </template>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import CategoryNavigation from './CategoryNavigation.vue'
import settings from '~~/packages/settings'

export default defineComponent({
  components: {
    CategoryNavigation,
  },
  setup(_props, { emit }) {
    const handleAccountClick = () => {
      emit('account-icon-click')
    }

    return {
      handleAccountClick,
      settings,
    }
  },
})
</script>
