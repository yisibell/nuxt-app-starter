import { useContext } from '@nuxtjs/composition-api'
import { IApiRepository } from '~~/packages/api'
import { Layer } from '~~/packages/nuxt-plugins/layer'

/**
 * Nuxt Composition Api Context.
 */
export type NuxtContext = ReturnType<typeof useContext>

/**
 * Definition Nuxt Types.
 */
declare module '@nuxt/types' {
  // nuxt context
  interface Context {
    $api: IApiRepository // api respository
    $layer: Layer
  }

  /**
   * Applicatoin Context. It's an extended Vue instance.
   *
   */
  interface NuxtAppOptions {
    $api: IApiRepository
    $layer: Layer
  }
}
