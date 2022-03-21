export const state = () => ({
  env: {},
})

export const mutations = {
  SET_ENV(state, info) {
    state.env = info || {}
  },
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    const { $config } = req.ctx

    commit('SET_ENV', $config)
  },
}
