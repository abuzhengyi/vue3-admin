import { resolve } from 'path'
import { type ConfigEnv, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

const pathResolve = (dir = ''): string => (
  resolve(__dirname, '.', dir)
)

export default ({ command, mode }: ConfigEnv) => {
  const dev = mode === 'development';
  const { 
    VITE_APP_TITLE,
    VITE_BASE_URL,
    VITE_PROXY_SERVER
  } = loadEnv(mode, process.cwd());
  
  return {
    base: './',
    resolve: {
      alias: {
        '@': pathResolve('src')
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.scss'],
    },
    // 开发环境下根据`.env`配置决定是否开启代理
    server: (
      (
        dev && VITE_PROXY_SERVER === 'true'
      ) ? {
        port: 80,
        proxy: {
          '/api': {
            target: VITE_BASE_URL,
            rewrite: (path: string) => path.replace(/^\/api/, ''),
            changeOrigin: true
          }
        },
        host: '0.0.0.0',
        cors: true
      } : {
  
      }
    ),
    plugins: [
      vue(),
      createHtmlPlugin({
        // 在这里写 entry 后，你将不需要在`index.html`内添加 script 标签，原有标签需要删除
        entry: 'src/main.ts',
        // 需要注入`index.html`模版的数据
        inject: {
          data: {
            title: VITE_APP_TITLE,
            logo: 'src/assets/images/common/logo.svg'
          }
        }
      }),
      // 自动导入 Vue 、Element Plus 方法
      AutoImport({
        imports: ['vue'],
        resolvers: [
          ElementPlusResolver(),
        ],
        dts: pathResolve('types/auto-imports.d.ts')
      }),
      // 自动导入 Element Plus、Icon 组件
      Components({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            // Iconify Json 图标库，ep 代表 Element Plus
            enabledCollections: ['ep'],
            // 图标前缀，默认 I
            prefix: 'Icon'
          })
        ],
        dts: pathResolve('types/components.d.ts')
      }),
      // 自动导入图标配置
      Icons({
        autoInstall: true
      })
    ],
    css: {
      modules: {
        scopeBehaviour: 'local',
      },
      preprocessorOptions: {
        scss: {
          // 导入全局 scss，多个 scss 文件可用`;`符号分隔
          // 使用 @use 替代 @import，因为 sass 团队说他们最终会删除 @import 语法
          additionalData: `
            @use "@/styles/element-theme.scss" as *;
            @use "@/styles/common.scss" as *;
          `,
          javascriptEnabled: true,
          charset: false
        }
      }
    },
    build: {
      // 默认 'modules'，指支持原生 ES 模块的浏览器，最低 es2015
      target: 'es2015',
      // 禁用 map 文件
      sourcemap: false,
      // 禁用 brotli 压缩大小报告
      brotliSize: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000,
      // 防止 vite 将 rgba() 颜色转化为 #RGBA
      cssTarget: 'chrome61',
      // css 打包分割
      cssCodeSplit: true,
      // 小于此阈值(4kb)的导入或引用资源将内联为 base64 编码
      assetsInlineLimit: 4096,
      rollupOptions: {
        output: {
          // 页面分块
          manualChunks: {
            // ...
          }
        }
      }
    }
  }
}
