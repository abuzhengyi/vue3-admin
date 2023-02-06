import { ref } from 'vue'
import store from '@/store'
import { defineStore } from 'pinia'
import { sendLogin, sendLogout, type LoginData, type LogoutData } from '@/apis/user'
import router from '@/router'
import defaultAvatar from '@/assets/images/user/avatar.png'

export const useUserStore = defineStore(
  'user',
  () => {
    const name = ref('')
    const avatar = ref('' || defaultAvatar)
    const account = ref('')
    const token = ref('')

    // 登录
    const login = async (data: LoginData) => {
      try {
        const res = await sendLogin(data)
        name.value = res.name
        res.avatar && (avatar.value = res.avatar)
        account.value = res.account
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

    return { name, avatar, account, token, login, logout }
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
