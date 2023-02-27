export {}

declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.json'
declare module '*.js'

declare global {
  type FormInstance = import('element-plus/es').FormInstance
}
