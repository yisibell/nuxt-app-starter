<template>
  <div>
    <h1>{{ $t('products_title') }}</h1>
    <LangPicker />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import Toast from 'vant/lib/toast'
import LangPicker from '~/components/LangPicker/index.vue'

export default defineComponent({
  components: {
    LangPicker,
  },
  setup() {
    onMounted(() => {
      Toast('vant toast')
    })
  },
})
</script>
