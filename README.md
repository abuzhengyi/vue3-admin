<div align="center">
  <img alt="V3 Admin Logo" width="120" height="120" src="./src/assets/images/common/logo.svg">
  <h1>V3 Admin</h1>
  <span>中文 | <a href="./README_EN.md">English</a><span>
</div>

## ⚡ 简介

一个基于 Vue3、 Element Plus、TypeScript、Vite、Pinia 等主流技术的后台管理系统基础解决方案.

## ✨ 特性

- **Vue3**：采用 Vue3 最新的组合式 API（更好的逻辑复用和更灵活的代码组织）
- **TypeScript**：JavaScript 语言的超集（避免运行时错误）
- **Vite**：更快的前端自动化构建工具（真正的按需编译和模块热更新）
- **Vue Router**：Vue 路由
- **Pinia**: Vue3 的状态存储库
- **Axios**：HTTP 请求（已封装）
- **Mock**：拦截 HTTP 请求，返回模拟的响应数据
- **Element Plus**：Element UI 的 Vue3 版本
- **ECharts**：数据可视化图表库
- **SCSS**：使用与 Element Plus 一致的 CSS 预处理语言
- **ESlint + Stylelint + Prettier**：代码校验与风格统一
- **自动按需导入**：无需手动引入 El 组件、El 图标、El 方法、Vue3 API
- **注释**：尽可能详细的注释

## 🌱 功能

- **用户管理**：登录、登出演示
- **权限管理**：路由守卫、动态路由、权限指令
- **错误页面**: 403、404
- **多环境**：开发环境（development）、预发布环境（staging）、生产环境（production）

## 🚀 开始

### 版本

> Node 版本需要 16+，npm 版本需要 8+，当你的包管理器发出警告时，请注意升级你的 Node 版本.

```bash
# 查看 Node 版本
node -v

# 查看 npm 版本
npm -v
```

### 启动

```bash
# 克隆项目
git clone https://github.com/abuzhengyi/v3-admin.git

# 进入项目目录
cd v3-admin

# 安装依赖（国内用户推荐使用淘宝镜像安装）
npm i --registry=https://registry.npm.taobao.org

# 启动服务
npm dev
```

### 打包

```bash
# 打包预发布环境
npm run build:staging

# 打包生产环境
npm run build:production
```

### 预览

```bash
# 预览预发布环境
npm run preview:staging

# 预览生产环境
npm run preview:production
```

### 代码格式

```bash
# 手动修复
npm run lint

# 自动修复
使用 VSCode 打开项目会提示安装 ESLint、StyleLint、Prettier 三个插件，安装完成后 ctrl + s 保存即可自动格式化修复.
```

## 💕 Star

小项目开源不易，如果您觉得还不错的话，动动您的小手给作者点个 Star 吧，您的支持将是作者最大的动力！
