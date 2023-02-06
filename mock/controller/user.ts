const data = {
  token: 'xxx'
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
