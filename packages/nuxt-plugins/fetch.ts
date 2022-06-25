import qs from 'qs'
import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import type { Context } from '@nuxt/types'
import apiRepositoryFactory from '~~/packages/api'
import type { ICreateRequestApi } from '~~/packages/types/apiRepository'

const assign = (obj: {}, def: {}) => {
  return Object.assign({}, obj, def)
}

const createAxiosInstance = (ctx: Context) => {
  const { redirect, $config, res, $axios, store } = ctx
  const { NUXT_APP_BASE_API } = $config

  const axiosInstance = $axios.create({
    baseURL: NUXT_APP_BASE_API,
    timeout: 50000,
  })

  // 请求拦截
  axiosInstance.onRequest((config) => {
    // set access token for JWT

    axiosInstance.setToken(store.state.site.accessToken || '')

    return config
  })

  // 请求错误处理
  axiosInstance.onRequestError((err) => {
    console.error('[Request Error]：', err)
  })

  // 响应拦截
  axiosInstance.onResponse((resp) => {
    const { code, data } = resp.data

    if (![200, 201, 0].includes(code)) {
      // 重定向处理
      if ([301, 302].includes(code)) {
        const { location } = data

        if (process.server) {
          res?.setHeader('Content-Length', '0')
        }

        redirect(location)
      } else {
        console.error('[Response Error Data]:', resp)
      }
    }

    return resp.data
  })

  // 响应错误处理
  axiosInstance.onResponseError((err) => {
    const code = err.response?.status

    console.error('[HTTP Response Error Code]:', code)
    console.error('[HTTP Response Error Info]:', err)

    if (code === 401) {
      // token 失效
      redirect('/login')
    }

    if (err.isAxiosError) {
      console.error('[Axios Response Error Info]:', err)
    }
  })

  return axiosInstance
}

// 创建请求api
const createRequestApi: ICreateRequestApi =
  (axiosInstance, ctx) =>
  (option, extraOption = {}) => {
    const { dataType = 'json', mock = false, loading = false } = extraOption

    const { $config, $layer } = ctx
    const { NUXT_APP_MOCK_API } = $config

    // 是否 mock 数据模式
    if (mock && NUXT_APP_MOCK_API) {
      option.url = `${NUXT_APP_MOCK_API}${option.url}`
    }

    if (dataType === 'formData') {
      // 发送 formData 数据格式
      option.headers = assign(
        {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        option.headers || {}
      )
      option.data = qs.stringify(option.data)
    } else if (dataType === 'formData2') {
      // 含文件
      option.headers = assign(
        {
          'Content-Type': 'multipart/form-data',
        },
        option.headers || {}
      )
    }

    return new Promise((resolve, reject) => {
      if (process.client && loading) {
        $layer.showLoading()
      }

      axiosInstance(option)
        .then(resolve)
        .catch(reject)
        .finally(() => {
          if (process.client && loading) $layer.closeLoading()
        })
    })
  }

export default defineNuxtPlugin((ctx, inject) => {
  // axios instance
  const axiosInstance = createAxiosInstance(ctx)

  // 二次包装请求方法
  const request = createRequestApi(axiosInstance, ctx)

  // 依赖注入
  inject('api', apiRepositoryFactory(request))
})
