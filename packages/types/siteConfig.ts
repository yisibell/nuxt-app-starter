import { IThemeConfig } from './themeConfig'

/**
 * 站点配置定义
 */
export interface ISiteConfig {
  /**
   * 皮肤名称
   */
  themeName: string

  /**
   * 皮肤配置
   */
  themeConfig: IThemeConfig
}
