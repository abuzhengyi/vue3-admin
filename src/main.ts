import { createApp } from 'vue'
import App from './App.vue'

/** pinia */
import store from './store'

/** router */
import router from './router'
import './router/permission'

/** mock，开发环境下开启 */
import mockXHR from '../mock'
const { DEV, VITE_MOCK_SERVER } = import.meta.env
DEV && VITE_MOCK_SERVER === 'true' && mockXHR()

/** styles */
import './styles'

const app = createApp(App)
app.use(store).use(router).mount('#app')

/** icon */
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(`IconEp${key}`, component)
}
