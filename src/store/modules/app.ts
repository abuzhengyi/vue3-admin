import { ref } from 'vue'
import store from '@/store'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const collapse = ref(false)

  // 设置 aside 折叠
  const setCollapse = (val: boolean) => {
    collapse.value = val
  }

  return { collapse, setCollapse }
})

export const useAppStoreHook = () => useAppStore(store)
