import { ref } from 'vue'
import store from '@/store'
import { defineStore } from 'pinia'
import { sendLogin, sendLogout, type LoginData, type LogoutData } from '@/apis/user'
import router from '@/router'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref<string>('')

    // 登录
    const login = async (data: LoginData) => {
      try {
        const res = await sendLogin(data)
        token.value = res.token
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

    // 退出登录
    const logout = (data: LogoutData) => {
      sendLogout(data).then(
        () => {
          // ...
        },
        () => {
          // ...
        }
      )
    }

    return { token, login, logout }
  },
  {
    // persist: true,
    persist: {
      storage: sessionStorage,
      paths: ['token']
    }
  }
)

export const useUserStoreHook = () => useUserStore(store)
