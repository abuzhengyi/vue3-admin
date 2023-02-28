type CacheContent = string | number | boolean | [] | object

interface ThisContent {
  cache: Storage
  set: (name: string, content: CacheContent) => void
  get: (name: string) => CacheContent
  remove: (name: string) => void
  removeAll: () => void
}

/** 持久化存储构造函数 Cache */
function Cache(this: ThisContent, storage = localStorage) {
  // 获取存储的 key
  const { VITE_CACHE_PREFIX } = import.meta.env
  const getKey = (name: string) => `${VITE_CACHE_PREFIX}-${name}`.toUpperCase()

  // 这里默认使用 localStorage 做存储，可以传入 sessionStorage
  this.cache = storage

  // 存储storage
  this.set = (name, content) => {
    if (!name) return
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }
    this.cache.setItem(getKey(name), content)
  }

  // 获取storage
  this.get = (name) => {
    if (!name) return
    const content = this.cache.getItem(getKey(name)) || ''
    // 判断布尔、数字、数组、对象类型
    if (/^(true|false|[0-9]{1,}|\[(.*)\]|\{(.*)\})$/.test(content)) {
      return JSON.parse(content)
    } else {
      return content
    }
  }

  // 删除单个storage
  this.remove = (name) => {
    if (!name) return
    this.cache.removeItem(getKey(name))
  }

  // 删除所有storage
  this.removeAll = () => {
    const storage = this.cache
    for (const item in storage) {
      this.cache.removeItem(item)
    }
  }
}

const cacheInstance: ThisContent = new (<any>Cache)()

export default cacheInstance
