import user, { IUserApiModuleInstance } from './modules/user'
import { IRequestInstance } from '~~/packages/types/apiRespository'

/**
 * api 仓库
 */
export interface IApiRespository {
  user: IUserApiModuleInstance
}

export let $api: IApiRespository

export interface IApiRespositoryFactory {
  (fn: IRequestInstance): IApiRespository
}

const apiRespositoryFactory: IApiRespositoryFactory = (request) => {
  $api = {
    user: user(request),
  }

  return $api
}

export default apiRespositoryFactory
