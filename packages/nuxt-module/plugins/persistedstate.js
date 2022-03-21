import createPersistedState from 'vuex-persistedstate'
import clientCookies from 'js-cookie'
import serverCookies from 'cookie'

const key = '__NUXT_PERSISTEDSTATE_VUEX__'

const paths = ['site']

export default ({ store, req }) => {
  createPersistedState({
    key,
    paths,
    storage: {
      getItem: (key) => {
        if (process.server) {
          const parsedCookies = serverCookies.parse(req.headers.cookie || '')

          return parsedCookies[key]
        } else {
          return clientCookies.getJSON(key)
        }
      },
      setItem: (key, value) => {
        clientCookies.set(key, value, { expires: 365, secure: false })
      },
      removeItem: (key) => clientCookies.remove(key),
    },
  })(store)
}
