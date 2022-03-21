import {
  IResponseInstance,
  IApiModuleContainer,
} from '~~/packages/types/apiRespository'

export interface UserInfoData {
  /**
   * 是否已登录
   */
  signedIn: boolean

  /**
   * 总收藏数
   */
  favTotal: number

  /**
   * 购物车商品数
   */
  cartTotal: number

  /**
   * 用户信息
   */
  userData: {
    email: string
    userName: string
    userId: string
  }
}

export interface changePwdForm {
  /**
   * 旧密码
   */
  oldPwd: string
  /**
   * 新密码
   */
  newPwd: string
  /**
   * 再次输入新密码
   */
  newPwdAgain: string
}

export interface changePwdRes {
  /**
   * 是否成功
   */
  success: boolean
  /**
   * 提示消息
   */
  message: string
}

export interface IUserApiModuleInstance {
  /**
   * 获取当前用户信息
   */
  getInfo(): Promise<IResponseInstance<UserInfoData>>
  /**
   * 修改用户密码
   */
  changePwd(data: changePwdForm): Promise<IResponseInstance<changePwdRes>>
}

const userApi: IApiModuleContainer<IUserApiModuleInstance> = (request) => ({
  getInfo() {
    return request({
      url: `/v1/user/info`,
      method: 'get',
    })
  },
  changePwd(data) {
    return request({
      url: `/v1/user/change-password`,
      method: 'post',
      data,
    })
  },
})

export default userApi
