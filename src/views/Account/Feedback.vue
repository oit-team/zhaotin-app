<template>
  <div class="p-2 space-y-2 text-sm">
    <van-nav-bar
      title="意见反馈"
      left-arrow
      @click-left="$router.back()"
    />
    <div>
      <div>反馈内容</div>
      <van-field v-model="content" placeholder="请输入内容" show-word-limit maxlength="1000"></van-field>
    </div>
    <div>
      <div>反馈类型</div>
      <div class="border border-[#dadbde] rounded p-2">
        <van-radio-group v-model="type">
          <van-radio v-for="item of types" class="p-1" :key="item" :name="item">{{ item }}</van-radio>
        </van-radio-group>
      </div>
    </div>
    <div>
      <van-button type="primary" :disabled="!content || !type" @click="submit()">提交</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Feedback',

  data: () => ({
    content: '',
    type: null,
    types: ['程序BUG', '意见', '其它'],
  }),

  methods: {
    submit() {
      this.$toast('提交成功！')
      this.$router.back()
    },
  },
}
</script>

<style scoped>

</style>
