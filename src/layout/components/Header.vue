<template>
  <el-header>
    <!-- logo -->
    <div class="header-logo" :class="{ 'header-logo--spread': collapse }">
      <img class="header-logo__image" :src="collapse ? logoUrl : logoTextUrl" alt="logo" />
    </div>
    <!-- 一级 tab 菜单 -->
    <el-tabs class="header-tabs" :model-value="activeMenu" @tab-click="handleMenu">
      <el-tab-pane
        v-for="(item, index) in menuList"
        :key="index"
        :label="item.meta.title"
        :name="item.name"
      />
    </el-tabs>
    <!--  -->
  </el-header>
</template>

<script setup lang="ts">
import { useRouter, useRoute, type RouteRecordRaw, type RouteRecordName } from 'vue-router'
import type { TabsPaneContext } from 'element-plus'
import { useAppStore } from '@/store/modules/app'
import logoUrl from '@/assets/images/common/logo.svg'
import logoTextUrl from '@/assets/images/common/logo-text.svg'

const router = useRouter()
const route = useRoute()
const appStore = useAppStore()

/** aside 折叠 */
const collapse = computed(() => appStore.collapse)

/** 一级 tab 菜单 */
// 一级菜单列表
const menuList = computed<any[]>(() => router.getRoutes().filter((item) => item.meta?.menu))

// 当前激活菜单 name
const activeMenu = computed<any>(() => {
  try {
    const [{ name: prevName }, { name: nextName }] = route.matched
    return prevName || nextName
  } catch {
    return void 0
  }
})

// 跳转
const handleMenu = (pane: TabsPaneContext) => {
  router.push({
    name: <RouteRecordName>pane.paneName
  })
}
</script>

<style scoped lang="scss">
.el-header {
  --el-header-height: var(--v3-header-height);
  @extend .flex, .flex-vcenter;
  z-index: 1001;
  padding: 0;
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
  user-select: none;

  :deep(.el-tabs__nav-wrap::after) {
    height: 0;
  }

  :deep(.el-tabs__header) {
    margin: 0;
  }
}

.header {
  &-logo {
    @extend .flex, .flex-hcenter;
    width: var(--v3-aside-width);
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

  &-tabs {
    width: 0;
    padding: 0 20px;
    flex: 1;
  }
}
</style>
