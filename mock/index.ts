import Mock from 'mockjs'
import type { AxiosResponse } from 'axios'

interface MockData {
  url: string
  response: AxiosResponse
}

const { DEV, VITE_PROXY_SERVER, VITE_BASE_URL } = import.meta.env,
  proxy = DEV && VITE_PROXY_SERVER === 'true',
  baseURL = proxy ? '/api' : VITE_BASE_URL

/** 根据 url 按需注册 mock 拦截 */
// mock 数据模块
const modules: (() => Promise<any>)[] = Object.values(import.meta.glob('./controller/*.ts'))
// mock 数据列表
let mockList: MockData[] = []
const mockXHR = async (url?: string, method = 'get') => {
  // 开发环境并且开启代理情况下执行
  if (!proxy) return
  // 首次获取 mock 数据列表
  if (!mockList.length) {
    for (const module of modules) {
      mockList = mockList.concat(Object.values(await module()))
    }
  }
  // 根据 url 查找 mock 数据
  const mockData = mockList.find((item) => item.url === url)
  // ，注册 mock
  mockData && Mock.mock(`${baseURL}${mockData.url}`, method, mockData.response)
}

export default mockXHR
