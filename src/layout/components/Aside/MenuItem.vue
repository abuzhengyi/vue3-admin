<template>
  <el-menu-item :index="props.name">
    <el-icon v-if="props.meta.icon">
      <component :is="`icon-ep-${props.meta.icon}`"></component>
    </el-icon>
    <template #title>
      {{ props.meta.title }}
    </template>
  </el-menu-item>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string
  meta: {
    title: string
    icon: string
  }
}>()
</script>

<style scoped lang="scss"></style>
