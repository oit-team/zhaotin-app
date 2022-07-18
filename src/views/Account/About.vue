<template>
  <div class="flex flex-col bg-gray">
    <van-nav-bar
      :title="title"
      left-arrow
      @click-left="$router.back()"
    />

    <vc-img src="http://res.gaodanyi.com:8102/upload/zt/qywh.png"></vc-img>

    <div class="text-center text-sm">
      <div class="text-primary divide-x">
        <span class="px-2">用户协议</span>
        <span class="px-2">隐私协议</span>
      </div>
      <div>
        Copyright @ 2022 浙江昭廷服饰有限公司 版权所有
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  components: {},

  data() {
    return {
      title: '关于我们',
    }
  },
  created() {
    if (this.$route.params.info)
      this.title = '公司简介'
  },
}
</script>

<style scoped>
</style>
