import { get, post } from '@/utils/request'
import md5 from 'md5'

/** 登录 */
export interface LoginData {
  account: string
  password: string
}

export const sendLogin = ({ account, password }: LoginData) => {
  password &&= md5(password)
  return post('/login', {
    account,
    password
  })
}

/** 退出登录 */
export interface LogoutData {
  account: string
}

export const sendLogout = (data: LogoutData) => post('/login', data)
