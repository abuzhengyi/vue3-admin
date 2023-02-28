import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  type RouteRecordRaw
} from 'vue-router'

const { VITE_HISTORY_MODE } = import.meta.env
const Layout = () => import('@/layout/index.vue')

/** 常驻路由 */
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          menu: true
        }
      },
      {
        path: 'center',
        name: 'center',
        component: () => import('@/views/center/index.vue'),
        meta: {
          title: '个人中心'
        }
      }
    ]
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

/** 动态路由 */
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/menu',
    name: 'menu',
    component: Layout,
    redirect: {
      name: 'menu2'
    },
    meta: {
      title: 'menu',
      subtitle: '多层级菜单',
      menu: true
    },
    children: [
      {
        path: 'menu1',
        name: 'menu1',
        meta: {
          title: 'menu1',
          icon: 'coffee-cup'
        },
        children: [
          {
            path: 'menu1-1',
            name: 'menu1-1',
            meta: {
              title: 'menu1-1',
              icon: 'milk-tea'
            },
            children: [
              {
                path: 'menu1-1-1',
                name: 'menu1-1-1',
                component: () => import('@/views/menu/menu1/menu1-1/menu1-1-1/index.vue'),
                meta: {
                  title: 'menu1-1-1'
                }
              },
              {
                path: 'menu1-1-2',
                name: 'menu1-1-2',
                component: () => import('@/views/menu/menu1/menu1-1/menu1-1-2/index.vue'),
                meta: {
                  title: 'menu1-1-2'
                }
              }
            ]
          },
          {
            path: 'menu1-2',
            name: 'menu1-2',
            component: () => import('@/views/menu/menu1/menu1-2/index.vue'),
            meta: {
              title: 'menu1-2',
              icon: 'coffee'
            }
          }
        ]
      },
      {
        path: 'menu2',
        name: 'menu2',
        component: () => import('@/views/menu/menu2/index.vue'),
        meta: {
          title: 'menu2',
          icon: 'pear'
        }
      }
    ]
  },
  {
    path: '/power',
    name: 'power',
    component: Layout,
    redirect: {
      name: 'dict'
    },
    meta: {
      title: '权限',
      subtitle: '权限管理',
      roles: ['admin', 'editor'],
      menu: true
    },
    children: [
      {
        path: 'dict',
        name: 'dict',
        component: () => import('@/views/power/dict/index.vue'),
        meta: {
          title: '字典管理',
          icon: 'collection',
          roles: ['admin', 'editor']
        }
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/power/role/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'user',
          roles: ['admin']
        }
      },
      {
        path: 'route',
        name: 'route',
        component: () => import('@/views/power/route/index.vue'),
        meta: {
          title: '路由管理',
          icon: 'location',
          roles: ['admin']
        }
      }
    ]
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
