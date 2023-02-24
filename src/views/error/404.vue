<template>
  <div class="not-found">
    <div class="not-found-content">
      <img class="not-found__image" :src="notFoundUrl" alt="404" />
      <span class="not-found-tip">
        <span class="not-found__text">页面不小心走丢了~，您可以</span>
        <el-button type="primary" link @click="backHome">
          <el-icon>
            <icon-ep-d-arrow-left />
          </el-icon>
          返回首页
        </el-button>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import notFoundUrl from '@/assets/images/error/404.svg'

const backHome = () => {
  router.replace({
    name: 'home'
  })
}
</script>

<style scoped lang="scss">
.not-found {
  @extend .absolute;

  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  color: var(--el-text-color-secondary);
  background-color: #fff;

  &-content {
    position: relative;
    width: 520px;
    margin: 0 auto;
  }

  &-tip {
    @extend .flex, .flex-vcenter, .flex-hcenter;
  }

  &__image {
    width: 100%;
  }

  &__text,
  .el-button {
    font-size: var(--el-font-size-medium);
  }
}
</style>
