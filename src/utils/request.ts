import axios, { toFormData, formToJSON } from 'axios'
import type { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, AxiosError } from 'axios'
import router from '@/router'

const { DEV, VITE_PROXY_SERVER, VITE_BASE_URL } = import.meta.env,
  baseURL = DEV && VITE_PROXY_SERVER === 'true' ? '/api' : VITE_BASE_URL

/** 创建axios实例 */
const axiosInstance = axios.create({
  baseURL,
  timeout: 2500,
  responseType: 'json',
  validateStatus: (status: number) => (status >= 200 && status < 300) || status === 304
})

/** 请求拦截 */
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const { headers, method, data } = config

    // FormData
    if (
      data &&
      (<AxiosRequestHeaders>config.headers)['Content-Type'] ===
        'application/x-www-form-urlencoded;charset=UTF-8'
    )
      config.data = toFormData(data, new FormData())

      // token
    ;(<AxiosRequestHeaders>config.headers)['Authorization'] = 'token'

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

/** 响应拦截 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('response =', response)
    const {
      data: { code, message = '请求失败', data = {} }
    } = response

    // 这里是对后端自定义的 code 处理
    if (code === 200) {
      return data
    } else if (code === 401) {
      router.replace({
        name: 'login'
      })
    }

    ElMessage({
      type: 'warning',
      message
    })

    return Promise.reject()
  },
  (error: AxiosError) => {
    let { message } = error

    // 请求错误提示
    if (message === 'Network Error') {
      message = '请求异常'
    }
    if (message.includes('timeout')) {
      message = '请求超时'
    }
    if (message.includes('Request failed with status code')) {
      const code = message.substr(message.length - 3)
      message = `接口${code}异常`
    }

    ElMessage({
      type: 'error',
      message
    })

    return Promise.reject(error)
  }
)

/** 请求方法 */

type Request = <T = any>(url: string, data?: object, config?: AxiosRequestConfig) => Promise<T>

// request
export const request = <T = any>(config: AxiosRequestConfig): Promise<T> =>
  axiosInstance.request(config)

// get
export const get: Request = (url, params, config) =>
  axiosInstance.get(url, {
    params,
    ...config
  })

// delete
export const del = <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
  axiosInstance.delete(url, config)

// post
export const post: Request = (url, data, config) => axiosInstance.post(url, data, config)

// put
export const put: Request = (url, data, config) => axiosInstance.put(url, data, config)

// patch
export const patch: Request = (url, data, config) => axiosInstance.patch(url, data, config)
