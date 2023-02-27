import { get, post } from '@/utils/request'
import md5 from 'md5'

/** 登录 */
export interface LoginData {
  account: string
  password: string
}

export const loginApi = ({ account, password }: LoginData) => {
  password &&= md5(password)
  return post('/login', {
    account,
    password
  })
}

/** 退出登录 */
export const logoutApi = () => post('/logout')

/** 获取用户信息 */
export const getUserInfoApi = () => post('/user/info')
