const data = [
  {
    path: '/mall',
    component: 'Layout',
    name: 'Mall',
    meta: {
      title: '商城',
      icon: 'shopping-cart',
      keepAlive: true,
      permissions: ['admin']
    }
  }
]

export default {
  url: '/menu',
  method: 'post',
  response: {
    code: 200,
    messages: 'success',
    data
  }
}
