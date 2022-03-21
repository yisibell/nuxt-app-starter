import {
  IResponseInstance,
  IApiModuleContainer,
} from '~~/packages/types/apiRespository'

export interface IHeadInfo {
  title: string
  meta: Array<{
    name?: string
    charset?: string
    property?: string
    content?: string
  }>
  link: Array<{
    hid?: string
    rel?: string
    type?: string
    hreflang?: string
    href: string
  }>
}

export interface ISeoApiModuleInstance {
  /**
   * 获取seo页面头信息
   */
  getHeadInfo(params: {
    routePath: string
  }): Promise<IResponseInstance<IHeadInfo>>
}

const seoApi: IApiModuleContainer<ISeoApiModuleInstance> = (request) => ({
  getHeadInfo(params) {
    return request({
      url: `/v1/c1/seo/route-path`,
      method: 'get',
      params,
    })
  },
})

export default seoApi
