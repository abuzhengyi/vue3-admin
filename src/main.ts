import { createApp } from 'vue'
import App from './App.vue'

/** pinia */
import store from './store'

/** router */
import router from './router'
import './router/permission'

/** directives */
import directivePlugin from '@/directives'

/** styles */
import './styles'

const app = createApp(App)

/** icons */
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(`IconEp${key}`, component)
}

app.use(store).use(router).use(directivePlugin).mount('#app')
