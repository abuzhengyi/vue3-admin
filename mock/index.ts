import Mock from 'mockjs'

const { DEV, VITE_PROXY_SERVER, VITE_BASE_URL } = import.meta.env,
  baseURL = DEV && VITE_PROXY_SERVER === 'true' ? '/api' : VITE_BASE_URL,
  files = import.meta.glob('./controller/*.ts'),
  modules: (() => Promise<any>)[] = Object.values(files)

const mockXHR = async () => {
  for (const module of modules) {
    Object.values(await module()).forEach(mockData => {
      const { url, method = 'get', response } = <
        {
          url: string
          response: object
          method?: string
        }
      >mockData

      Mock.mock(`${baseURL}${url}`, method, response)
    })
  }
}

export default mockXHR
