import type { MutationTree, ActionTree } from 'vuex'
import { ISiteConfig } from '~~/packages/types/siteConfig'

export const state = () => ({
  env: {} as ISiteConfig,
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  SET_ENV(state, info: ISiteConfig) {
    state.env = info || {}
  },
}

export const actions: ActionTree<RootState, RootState> = {
  nuxtServerInit({ commit }, { req }) {
    const { $config } = req.ctx

    commit('SET_ENV', $config)
  },
}
