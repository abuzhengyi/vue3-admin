const data = {
  name: 'admin',
  avatar: '',
  account: 'admin1',
  token: 'ki98hgh09gfjksiwutryw'
}

export const login = {
  url: '/login',
  method: 'post',
  response: {
    code: 200,
    message: 'error',
    data
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
