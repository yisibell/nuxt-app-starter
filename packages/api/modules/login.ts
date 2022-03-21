import {
  IResponseInstance,
  IApiModuleContainer,
} from '~~/packages/types/apiRespository'

/**
 * 登录返回信息
 */
export interface signInResData {
  success: boolean
  message: string
  token: string
}

/**
 * 注册返回信息
 */
export interface registerResData {
  /**
   * 红包信息
   */
  coupon: {
    /**
     * 折扣
     */
    off?: string
    /**
     * 优惠卷 code
     */
    code?: string
    /**
     * 有效期
     */
    expiredAt?: string
  }
  success: boolean
  message: string
}

/**
 * 登出返回信息
 */
export interface logoutResData {
  success: boolean
}

export interface ILoginApiModuleInstance {
  /**
   * 登录
   */
  signIn(data: {
    email: string
    password: string
  }): Promise<IResponseInstance<signInResData>>
  /**
   * 注册
   */
  register(data: {
    email: string
    password: string
    agreeNewsLetter?: boolean
  }): Promise<IResponseInstance<registerResData>>
  /**
   * 登出
   */
  logout(): Promise<IResponseInstance<logoutResData>>
}

const loginApi: IApiModuleContainer<ILoginApiModuleInstance> = (request) => ({
  signIn(data) {
    return request({
      url: `/v1/auth/login`,
      method: 'post',
      data,
    })
  },
  register(data) {
    return request({
      url: `/v1/register/email`,
      method: 'post',
      data,
    })
  },
  logout() {
    return request(
      {
        url: `/v1/auth/logout`,
        method: 'post',
      },
      { loading: true }
    )
  },
})

export default loginApi
