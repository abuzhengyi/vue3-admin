<template>
  <el-container class="h-100" direction="vertical">
    <!-- header -->
    <layout-header />
    <el-container class="h-0">
      <!-- aside -->
      <layout-aside :show="isMultilayer" />
      <el-container direction="vertical">
        <el-scrollbar always>
          <!-- main -->
          <layout-main />
          <!-- footer -->
          <layout-footer />
        </el-scrollbar>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { useRouter, useRoute, type RouteRecordRaw, type RouteRecordName } from 'vue-router'
import LayoutHeader from '@/layout/components/Header.vue'
import LayoutAside from '@/layout/components/Aside/index.vue'
import LayoutMain from '@/layout/components/Main.vue'
import LayoutFooter from '@/layout/components/Footer.vue'

const route = useRoute()

// 菜单是否多层级
const isMultilayer = computed(() => route.matched.length > 2)
</script>
