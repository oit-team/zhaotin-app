<template>
  <div class="overflow-hidden h-screen">
    <div class="absolute inset-0 flex">
      <div class="absolute inset-0 z-10 bg-white bg-opacity-80"></div>
      <vc-img
        class="w-full h-full"
        fit="cover"
        :src="bgUrl"
      />
    </div>

    <div class="relative z-50 w-full h-full flex-center">
      <div class="flex items-center flex-col absolute w-full top-[15%]">
        <vc-img src="/img/login/logo@3x.png" width="88" height="40" />
        <text class="mt-2 text-sm">一站式集采服务平台</text>
      </div>

      <div class="flex-1 px-18">
        <p class="text-xl">Welcome</p>
        <p class="text-xs text-secondary">登录您的账户</p>

        <div class="mt-3 space-y-3">
          <van-field
            v-model.trim="form.name"
            class="bg-white"
            placeholder="请输入账号"
            clearable
          />
          <van-field
            v-model.trim="form.pwd"
            class="bg-white"
            type="password"
            placeholder="请输入密码"
            clearable
          />
        </div>
        <p class="mt-2 mb-5 text-xs text-right underline text-secondary" @click="callCustomerService">忘记密码</p>
        <van-button type="info" @click="login()" block>登录</van-button>
      </div>
    </div>

    <div v-if="loading" class="fixed inset-0 z-50 bg-white"></div>
  </div>
</template>

<script>
import * as api from '@/api/account'
import crypto from '@/utils/crypto'

export default {
  name: 'Login',

  data: () => ({
    form: {
      name: '',
      pwd: '',
    },
    bgUrl: '',
    loading: false,
  }),

  mounted() {
    this.checkLogin()
    this.getLoginBackground()
  },

  methods: {
    callCustomerService: () => {},
    async login() {
      if (this.verifyForm()) {
        const data = await this.$promiseLoading(api.login({
          userName: this.form.name,
          password: crypto.encrypt(this.form.pwd),
        }))
        this.$store.commit('setUserData', data.body.resultList)
        this.$ls.set('token', data.body.accessToken)
        this.$router.to('Account')
        this.$toast('登录成功')
      }
    },
    verifyForm() {
      let msg
      if (this.form.name === '') {
        msg = '用户名不能为空'
      } else if (this.form.pwd === '') {
        msg = '密码不能为空'
      }
      if (msg) {
        this.$toast(msg)
        return false
      }

      return true
    },
    async getLoginBackground() {
      const res = await api.getLoginBackground()
      this.bgUrl = res.body.loginBackground
    },
    async checkLogin() {
      // if (!uni.getStorageSync('token')) return
      //
      // this.loading = true
      // await this.$promiseLoading(this.$store.dispatch('updateUserData'))
      //   .finally(() => {
      //     setTimeout(() => {
      //       this.loading = false
      //     }, 300)
      //   })
      // await this.$store.dispatch('shoppingCart/getShoppingCart')
      // setTimeout(() => this.$Router.pushTab({ path: '/pages/home/index' }))
    },
  },
}
</script>

<style lang="scss" scoped>
.u-input {
  height: 44px;
  padding: 16px 12px;
  border-radius: 4px;
}
</style>
