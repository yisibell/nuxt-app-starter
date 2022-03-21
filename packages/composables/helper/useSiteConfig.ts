import { useContext } from '@nuxtjs/composition-api'
import { ISiteConfig } from '~~/packages/types/siteConfig'

/**
 * 获取站点配置数据
 */
export default function () {
  const { store } = useContext()

  return store.state.env as ISiteConfig
}
