import type { Directive } from 'vue'
import { useUserStoreHook } from '@/store/modules/user'

/** 权限指令 */
export default <Directive>{
  mounted(el, binding) {
    const { value } = binding
    const roles = useUserStoreHook().roles
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value
      const hasPermission = roles.some((role) => {
        return permissionRoles.includes(role)
      })
      if (!hasPermission) {
        el.style.display = 'none'
      }
    } else {
      throw new Error(`Need roles! Like v-permission="['admin','editor']"`)
    }
  }
}
