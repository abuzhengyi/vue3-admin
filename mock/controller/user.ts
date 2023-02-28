import cache from '../../src/utils/cache'

export const login = {
  url: '/login',
  method: 'post',
  response: ({ body }) => {
    const { account, password } = JSON.parse(body)
    return {
      code: 200,
      message: 'success',
      data: {
        token: `${account + password}`
      }
    }
  }
}

export const logout = {
  url: '/logout',
  method: 'post',
  response: {
    code: 200,
    message: 'success'
  }
}

export const userInfo = {
  url: '/user/info',
  method: 'post',
  response: () => {
    const token = <string>cache.get('token')
    let data = {}
    if (/^admin.*/.test(token)) {
      data = {
        name: 'admin',
        account: 'admin',
        avatar: '',
        roles: ['admin', 'editor']
      }
    } else if (/^editor.*/.test(token)) {
      data = {
        name: 'editor',
        account: 'editor',
        avatar: '',
        roles: ['editor']
      }
    } else {
      data = {}
    }
    return {
      code: 200,
      message: 'success',
      data
    }
  }
}
