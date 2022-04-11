import type { MutationTree, ActionTree } from 'vuex'
import { ISiteConfig } from '~~/packages/types/siteConfig'

export const state = () => ({
  env: {} as ISiteConfig,
})

export type RootState = ReturnType<typeof state>

/**
 * 各模块 state 集合
 */
export interface AllState extends RootState {}

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
