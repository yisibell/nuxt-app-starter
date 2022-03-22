import nav, { INavApiModuleInstance } from './modules/nav'
import login, { ILoginApiModuleInstance } from './modules/login'
import user, { IUserApiModuleInstance } from './modules/user'
import { IRequestInstance } from '~~/packages/types/apiRespository'

/**
 * api 仓库
 */
export interface IApiRespository {
  nav: INavApiModuleInstance
  login: ILoginApiModuleInstance
  user: IUserApiModuleInstance
}

export let $api: IApiRespository

export interface IApiRespositoryFactory {
  (fn: IRequestInstance): IApiRespository
}

const apiRespositoryFactory: IApiRespositoryFactory = (request) => {
  $api = {
    nav: nav(request),
    login: login(request),
    user: user(request),
  }

  return $api
}

export default apiRespositoryFactory
