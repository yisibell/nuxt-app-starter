import {
  IApiModuleContainer,
  IResponseInstance,
} from '~~/packages/types/apiRespository'

/**
 * 导航单节点数据对象
 */
export interface INavDataGroup {
  /**
   * 节点层级
   */
  level: number

  /**
   * 分类名称
   */
  name?: string

  /**
   * 跳转链接
   */
  href?: string

  /**
   * 图片链接
   */
  src?: string

  /**
   * 元素类型
   */
  type?: 'swiper' | 'card' | 'photo' | 'text'

  /**
   * 样式对象
   */
  style?: {
    [propName: string]: string
  }

  /**
   * 字体图标
   */
  icon?: string

  /**
   * 文本样式对象
   */
  textStyle?: {
    // 字体颜色
    color?: string

    // 字体修饰
    textDecoration?: string
  }

  /**
   * 文本是否高亮
   */
  textHighlight?: boolean

  /**
   * 子节点
   */
  children?: INavDataGroup[]
}

export type INavData = INavDataGroup[]

export interface INavFooterLinksInfo {
  name: string
  href: string
}

export interface INavFooterLinksInstance {
  title: string
  links: INavFooterLinksInfo[]
}

export interface INavApiModuleInstance {
  get(): Promise<IResponseInstance<INavData>>
  getFooterLinks(): Promise<IResponseInstance<INavFooterLinksInstance>>
  getFooterHomeLinks(): Promise<IResponseInstance<INavFooterLinksInfo[]>>
}

const navApi: IApiModuleContainer<INavApiModuleInstance> = (request) => ({
  // 获取分类导航数据
  get() {
    return request({
      url: '/v1/c1/cms/nav/nav',
      method: 'get',
    })
  },
  // 获取手机导航栏footer
  getFooterLinks() {
    return request({
      url: '/v1/c1/cms/footer/links',
      method: 'get',
    })
  },
  // 获取手机导航栏首页footer
  getFooterHomeLinks() {
    return request({
      url: '/v1/c1/cms/footer/home-links',
      method: 'get',
    })
  },
})

export default navApi
