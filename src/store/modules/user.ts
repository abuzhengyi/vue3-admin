import { ref } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import router from '@/router'
import store from '@/store'
import { defineStore } from 'pinia'
import cache from '@/utils/cache'
import { loginApi, logoutApi, getUserInfoApi, type LoginData } from '@/apis/user'
import defaultAvatar from '@/assets/images/user/avatar.png'

export const useUserStore = defineStore('user', () => {
  const name = ref('')
  const avatar = ref('' || defaultAvatar)
  const account = ref('')
  const token = ref(<string>cache.get('token') || '')
  const roles = ref<string[]>([])

  /** 登录 */
  const login = async (data: LoginData) => {
    try {
      const res = await loginApi(data)
      token.value = res.token
      cache.set('token', res.token)
      ElMessage({
        type: 'success',
        message: '登录成功'
      })
      router.replace({
        name: 'home'
      })
      return res
    } catch {
      throw 'error'
    }
  }

  /** 退出登录 */
  const logout = () => {
    logoutApi().then(
      () => {
        resetRoutes()
        cache.remove('token')
        router.replace({
          name: 'login'
        })
      },
      () => {
        // ...
      }
    )
  }

  /** 获取用户信息 */
  const getUserInfo = async () => {
    try {
      const res = await getUserInfoApi()
      name.value = res.name
      res.avatar && (avatar.value = res.avatar)
      account.value = res.account
      roles.value = res.roles
      return res
    } catch {
      throw 'error'
    }
  }

  /** 重置路由 */
  const resetRoutes = () => {
    try {
      router.getRoutes().forEach((route: RouteRecordRaw) => {
        const { name, meta } = route
        if (name && meta?.roles?.length) {
          router.hasRoute(name) && router.removeRoute(name)
        }
      })
    } catch (error) {
      window.location.reload()
    }
  }

  return { name, avatar, account, token, roles, login, logout, getUserInfo }
})

export const useUserStoreHook = () => useUserStore(store)
