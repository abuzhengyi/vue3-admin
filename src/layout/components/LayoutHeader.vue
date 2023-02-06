<template>
  <el-header class="header">
    <!-- logo -->
    <div class="header-logo" :class="{ 'header-logo--spread': collapse }">
      <img v-if="collapse" class="header-logo__image" :src="logoUrl" alt="logo" />
      <img v-else class="header-logo__image" :src="logoTextUrl" alt="logo" />
    </div>
  </el-header>
  <!-- 占位 -->
  <div class="header--empty"></div>
</template>

<script setup lang="ts">
import logoUrl from '@/assets/images/common/logo.svg'
import logoTextUrl from '@/assets/images/common/logo-text.svg'

const collapse = ref(false)
</script>

<style scoped lang="scss">
.header {
  @extend .flex, .flex-vcenter;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1002;
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
  user-select: none;
  &,
  &--empty {
    height: var(--v3-header-height);
    min-width: var(--v3-main-width-min);
  }
  &-logo {
    @extend .flex, .flex-vcenter;
    width: var(--v3-aside-width);
    padding-left: var(--spacing-base);
    transition: width linear 300ms;
    overflow: hidden;
    &__image {
      height: 36px;
    }
    &__text {
      margin-left: 5px;
      font-size: var(--el-font-size-extra-large);
      color: var(--el-color-primary);
      white-space: nowrap;
    }
    &--spread {
      @extend .flex-hcenter;
      width: var(--v3-aside-width-collapse);
      padding-left: 0;
    }
  }
}
</style>
