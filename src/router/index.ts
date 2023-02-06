import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const { VITE_HISTORY_MODE } = import.meta.env

/** 常驻路由 */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/error/404.vue'),
    meta: {
      title: '404'
    }
  }
]

/** 创建 router 实例 */
const router = createRouter({
  history: VITE_HISTORY_MODE === 'hash' ? createWebHashHistory() : createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 保存返回页面滚动位置
    // if (savedPosition) {
    //   return savedPosition
    // } else {
    //   return { top: 0 }
    // }

    // 每次回到顶部
    return { top: 0 }
  }
})

export default router
