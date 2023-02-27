import type { RouteRecordRaw } from 'vue-router'
import router, { asyncRoutes } from '@/router'
import { useUserStoreHook } from '@/store/modules/user'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const user = useUserStoreHook()

/** 进度条配置 */
NProgress.configure({
  template: `<div class='bar' role='bar'></div>`,
  easing: 'ease',
  speed: 300
})

/** 判断动态路由 */
const hasPermission = (roles: string[], route: RouteRecordRaw) => {
  if (route.meta?.roles) {
    return roles.some((role) => route?.meta?.roles?.includes(role))
  } else {
    return true
  }
}

/** 过滤动态路由 */
const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
  const res: RouteRecordRaw[] = []
  routes.forEach((route) => {
    const r = { ...route }
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, roles)
      }
      res.push(r)
    }
  })
  return res
}

/** 设置动态路由 */
const setAsyncRoutes = (roles: string[]) => {
  let accessedRoutes = []
  // 管理员返回全部动态路由
  if (roles.includes('admin')) {
    accessedRoutes = asyncRoutes
    // 非管理员过滤
  } else {
    accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
  }
  accessedRoutes.forEach((route) => {
    router.addRoute(route)
  })
}

/** 前置守卫 */
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStoreHook()
  // 开始进度条
  NProgress.start()

  if (user.token.length) {
    // 刷新页面 || 从登录页进
    if (from.name === void 0 || from.name === 'login') {
      // 获取用户信息
      const { roles } = await userStore.getUserInfo()
      // 设置动态路由
      setAsyncRoutes(roles)
    }
  } else {
    // 非登陆页 && 无 token
    if (to.name !== 'login') {
      next({
        name: 'login'
      })
      return
    }
  }

  next()
})

/** 后置钩子 */
router.afterEach((to, from, next) => {
  // 完成进度条
  NProgress.done()
  // 设置 title
  document.title = `${import.meta.env.VITE_APP_TITLE}-${to.meta.title}`
})
