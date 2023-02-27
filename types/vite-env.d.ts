/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_DESCRIBE: string
  readonly VITE_APP_COPYRIGHT: string
  readonly VITE_HISTORY_MODE: string
  readonly VITE_BASE_URL: string
  readonly VITE_PROXY_SERVER: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
