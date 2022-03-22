import https from 'https'
import qs from 'qs'
import Cookies from 'js-cookie'
import serverCookies from 'cookie'
import apiRespository from '~~/packages/api'

const assign = (obj, def) => {
  return Object.assign({}, obj, def)
}

const createAxiosInstance = (ctx) => {
  const { redirect, store, $config, req, res, $axios } = ctx
  const { NUXT_APP_ENV } = $config
  const isClient = process.client

  const NUXT_APP_BASE_API = isClient
    ? store.state.env.NUXT_APP_BASE_API
    : req.ctx.$config.NUXT_APP_BASE_API

  const httpsAgent =
    NUXT_APP_ENV !== 'production'
      ? new https.Agent({
          // 是否忽略证书验证
          rejectUnauthorized: false,
        })
      : undefined

  const axiosInstance = $axios.create({
    baseURL: NUXT_APP_BASE_API,
    timeout: 50000,
    httpsAgent,
  })

  // 请求拦截
  axiosInstance.onRequest((config) => {
    if (isClient) {
      // add token
      config.headers.token = Cookies.get('JJSID') || ''
    } else {
      const { header } = req.ctx.request
      const cookie = header.cookie || ''
      const parsedCookies = serverCookies.parse(cookie)

      config.headers.token = parsedCookies.JJSID || ''
      config.headers.cookie = cookie
    }

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
    const { parseInt } = Number
    const code = parseInt(err.response && err.response.status)

    console.error('[HTTP Response Error Code]:', code)
    console.error('[HTTP Response Error Info]:', err)

    if (err.isAxiosError) {
      console.error('[Axios Response Error Info]:', err)
    }
  })

  return axiosInstance
}

// 创建请求api
const createRequestApi =
  (axiosInstance, ctx) =>
  (option, { dataType = 'json', mock = false, loading = false } = {}) => {
    const { $config } = ctx
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
        option.headers
      )
      option.data = qs.stringify(option.data)
    } else if (dataType === 'formData2') {
      // 含文件
      option.headers = assign(
        {
          'Content-Type': 'multipart/form-data',
        },
        option.headers
      )
    }

    return new Promise((resolve, reject) => {
      if (process.client && loading) {
        // loading instance
      }

      axiosInstance(option)
        .then(resolve)
        .catch(reject)
        .finally(() => {
          // loading end
        })
    })
  }

export default (ctx, inject) => {
  // axios instance
  const axiosInstance = createAxiosInstance(ctx)

  // 二次包装请求方法
  const request = createRequestApi(axiosInstance, ctx)

  // 依赖注入
  inject('api', apiRespository(request))
}
