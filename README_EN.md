<div align="center">
  <img alt="V3 Admin Logo" width="120" height="120" src="./src/assets/images/common/logo.svg">
  <h1>V3 Admin</h1>
  <span><a href="./README.md"> 中文</a> | English<span>
</div>

## ⚡ Introduction

A background management system foundation solution based on Vue 3, Element Plus, TypeScript, Vite, Pinia and other mainstream technologies.

## ✨ Feature

- **Vue3**：Use Vue 3's latest combined API (better logic reuse and more flexible code organization)
- **TypeScript**：JavaScript Superset of languages (avoid runtime errors)
- **Vite**：Faster front-end automation building tools (true on-demand compilation and module hot updates)
- **Vue Router**：Router
- **Pinia**: Status repository for Vue 3
- **Axios**：HTTP request (encapsulated)
- **Mock**：Intercept HTTP requests, return simulated data
- **Element Plus**：The Vue 3 version of the Element UI
- **ECharts**：Data visualization chart library
- **SCSS**：Using a CSS preprocessing language consistent with the Element Plus
- **ESlint + Stylelint + Prettier**：Code check and style unity
- **Automatically import on demand**：No need to manually introduce El components, El icon, El method, Vue3 API
- **Note**：Note that is as detailed as possible

## 🌱 Functions

- **User management**：Log in and login out of the demo
- **Authority management**：Routing guard, dynamic routing, and permission instruction
- **Error page**: 403、404
- **Multiple Environments**：Development, Staging, Production

## 🚀 Start

### Version

> Node, the version needs 16 +, the npm version needs 8 +, please be careful to upgrade your Node version when your package manager issues the warning.

```bash
# View the Node version
node -v

# View the npm version
npm -v
```

### Startover

```bash
# Clone project
git clone https://github.com/abuzhengyi/v3-admin.git

# Enter the project directory
cd v3-admin

# Install dependencies
npm i

# Start the service
npm dev
```

### Build

```bash
# Staging environment
npm run build:staging

# Production environment
npm run build:production
```

### Preview

```bash
# Staging environment
npm run preview:staging

# Production environment
npm run preview:production
```

### Code format

```bash
# Hand movement
npm run lint

# Voluntarily
Opening the project with VSCode will prompt you to install ESLint, StyleLint and Prettier. After installation, ctrl + s can be saved to automatically formformat and repair.
```

## 💕 Star

Small project is not easy to open source, if you think it is good, move your little hand to the author point a Star, your support will be the author's biggest power!
