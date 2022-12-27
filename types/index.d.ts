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
  type UploadInstance = import('element-plus/es').UploadInstance
  type UploadRawFile = import('element-plus/es').UploadRawFile
}