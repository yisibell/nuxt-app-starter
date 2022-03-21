import nav, { INavApiModuleInstance } from './modules/nav'
import login, { ILoginApiModuleInstance } from './modules/login'
import user, { IUserApiModuleInstance } from './modules/user'
import locale, { ILocaleApiModuleInstance } from './modules/locale'
import seo, { ISeoApiModuleInstance } from './modules//seo'
import { IRequestInstance } from '~~/packages/types/apiRespository'

/**
 * api 仓库
 */
export interface IApiRespository {
  nav: INavApiModuleInstance
  login: ILoginApiModuleInstance
  user: IUserApiModuleInstance
  locale: ILocaleApiModuleInstance
  seo: ISeoApiModuleInstance
}

export interface IApiRespositoryFactory {
  (fn: IRequestInstance): IApiRespository
}

const apiRespositoryFactory: IApiRespositoryFactory = (request) => ({
  nav: nav(request),
  login: login(request),
  user: user(request),
  locale: locale(request),
  seo: seo(request),
})

export default apiRespositoryFactory
