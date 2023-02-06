<template>
  <div class="home">
    <layout-header />
    <div class="home-content">
      <!-- 用户信息展示、notice 通知 -->
      <div class="user">
        <el-avatar :src="avatar" :size="28" icon="icon-avatar" />
        <span class="user__account">{{ userAccount }}</span>
        <el-carousel height="20px" direction="vertical" :autoplay="true" indicator-position="none">
          <el-carousel-item v-for="(item, index) in noticeList" :key="index">
            <span>{{ item.title }}</span>
            <a
              v-if="item.routeName"
              class="notice__link"
              href="javascript:void(0)"
              @click="openPage(item.routeName)"
              >去查看</a
            >
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 数据统计 -->
      <div class="data">
        <div class="data-top">
          <div class="data__title">数据概览</div>
          <div class="data__date">
            时间段：
            <el-date-picker
              v-model="date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              value-format="YYYY-MM-DD"
            />
          </div>
        </div>
        <div class="data-grid">
          <div
            :class="['data-grid-item', { 'data-grid-item--active': item.actived }]"
            v-for="(item, index) in statisticsList"
            :key="index"
            @click="changeStatistics(index)"
          >
            <span class="data-grid-item__label">{{ item.title }}</span>
            <span class="data-grid-item__value">{{ item.total }}</span>
            <span
              :class="[
                'data-grid-item__scale',
                /^\+/.test(item.percent)
                  ? 'data-grid-item__scale--rise'
                  : 'data-grid-item__scale--fall'
              ]"
              >环比上月{{ item.percent }}</span
            >
            <transition name="el-zoom-in-center" mode="out-in">
              <span
                v-if="item.actived"
                class="data-grid-item__liner"
                :style="{ 'background-color': item.color }"
              ></span>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <layout-footer />
  </div>
</template>

<script setup lang="ts">
import LayoutHeader from '@/layout/components/LayoutHeader.vue'
import LayoutFooter from '@/layout/components/LayoutFooter.vue'
import { useUserStore } from '@/store/modules/user'
import { getNoticeList, getStatisticsList } from '@/apis/system'
import router from '@/router'

const { name, account, avatar } = useUserStore()

/** 拼接时间提示 */
const userAccount = computed(() => {
  const hours = new Date().getHours(),
    describe =
      hours >= 0 && hours < 10
        ? '早上好' // 0 - 9
        : hours >= 10 && hours < 13
        ? '上午好' // 10 - 12
        : hours >= 13 && hours < 21
        ? '下午好' // 13 - 20
        : hours >= 21 && hours < 0
        ? '晚上好' // 21 - 23
        : '你好'

  return `${describe}，${account}`
})

/** 获取系统通知 */
const noticeList = ref<any[]>([])
const getNotice = () => {
  getNoticeList().then((res) => {
    noticeList.value = res
  })
}

/** 打开页面 */
const openPage = (name: string | undefined) => {
  if (!name) return
  router.push({
    name
  })
}

/** 获取统计数据 */
const date = ref()
const statisticsList = ref<any[]>([])
const getStatistics = () => {
  getStatisticsList({
    date: date.value
  }).then((res) => {
    statisticsList.value = res
  })
}

/** 切换统计数据显示 */
const changeStatistics = (index: number) => {
  const actived = statisticsList.value[index].actived
  if (actived && statisticsList.value.filter((item) => item.actived).length === 1) return
  statisticsList.value[index].actived = !actived
}

getNotice()
getStatistics()
</script>

<style scoped lang="scss">
.home {
  @extend .pt-20, .pb-20;
  width: 82%;
  margin: 0 auto;
}

.user {
  @extend .flex, .flex-vcenter, .pl-20, .pr-20;
  height: 52px;
  border-radius: var(--el-border-radius-base);
  background: #fff url('@/assets/images/home/work.png') no-repeat right center / 136px auto;
  &__account {
    @extend .ml-5;
    font-size: var(--el-font-size-extra-small);
    font-weight: bold;
    color: #323335;
  }
  .el-carousel {
    @extend .flex-1;
    margin-right: 70px;
    line-height: 20px;
    text-align: right;
    font-size: var(--el-font-size-small);
    color: var(--el-text-color-regular);
  }
  .notice__link {
    @extend .pr-5;
  }
}

.data {
  @extend .p-20, .mt-20;
  background-color: #fff;
  &-top {
    @extend .flex;
    justify-content: space-between;
  }
  &__date {
    @extend .inline-flex;
    @extend .flex-vcenter;
    font-size: var(--el-font-size-small);
  }
  &__title {
    font-size: var(--el-font-size-large);
    font-weight: bold;
  }
  &-grid {
    @extend .flex, .mt-50, .mb-50;
    justify-content: space-between;
    &-item {
      @extend .relative, .inline-flex, .p-20;
      flex-direction: column;
      width: 30%;
      border-radius: var(--el-border-radius-base);
      background-color: #f8f8f9;
      cursor: pointer;
      &__label {
        font-size: var(--el-font-size-small);
        color: var(--el-text-color-secondary);
      }
      &__scale {
        font-size: var(--el-font-size-small);
        font-weight: bold;
        &--rise {
          color: var(--el-color-danger);
        }
        &--fall {
          color: var(--el-color-success);
        }
      }
      &__value {
        margin: 3px 0;
        font-size: var(--el-font-size-large);
        font-weight: bold;
      }
      &__liner {
        @extend .absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
      }
      &--active {
        &:nth-child(1) {
          background-color: var(--el-color-warning-light-9);
        }
        &:nth-child(2) {
          background-color: var(--el-color-primary-light-9);
        }
        &:nth-child(3) {
          background-color: var(--el-color-success-light-9);
        }
      }
    }
  }
}
</style>
