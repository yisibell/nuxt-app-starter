import { useContext } from '@nuxtjs/composition-api'
import { IApiRepository } from '~~/packages/api'
import type { Layer } from '~~/packages/nuxt-plugins/layer'
import type { LoadLanguageAsync } from '~~/packages/nuxt-plugins/i18n'

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
    $loadLanguageAsync: LoadLanguageAsync
  }

  /**
   * Applicatoin Context. It's an extended Vue instance.
   *
   */
  interface NuxtAppOptions {
    $api: IApiRepository
    $layer: Layer
    $loadLanguageAsync: LoadLanguageAsync
  }
}
