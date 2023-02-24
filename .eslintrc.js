module.exports = {
  /** 环境变量 */
  env: {
    browser: true,
    node: true,
    es6: true
  },

  /** 全局变量，避免 no-undef 规则发出警告 */
  globals: {
    ref: 'readonly',
    reactive: 'readonly',
    computed: 'readonly',
    readonly: 'readonly',
    watchEffect: 'readonly',
    watchPostEffect: 'readonly',
    watchSyncEffect: 'readonly',
    watch: 'readonly',
    isRef: 'readonly',
    unref: 'readonly',
    toRef: 'readonly',
    toRefs: 'readonly',
    isProxy: 'readonly',
    isReactive: 'readonly',
    isReadonly: 'readonly',
    onMounted: 'readonly',
    onUpdated: 'readonly',
    onUnmounted: 'readonly',
    onBeforeMount: 'readonly',
    onBeforeUpdate: 'readonly',
    onBeforeUnmount: 'readonly',
    onErrorCaptured: 'readonly',
    onRenderTracked: 'readonly',
    onRenderTriggered: 'readonly',
    onActivated: 'readonly',
    onDeactivated: 'readonly',
    onServerPrefetch: 'readonly',
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    FormInstance: 'readonly'
  },

  /** 插件配置，提供处理器，插件名称可以省略 eslint-plugin- 前缀 */
  // 处理器从文件中提取 JS 代码，然后让 ESLint 检测
  plugins: ['vue', '@typescript-eslint'],
  // 为特定类型的文件指定处理器
  overrides: [],

  /** 解析器配置，默认解析器为 espree */
  // .vue 文件中的 `<template>` 解析器
  parser: 'vue-eslint-parser',
  // 解析器选项
  parserOptions: {
    // .vue 文件中的 `<script>` 解析器
    parser: {
      js: 'espree',
      ts: '@typescript-eslint/parser'
    },
    // 使用 es 最新版本
    ecmaVersion: 'latest',
    // 使用 es 模块
    sourceType: 'module'
  },

  /** 启用默认规则 */
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended'
  ],

  /**
   * 规则配置，优先级高于 extends
   * "off" 或 0 - 关闭规则
   * "warn" 或 1 - 开启警告(不会导致程序退出)
   * "error" 或 2 - 开启错误(程序会退出)
   */
  rules: {
    // Vue 组件名称
    'vue/multi-word-component-names': 'off',
    // 已定义但未使用的变量
    '@typescript-eslint/no-unused-vars': 'off',
    // 使用 any 类型
    '@typescript-eslint/no-explicit-any': 'off'
  }
}
