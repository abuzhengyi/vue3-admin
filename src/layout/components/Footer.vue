<template>
  <el-footer>
    <span v-html="VITE_APP_COPYRIGHT"></span>
  </el-footer>
</template>

<script setup lang="ts">
const { VITE_APP_COPYRIGHT } = import.meta.env
</script>

<style scoped lang="scss">
.el-footer {
  height: var(--v3-footer-height);
  padding: 0;
  line-height: var(--v3-footer-height);
  font-size: var(--el-font-size-base);
  text-align: center;
  color: var(--el-text-color-secondary);
  user-select: none;
}
</style>
