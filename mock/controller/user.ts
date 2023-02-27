export const login = {
  url: '/login',
  method: 'post',
  response: {
    code: 200,
    message: 'success',
    data: {
      token: 'ki98hgh09gfjksiwutryw'
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
  response: {
    code: 200,
    message: 'success',
    data: {
      name: 'admin',
      account: 'admin',
      avatar: '',
      roles: ['admin']
    }
  }
}
