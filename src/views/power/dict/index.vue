<template>
  <div class="container">
    <el-row class="pb-20">字典管理（admin、editor权限可见）</el-row>
    <el-row :gutter="20">
      <el-col :span="8" v-permission="['admin', 'editor']">
        <el-button type="primary">新增（admin、editor可见）</el-button>
      </el-col>
      <el-col :span="8" v-permission="['admin']">
        <el-button type="danger"> 删除（admin可见） </el-button>
      </el-col>
      <el-col :span="8">
        <el-button type="success"> 详情（所有用户可见） </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
