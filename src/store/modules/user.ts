import { ref } from 'vue'
import router from '@/router'
import store from '@/store'
import { defineStore } from 'pinia'
import { sendLogin, sendLogout, type LoginData } from '@/apis/user'
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
    const logout = () => {
      sendLogout().then(
        () => {
          router.replace({
            name: 'login'
          })
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
