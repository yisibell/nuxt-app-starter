<template>
  <van-radio-group v-model="currLocale" @change="handleLocaleChange">
    <van-radio name="en">en</van-radio>
    <van-radio name="zh-CN">zh-CN</van-radio>
  </van-radio-group>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useRoute,
  useRouter,
} from '@nuxtjs/composition-api'
import VanRadioGroup from 'vant/lib/radio-group'
import VanRadio from 'vant/lib/radio'

export default defineComponent({
  components: {
    VanRadioGroup,
    VanRadio,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()

    const currLocale = ref(route.value.params.lang)
    const handleLocaleChange = (lang: string) => {
      if (lang === route.value.params.lang) return

      router
        .replace({ name: route.value.name || '', params: { lang } })
        .then(() => {
          location.reload()
        })
    }

    return {
      currLocale,
      handleLocaleChange,
    }
  },
})
</script>
