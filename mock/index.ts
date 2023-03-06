import Mock from 'mockjs'
import type { AxiosResponse, Method } from 'axios'

export interface MockData {
  url: string
  method?: Method
  response: AxiosResponse
}

/** 注册 mock 拦截 */
export default async () => {
  const { DEV, VITE_PROXY_SERVER, VITE_BASE_URL } = import.meta.env,
    proxy = DEV && VITE_PROXY_SERVER === 'true',
    baseURL = proxy ? '/api' : VITE_BASE_URL

  // 开发环境并且开启代理情况下执行，resolve(false) 未完成注册
  if (!proxy) return false
  // 导入所有 mock 模块
  const modules = <Record<string, () => Promise<Record<string, MockData>>>>(
    import.meta.glob('./controller/*.ts')
  )
  for (const path in modules) {
    const mocks = await modules[path]()
    // 注册所有 mock
    for (const key in mocks) {
      const mockData = mocks[key]
      Mock.mock(`${baseURL}${mockData.url}`, mockData.method || 'get', mockData.response)
    }
  }
  // resolve(true) 注册完成
  return true
}
