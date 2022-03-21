import {
  IApiModuleContainer,
  IResponseInstance,
} from '~~/packages/types/apiRespository'

export interface ILocaleApiModuleInstance {
  /**
   * 获取当前语言翻译
   */
  getTranslates(params: {
    // 语言 code
    lang: string
  }): Promise<IResponseInstance<{ translates: {} }>>
}

const localeApi: IApiModuleContainer<ILocaleApiModuleInstance> = (request) => ({
  getTranslates(params) {
    return request({
      url: `/v1/c1/common/translates`,
      method: 'get',
      params,
    })
  },
})

export default localeApi
