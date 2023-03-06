import type { App, Plugin, Directive } from 'vue'

/** 自动注册自定义指令 */
export default <Plugin>{
  async install(app: App) {
    // 导入所有自定义指令模块
    const modules: Record<string, Directive> = import.meta.glob('./controller/*.ts', {
      eager: true,
      import: 'default'
    })
    for (const [path, directive] of Object.entries(modules)) {
      // 根据文件路径获取 name
      const name = path.match(/\/((\w)*)\.ts/)?.[1]
      // 注册自定义指令
      name && app.directive(name, directive)
    }
  }
}
