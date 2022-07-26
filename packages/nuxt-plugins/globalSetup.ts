import {
  defineNuxtPlugin,
  onGlobalSetup,
  onMounted,
  useContext,
  useRoute,
} from '@nuxtjs/composition-api'
import useSiteConfig from '~~/packages/composables/helper/useSiteConfig'

export default defineNuxtPlugin(() => {
  // 提供在应用根组件注入 setup 钩子的方式。
  // 在这里，可以做些初始化的工作。
  onGlobalSetup(() => {
    const ctx = useContext()
    const siteConfig = useSiteConfig()
    const route = useRoute()

    onMounted(() => {
      console.log('this is a global setup.')
      console.log('ctx:', ctx)
      console.log('site config:', siteConfig)
      console.log('route', route.value)
    })
  })
})
