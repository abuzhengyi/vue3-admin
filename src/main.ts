import { createApp } from 'vue'
import App from './App.vue'

/** pinia */
import store from './store'

/** router */
import router from './router'
import './router/permission'

/** mockjs */
import mockXHR from '../mock'
mockXHR()

/** directives */
import directives from '@/directives'

/** styles */
import './styles'

const app = createApp(App)

/** icons */
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(`IconEp${key}`, component)
}

app.use(store).use(router).use(directives).mount('#app')
