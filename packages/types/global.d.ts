// global types

interface Window {
  onNuxtReady: (cb: () => void) => void
}

declare module '*.vue' {
  import { defineComponent } from '@nuxtjs/composition-api'
  const Component: ReturnType<typeof defineComponent>
  export default Component
}
