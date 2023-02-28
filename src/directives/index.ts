import type { App, Directive } from 'vue'

/** 自动注册自定义指令 */
export default {
  async install(app: App) {
    // 导入所有自定义指令模块
    const modules: (() => Promise<any>)[] = Object.values(import.meta.glob('./controller/*.ts'))
    for (const module of modules) {
      // 根据文件路径获取 name
      const name = module.name.match(/\/((\w)*)\.ts/)?.[1]
      // 注册自定义指令
      for (const directive of <Directive[]>Object.values(await module())) {
        name && app.directive(name, directive)
      }
    }
  }
}
