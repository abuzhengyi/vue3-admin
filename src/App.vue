<template>
  <el-config-provider
    :z-index="zIndex"
    :namespace="namespace"
    :button="buttonConfig"
    :message="messageConfig"
  >
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
/** 组件前缀 */
const namespace = ref('el')

/** 全局初始化 zIndex 的值 */
const zIndex = ref(1)

/** 按钮相关的配置 */
const buttonConfig = reactive({
  // 自动在两个中文字符之间插入空格
  autoInsertSpace: true
})

/** 消息相关配置 */
const messageConfig = reactive({
  // 可同时显示的消息最大数量
  max: 50
})
</script>

<style scoped lang="scss"></style>
