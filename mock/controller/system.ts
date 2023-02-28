export const noticeList = {
  url: '/notice/list',
  response: {
    code: 200,
    message: 'success',
    data: [
      { title: 'Vue3后台管理系统上线啦！' },
      { title: '后台管理系统基础解决方案。' },
      { title: '后续更多功能，敬请关注。', routeName: 'home' }
    ]
  }
}

export const statisticsList = {
  url: '/statistics/list',
  response: {
    code: 200,
    message: 'success',
    data: [
      {
        title: '用户充值',
        total: 265221.6,
        percent: '+40%',
        color: '#ffa900',
        actived: true,
        data: [20, 60, 70, 800, 600, 966, 633]
      },
      {
        title: '用户活跃',
        total: 36552.0,
        percent: '+8%',
        color: '#2a55e5',
        actived: true,
        data: [90, 652, 90, 96, 62, 800, 60]
      },
      {
        title: '用户分析',
        total: 633525.6,
        percent: '-24%',
        color: '#6abf40',
        actived: true,
        data: [852, 658, 20, 63, 85, 652, 63]
      }
    ]
  }
}
