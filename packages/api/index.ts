import nav, { INavApiModuleInstance } from './modules/nav'
import user, { IUserApiModuleInstance } from './modules/user'
import { IRequestInstance } from '~~/packages/types/apiRespository'

/**
 * api 仓库
 */
export interface IApiRespository {
  nav: INavApiModuleInstance
  user: IUserApiModuleInstance
}

export let $api: IApiRespository

export interface IApiRespositoryFactory {
  (fn: IRequestInstance): IApiRespository
}

const apiRespositoryFactory: IApiRespositoryFactory = (request) => {
  $api = {
    nav: nav(request),
    user: user(request),
  }

  return $api
}

export default apiRespositoryFactory
