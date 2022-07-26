import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import en from '~~/locales/en.json'

Vue.use(VueI18n)

const defaultLocale = 'en'

const options = {
  locale: defaultLocale,
  fallbackLocale: defaultLocale,
  messages: {
    en,
  },
}

const i18nInstance = new VueI18n(options)

const loadedLanguages = [defaultLocale] // 我们的预装默认语言

export function setI18nLanguage(lang: string) {
  i18nInstance.locale = lang
  return lang
}

export type LoadLanguageAsync = (lang: string) => Promise<string>

export const loadLanguageAsync: LoadLanguageAsync = (
  lang: string = defaultLocale
) => {
  // 如果语言相同
  if (i18nInstance.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // 如果语言已经加载
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // 如果尚未加载语言
  return import(
    /* webpackChunkName: "lang-[request]" */ `~~/locales/${lang}.json`
  ).then((data) => {
    i18nInstance.setLocaleMessage(lang, data.default)
    loadedLanguages.push(lang)
    return setI18nLanguage(lang)
  })
}

export default defineNuxtPlugin(({ app }, inject) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = i18nInstance

  app.router?.beforeEach((to, _from, next) => {
    const lang = to.params.lang
    loadLanguageAsync(lang).then(() => next())
  })

  inject('i18n', app.i18n)
  inject('loadLanguageAsync', loadLanguageAsync)
})
