<template>
  <div class="space-y-2 text-sm">
    <van-nav-bar
      title="意见反馈"
      left-arrow
      @click-left="$router.back()"
    />

    <div class="p-2 pt-0">
      <div class="mb-2">
        <div>反馈内容</div>
        <van-field
          v-model="content"
          type="textarea"
          rows="2"
          placeholder="请输入内容"
          show-word-limit
          maxlength="1000"
        ></van-field>
      </div>
      <div class="mb-2">
        <div>反馈类型</div>
        <div class="border border-[#dadbde] rounded p-2">
          <van-radio-group v-model="type" direction="horizontal">
            <van-radio v-for="item of types" :key="item" class="p-1" :name="item">
              {{ item }}
            </van-radio>
          </van-radio-group>
        </div>
      </div>
      <div>
        <van-button type="primary" block :disabled="!content || !type" @click="submit()">
          提交
        </van-button>
      </div>
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

<style lang="scss" scoped>
::v-deep{
  .van-cell__value{
    border: 1px solid #dadbde;
    border-radius: 3px;
    padding: 5px;
  }
  .van-field{
    padding: 0;
  }
}
</style>
