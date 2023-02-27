import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    // 标题
    title?: string
    // 副标题
    subtitle?: string
    // 图标
    icon?: string
    // 是否为一级菜单
    menu?: boolean
    // 用户权限
    roles?: string[]
  }
}
