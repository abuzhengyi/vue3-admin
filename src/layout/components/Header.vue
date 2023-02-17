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
    <!-- 工具 -->
    <div class="header-tools">
      <span class="header-tools-item" @click="handleFullScreen">
        <el-icon :size="20">
          <icon-ep-full-screen />
        </el-icon>
      </span>
      <el-divider direction="vertical" />
      <el-dropdown @command="handleDropdown">
        <span class="header-tools-item header-tools-user">
          <el-avatar :src="userStore.avatar" :size="32" icon="icon-avatar" />
          <div class="header-tools-name">
            <span class="header-tools__user">{{ userStore.account }}</span>
          </div>
          <el-icon class="header-tools__arrow" :size="14">
            <icon-ep-arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu class="header-tools-dropdown">
            <el-dropdown-item command="center" icon="icon-ep-setting">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout" icon="icon-ep-download">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import { useRouter, useRoute, type RouteRecordRaw, type RouteRecordName } from 'vue-router'
import type { TabsPaneContext } from 'element-plus'
import { useAppStore } from '@/store/modules/app'
import { useUserStore } from '@/store/modules/user'
import logoUrl from '@/assets/images/common/logo.svg'
import logoTextUrl from '@/assets/images/common/logo-text.svg'

const router = useRouter()
const route = useRoute()
const appStore = useAppStore()
const userStore = useUserStore()

/** aside 折叠 */
const collapse = computed(() => appStore.collapse)

/** 全屏切换 */
const fullScreen = ref(false)
const handleFullScreen = () => {
  fullScreen.value = !!document.fullscreen

  if (!fullScreen.value) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

/** 用户下拉菜单 */
const handleDropdown = (command: string) => {
  if (command === 'logout') {
    ElMessageBox.confirm('确认退出登陆？', '提示', {
      type: 'warning',
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    }).then(
      () => {
        userStore.logout()
      },
      () => {
        // ...
      }
    )
  } else if (command === 'center') {
    router.push({
      name: 'center'
    })
  }
}

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
  @extend .flex, .flex-vcenter, .pr-20;
  z-index: 1001;
  padding-left: 0;
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

  &-tools {
    @extend .flex;
    @extend .flex-vcenter;
    margin-right: var(--spacing-base);

    &-item {
      @extend .flex, .flex-hcenter, .flex-vcenter, .hover, .pl-10, .pr-10;
      min-height: 40px;
      font-size: var(--el-font-size-large);
      cursor: pointer;
    }

    &-name {
      @extend .flex, .flex-hcenter, .pl-5, .pr-5;
      flex-direction: column;
    }

    &-dropdown {
      width: 140px;
    }

    &__user {
      max-width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: var(--el-font-size-base);
      white-space: nowrap;
    }

    &-logout {
      @extend .flex, .flex-vcenter, .flex-hbetween;
      height: 100%;
      flex: 1;
    }

    &__arrow {
      transform: var(--el-menu-icon-transform-closed, rotateZ(0));
      transition: transform var(--el-transition-duration);
    }

    &-user:hover {
      .header-tools__arrow {
        transform: var(--el-menu-icon-transform-open, rotateZ(180deg));
      }
    }
  }
}

.el-dropdown-menu :deep(.el-dropdown-menu__item:last-child .el-icon) {
  transform: rotateZ(90deg);
}
</style>
