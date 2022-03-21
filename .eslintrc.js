module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  // TIPS:
  // make ESlint use a TypeScript parser (@typescript-eslint/parser)
  // so remove it
  // parserOptions: {
  //   parser: 'babel-eslint',
  // },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'nuxt/no-timing-in-fetch-data': 'off',
    'nuxt/no-cjs-in-config': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    'vue/no-v-html': 'off',
    'vue/valid-v-slot': 'off',
    'no-useless-escape': 'off',
  },
}
