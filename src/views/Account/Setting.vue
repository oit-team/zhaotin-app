<template>
  <div class="bg-gray zt-page">
    <van-nav-bar
      title="账号设置"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="space-y-2">
      <van-cell-group class="bg-white">
        <van-cell title="修改密码" is-link @click="$router.to('ChangePassword')"></van-cell>
        <van-cell title="意见反馈" is-link @click="$router.to('Feedback')"></van-cell>
        <van-cell title="关于我们" is-link @click="$router.to('About')"></van-cell>
        <van-cell title="版本" value="1.0.0" @click="debug"></van-cell>
      </van-cell-group>

      <!--      <u-cell-group class="bg-white text-center">-->
      <!--        <u-cell title="切换账号"></u-cell>-->
      <!--      </u-cell-group>-->

      <van-cell-group class="bg-white text-center">
        <van-cell title="退出登录" clickable @click="logout"></van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { Dialog } from '@/components/vant'

let times = 0

export default {
  name: 'Setting',

  methods: {
    logout() {
      Dialog.confirm({
        title: '提示',
        message: '确定要退出登录吗？',
      }).then(() => {
        this.$store.dispatch('logout')
      }).catch(() => {
        this.$toast('取消退出')
      })
    },
    async debug() {
      if (process.env.NODE_ENV !== 'production') {
        times++
        if (times === 5) {
          import('eruda').then(module => {
            const eruda = { ...module }
            eruda.init()
          })
        }
      }
    },
  },
}
</script>

<style scoped>
.zt-page {
  min-height: 100vh;
}
</style>
