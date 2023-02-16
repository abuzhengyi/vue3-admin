<template>
  <template v-for="item in props.list" :key="item.name">
    <el-sub-menu v-if="item.children" :index="item.path">
      <template #title>
        <el-icon>
          <component :is="`icon-ep-${item.meta.icon}`"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <sub-menu :list="item.children" />
    </el-sub-menu>
    <menu-item v-else :name="item.name" :meta="item.meta" />
  </template>
</template>

<script setup lang="ts">
import MenuItem from './MenuItem.vue'

const props = defineProps<{
  list: any[]
}>()
</script>

<style scoped lang="scss"></style>
