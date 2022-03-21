/**
 * axios options
 */
export interface IRequestOption {
  baseURL?: string
  url?: string
  method: string
  data?: any
  params?: any
}

/**
 * 扩展的第二 options 选项
 */
export interface IRequestExtraOption {
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
  (option: IRequestOption, extraOption?: IRequestExtraOption): Promise<
    IResponseInstance<T> | T
  >
}

/**
 * api 模块包装器
 */
export interface IApiModuleContainer<T> {
  (method: IRequestInstance): T
}
