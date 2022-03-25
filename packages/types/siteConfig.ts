import { IThemeConfig } from './themeConfig'

/**
 * 站点配置定义
 */
export interface ISiteConfig {
  NUXT_APP_BASE_API: string
  NUXT_APP_MOCK_API: string

  /**
   * 皮肤名称
   */
  themeName?: string

  /**
   * 皮肤配置
   */
  themeConfig?: IThemeConfig
}
