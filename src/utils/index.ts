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
