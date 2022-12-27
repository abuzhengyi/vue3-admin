import router from '@/router'
import { useUserStoreHook } from '@/store/modules/user'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const user = useUserStoreHook()

/** 进度条配置 */
NProgress.configure({
  template: `<div class='bar' role='bar'></div>`,
  easing: 'ease', 
  speed: 300
})

/** 前置守卫 */
router.beforeEach((to, from, next) => {
  // 开始进度条
  NProgress.start();
  // 非登陆页 && 无 token
  if (to.name !== 'login' && !user.token?.length) {
    next({
      name: 'login'
    });
  }
  next();
})

/** 后置钩子 */
router.afterEach((to, from, next) => {
  // 完成进度条
  NProgress.done();
  // 设置 title
  document.title = `${ import.meta.env.VITE_APP_TITLE }-${ to.meta.title }`;
})
