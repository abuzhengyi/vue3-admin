<template>
  <el-aside v-if="props.show" :class="{ 'aside--collapse': collapse }">
    <el-container class="h-100" direction="vertical">
      <!-- 头部 -->
      <div class="aside-title">
        <!-- 副标题 -->
        <span class="aside-title__text">
          {{ subtitle }}
        </span>
        <!-- 折叠按钮 -->
        <el-icon class="aside-title__icon" :size="20" @click="handleCollapse">
          <component :is="!collapse ? 'icon-ep-fold' : 'icon-ep-expand'"></component>
        </el-icon>
      </div>
      <!-- 二级菜单 -->
      <el-scrollbar>
        <el-menu
          :default-active="activeMenu"
          unique-opened
          :collapse="collapse"
          @select="handleMenu"
        >
          <sub-menu :list="menuList" />
        </el-menu>
      </el-scrollbar>
    </el-container>
  </el-aside>
</template>

<script setup lang="ts">
import { useRouter, useRoute, type RouteRecordRaw, type RouteRecordName } from 'vue-router'
import { useAppStore } from '@/store/modules/app'
import SubMenu from './SubMenu.vue'

const router = useRouter()
const route = useRoute()
const appStore = useAppStore()

const props = defineProps<{
  show: boolean
}>()

/** aside 折叠 */
const collapse = computed(() => appStore.collapse)
const handleCollapse = () => {
  appStore.setCollapse(!appStore.collapse)
}

/** 二级 menu 菜单 */
// 副标题
const subtitle = ref()

// 二级菜单列表
const menuList = computed<RouteRecordRaw[]>(() => {
  const routeParent = route.matched[0]
  subtitle.value = routeParent.meta.subtitle || routeParent.meta.title
  return routeParent.children
})

// 当前激活菜单 name
const activeMenu = computed<any>(() => route.name)

// 跳转
const handleMenu = (name: RouteRecordName) => {
  router.push({
    name
  })
}
</script>

<style scoped lang="scss">
.el-aside {
  --el-aside-width: var(--v3-aside-width);

  background-color: #fff;
  box-shadow: 0 0 8px #e6e6e6;
  transition: width linear 300ms;
  user-select: none;
}

.aside {
  &__title {
    @extend .flex-hcenter;

    padding-left: 0;
  }

  &--collapse {
    width: var(--v3-aside-width-collapse);

    .aside-title__text {
      width: 0;
      opacity: 0;
    }

    .aside-title {
      justify-content: center;
    }
  }

  &-title {
    @extend .flex, .flex-vcenter;

    height: var(--v3-header-height);
    padding: 0 10px;
    font-weight: bold;
    border-bottom: 1px solid #e6e6e6;
    justify-content: space-between;

    &__text {
      transition: width, opacity linear 300ms;
      white-space: nowrap;
    }

    &__icon {
      @extend .hover;
    }
  }
}

.el-menu {
  border-right-width: 0;
}
</style>
