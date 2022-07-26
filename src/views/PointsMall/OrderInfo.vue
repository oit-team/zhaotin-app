<template>
  <div class="bg-gray">
    <van-nav-bar
      title="订单详情"
      left-arrow
      @click-left="$router.back()"
    />

    <div class="m-3 px-4 flex items-center bg-white rounded-lg p-2">
      <div class="flex-1">
        <div>{{ data.consigneeAddress }}</div>
        <div class="text-sm">
          <span class="mr-2 font-bold">{{ data.consignee }}</span>
          <span>{{ data.consigneePhone }}</span>
        </div>
      </div>
    </div>

    <div class="flex items-center p-2 bg-white m-3 rounded-lg">
      <vc-img :src="data.goodsImg" size="50" class="rounded-lg overflow-hidden mr-3"></vc-img>
      <div class="flex-1 truncate mr-2">
        {{ data.goodsName }}
      </div>
      <div>
        积分：<span class="text-primary">{{ data.goodsIntegral }}</span>
      </div>
    </div>

    <div class="p-2 bg-white m-3 rounded-lg">
      <div>备注：</div>
      <div class="whitespace-pre-line break-words">
        {{ data.orderRemarks || '无' }}
      </div>
    </div>
  </div>
</template>

<script>
import { getOrderIntegralDetail } from '@/api/order'

export default {
  name: 'PointsMallOrderInfo',
  components: {},
  data() {
    return {
      orderId: null,
      // data: null,  // 这个报错，Cannot read properties of null (reading 'consigneeAddress')
      data: {},
      showReasonPopup: false,
    }
  },
  created() {
    this.orderId = this.$route.params.orderId
    if (!this.orderId) {
      this.$toast('订单ID不存在')
      this.$Router.back()
      return
    }
    this.loadData()
  },
  methods: {
    async loadData() {
      const res = await getOrderIntegralDetail(this.orderId)
      this.data = res.body.resultMap
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
