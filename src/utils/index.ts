/** 获取 css 变量 */
export const getCssVar = (key: string): string => {
  // document.querySelector(':root') 等价 document.documentElement
  const value = getComputedStyle(document.documentElement).getPropertyValue(key)
  // 有单位截掉单位
  return value.replace('px', '')
}

/** 设置 css 变量 */
export const setCssVar = (key: string, value: string) => {
  document.documentElement.style.setProperty(key, value)
}

/** 防抖 */
let timer: null | number = null
export const debounce = (callback: () => void, wait = 500) => {
  timer && clearTimeout(timer)
  timer = window.setTimeout(callback, wait)
}

/** 节流 */
let running = false
export const throttle = (callback: () => void, wait = 500) => {
  if (!running) {
    running = true
    callback()
    window.setTimeout(() => {
      running = false
    }, wait)
  }
}

/** 字符串正则验证 */
export const regMap: { [key: string]: RegExp } = {
  // 手机号码
  mobile: /^1[3-9][0-9]{9}$/,
  // 座机
  tel: /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/,
  // 身份证
  card: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  // 6位数字验证码
  mobileCode: /^[0-9]{6}$/,
  // 登录账号，体验功能测试用账号，admin 或 editor
  account: /^(admin|editor)$/,
  // 登录密码，以字母开头，长度在6~14之间，只能包含字母、数字和下划线
  password: /^([a-zA-Z0-9_]){6,14}$/,
  // 支付密码，6位纯数字
  payPassword: /^[0-9]{6}$/,
  // 邮政编码
  postal: /[1-9]\d{5}(?!\d)/,
  // QQ 号
  QQ: /^[1-9][0-9]{4,9}$/,
  // 邮箱
  email: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
  // 金额，小数点2位
  money: /^\d*(?:\.\d{0,2})?$/,
  // 网址
  URL: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?/,
  // IP
  IP: /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/,
  // 日期，2023-02-10
  date: /^(\d{4})-(\d{2})-(\d{2})$/,
  // 日期时间，2023-02-10 20:25:08
  dateTime: /^(\d{4})-(\d{2})-(\d{2}) (\d{2})(?::\d{2}|:(\d{2}):(\d{2}))$/,
  // 数字
  number: /^[0-9]$/,
  // 英文
  english: /^[a-zA-Z]+$/,
  // 中文
  chinese: /^[\\u4E00-\\u9FA5]+$/,
  // 小写
  lower: /^[a-z]+$/,
  // 大写
  upper: /^[A-Z]+$/,
  // HTML 标记
  HTML: /<("[^"]*"|'[^']*'|[^'">])*>/
}
export const regValidator = (key: keyof typeof regMap, str: string): boolean =>
  regMap[key].test(str)
