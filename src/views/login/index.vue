<template>
  <div class="login">
    <div class="login-left">
      <img class="login__logo" :src="logoUrl" alt="logo" />
      <div class="login__describe">
        一个基于 Vue3、 Element Plus、TypeScript、Vite、Pinia 等主流技术的后台管理系统基础解决方案.
      </div>
      <div class="login__copyright">Copyright &copy; 2022 版权所有xxx有限责任公司</div>
    </div>
    <div class="login-right">
      <div class="login-form">
        <div class="login-form__title">登录</div>
        <el-form class="login-form-wrap" ref="formRef" :model="form" :rules="rules">
          <el-form-item class="form-item" prop="account" label="账号：">
            <el-input
              v-model="form.account"
              type="text"
              placeholder="请输入账号"
              :autofocus="!autofocus"
              clearable
              @keyup.enter="handleLogin"
            >
              <template #prefix>
                <el-icon>
                  <icon-ep-user />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item class="form-item" prop="password" label="密码：">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
              :autofocus="autofocus"
              show-password
              clearable
              @keyup.enter="handleLogin"
            >
              <template #prefix>
                <el-icon>
                  <icon-ep-lock />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item class="form-item form-item-auto">
            <div class="form-item-wrap">
              <el-checkbox v-model="rememberMe">记住我</el-checkbox>
              <a href="javascript:void(0)">忘记密码</a>
            </div>
          </el-form-item>
          <el-form-item class="form-item">
            <el-button class="form-item" type="primary" :loading="loading" @click="handleLogin">{{
              `登录 ${loading ? '...' : ''}`
            }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/modules/user'
import type { LoginData } from '@/apis/user'
import logoUrl from '@/assets/images/common/logo-text.svg'

const { login } = useUserStore()

const rememberMe = ref(false)
const form = reactive(<LoginData>{})
const rules = reactive({
  account: [
    {
      required: true,
      message: '请输入账号',
      trigger: ['blur', 'change']
    },
    {
      validator: (rule: any, value: string, callback: any) => {
        if (!/^\w{6,14}$/.test(value)) {
          callback(new Error('账号应以字母开头，长度6-14位的大小写字母、数字、下划线组合'))
        } else {
          callback()
        }
      },
      trigger: ['blur', 'change']
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: ['blur', 'change']
    },
    {
      validator: (rule: any, value: string, callback: any) => {
        if (!/^\w{6,14}$/.test(value)) {
          callback(new Error('密码长度应为6-14位，且仅包含大小写字母、数字、下划线'))
        } else {
          callback()
        }
      },
      trigger: ['blur', 'change']
    }
  ]
})
const autofocus = computed(() => form.account?.length)
const loading = ref(false)
const formRef = ref<FormInstance | null>(null)
const handleLogin = async () => {
  if (await formRef.value?.validate(valid => valid)) {
    loading.value = true
    login(form)
      .catch(() => {
        // 避免控制台错误提示
      })
      .finally(() => {
        loading.value = false
      })
  }
}
</script>

<style scoped lang="scss">
.login {
  @extend .flex;

  height: 100vh;
  overflow: hidden;

  &-left {
    @extend .flex, .flex-1, .pt-100, .pl-40;

    position: relative;
    background: #f7faff url('@/assets/images/login/map.png') no-repeat 20% 80% / 100% 80%;
    align-items: flex-start;
    flex-direction: column;
  }

  &__logo {
    height: 40px;
    transform: translate3d(-8px, 0, 0);
  }

  &__title {
    @extend .mt-20;

    font-size: 26px;
    font-weight: bold;
  }

  &__describe {
    @extend .mt-20, .flex-1;

    width: 600px;
    font-size: 20px;
    color: var(--el-text-color-regular);
  }

  &__copyright {
    @extend .pb-10;

    font-size: var(--el-font-size-extra-small);
    color: var(--el-text-color-secondary);
  }

  &-right {
    position: relative;
    width: 30%;
    background: #0672ff url('@/assets/images/login/build.png') no-repeat 0 0 / 100% 100%;
  }

  &-form {
    @extend .p-20;

    position: absolute;
    top: 50%;
    left: 0;
    z-index: 2;
    width: 360px;
    background-color: #fff;
    border-radius: 4px;
    transform: translate3d(-50%, -50%, 0);
    box-shadow: 0 4px 20px 0 rgb(0 0 0 / 10%);

    &-wrap {
      @extend .flex;

      align-items: center;
      flex-direction: column;
      height: 340px;
      padding-top: 40px;
    }

    &__title {
      font-size: var(--el-font-size-extra-large);
      font-weight: bold;
    }

    .form-item {
      width: 100%;
      margin: 0 0 38px;

      &-wrap {
        @extend .flex;

        flex: 1;
        justify-content: space-between;
      }

      &-auto {
        margin: 50px 0 2px;
      }
    }
  }
}
</style>
