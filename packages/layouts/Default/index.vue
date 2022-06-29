<template>
  <v-app>
    <AppBar @account-icon-click="drawerVisible = true" />

    <NavigationDrawer v-model="drawerVisible" />

    <v-main class="appbody">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer app class="d-flex justify-center">
      <div>footer</div>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import AppBar from './AppBar.vue'
import NavigationDrawer from './NavigationDrawer.vue'

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    AppBar,
    NavigationDrawer,
  },
  setup() {
    const drawerVisible = ref(false)

    return {
      drawerVisible,
    }
  },
})
</script>
