module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/themes/default/$1',
    '^~/(.*)$': '<rootDir>/themes/default/$1',
    '^@@/(.*)$': '<rootDir>/$1',
    '^~~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js',
  },
  moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/themes/default/components/**/*.vue',
    '<rootDir>/themes/default/pages/**/*.vue',
  ],
}
