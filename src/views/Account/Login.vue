<template>
  <div class="h-screen">
    <div class="absolute inset-0">
      <div class="absolute inset-0 bg-white z-10 bg-opacity-80 z-10"></div>
      <vc-img
        class="w-full h-full"
        mode="aspectFill"
        :src="bgUrl"
      />
    </div>

    <div class="z-50 flex-center w-full h-full relative">
      <div class="flex items-center flex-col absolute w-full top-[15%]">
        <vc-img src="/static/img/login/logo@3x.png" width="88" height="40"></vc-img>
        <text class="text-sm mt-2">一站式集采服务平台</text>
      </div>

      <div class="px-18 flex-1">
        <p class="text-xl">Welcome</p>
        <p class="text-xs text-secondary">登录您的账户</p>

        <div class="mt-3 space-y-3">
          <u--input
            v-model.trim="form.name"
            class="bg-white"
            placeholder="请输入账号"
            border="surround"
            clearable
          />
          <u--input
            v-model.trim="form.pwd"
            class="bg-white"
            type="password"
            placeholder="请输入密码"
            border="surround"
            clearable
          />
        </div>
        <p class="text-right text-secondary text-xs mt-2 underline mb-5" @click="callCustomerService">忘记密码</p>
        <u-button class="h-[80px]" text="登录" @click="login()" />
      </div>
    </div>

    <div v-if="loading" class="bg-white fixed inset-0 z-50"></div>
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
        // uni.showLoading()
        const data = await api.login({
          userName: this.form.name,
          password: crypto.encrypt(this.form.pwd),
        })
        // .finally(uni.hideLoading)
        this.$store.commit('setUserData', data.body.resultList)
        // uni.setStorageSync('token', data.body.accessToken)
        // uni.switchTab({ url: '/pages/home/index' })
        // uni.$emit(GLOBAL_EVENT.LOGIN)
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
      // const res = await api.getLoginBackground()
      // this.bgUrl = res.body.loginBackground
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
