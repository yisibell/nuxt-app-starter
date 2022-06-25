import type { AxiosRequestConfig } from 'axios'
import type { Context } from '@nuxt/types'
import type { NuxtAxiosInstance } from '@nuxtjs/axios'

/**
 * axios config
 */
export type IRequestOptions = AxiosRequestConfig

/**
 * 扩展的第二 options 选项
 */
export interface IRequestExtraOptions {
  /**
   * 发送的数据类型
   */
  dataType?: string
  /**
   * 是否开启 api mock 模式
   */
  mock?: boolean
  /**
   * 是否开启 loading 提示
   */
  loading?: boolean
}

/**
 * http 响应数据格式
 */
export interface IResponseInstance<T> {
  code: number
  msg?: string
  data: T
}

/**
 * request 函数定义
 */
export interface IRequestInstance<T = any> {
  (option: IRequestOptions, extraOption?: IRequestExtraOptions): Promise<
    IResponseInstance<T> | T
  >
}

/**
 * request 函数构造器
 */
export interface ICreateRequestApi {
  (axiosInstance: NuxtAxiosInstance, ctx: Context): IRequestInstance
}

/**
 * api 模块包装器
 */
export interface IApiModuleContainer<T> {
  (method: IRequestInstance): T
}
