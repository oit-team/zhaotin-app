<template>
  <div class="overflow-hidden h-screen">
    <div class="absolute inset-0 flex">
      <vc-img
        class="w-full h-full"
        fit="cover"
        :src="bgUrl"
      />
    </div>

    <div class="relative z-50 w-full h-full flex-center">
      <div class="flex items-center flex-col absolute w-full top-[15%]">
        <vc-img src="/img/login/logo@3x.png" width="88" height="40" />
        <span class="mt-2 text-sm text-white">一站式集采服务平台</span>
      </div>

      <div class="flex-1 mx-14 p-4 bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-lg">
        <p class="text-xl">
          Welcome
        </p>
        <p class="text-xs text-secondary">
          登录您的账户
        </p>

        <div class="mt-3 space-y-3">
          <van-field
            v-model.trim="form.name"
            class="rounded"
            placeholder="请输入账号"
            clearable
          />
          <van-field
            v-model.trim="form.pwd"
            class="rounded"
            type="password"
            placeholder="请输入密码"
            clearable
          />
        </div>
        <p class="mt-2 mb-5 text-xs text-right underline text-secondary" @click="callCustomerService()">
          忘记密码
        </p>
        <van-button type="info" block @click="login()">
          登录
        </van-button>
      </div>
    </div>

    <div v-if="loading" class="fixed inset-0 z-50 bg-white"></div>
  </div>
</template>

<script>
import * as api from '@/api/account'
import crypto from '@/utils/crypto'
import { callCustomerService } from '@/utils'

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

    const app = this.$root.$children[0]
    app.$refs.view.clearAlive()
  },

  methods: {
    callCustomerService,
    async login() {
      if (this.verifyForm()) {
        const data = await this.$promiseLoading(api.login({
          userName: this.form.name,
          password: crypto.encrypt(this.form.pwd),
        }))
        this.$store.commit('setUserData', data.body.resultList)
        localStorage.setItem('token', data.body.accessToken)
        this.$router.to('Home')
        this.$toast.success('登录成功')
      }
    },
    verifyForm() {
      let msg
      if (this.form.name === '')
        msg = '账号不能为空'
      else if (this.form.pwd === '')
        msg = '密码不能为空'

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
      if (!localStorage.getItem('token')) return
      this.loading = true
      await this.$promiseLoading(this.$store.dispatch('updateUserData'), '验证登录中...')
        .finally(() => {
          setTimeout(() => {
            this.loading = false
          }, 300)
        })
      await this.$store.dispatch('shoppingCart/getShoppingCart')
      setTimeout(() => this.$router.to('Home'))
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
