import { createPinia } from 'pinia'
import piniaPersistState from 'pinia-plugin-persistedstate'

const store = createPinia()

/** 持久化存储插件 */
store.use(piniaPersistState)

export default store
