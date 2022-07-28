<template>
  <vc-container class="bg-gray">
    <van-nav-bar
      title="订单详情"
      left-arrow
      @click-left="$router.back()"
    />

    <div class="space-y-3 p-3 flex flex-col flex-1 overflow-auto">
      <div class="px-4 flex items-center bg-white rounded-lg p-2">
        <div class="flex-1">
          <div>{{ data.consigneeAddress }}</div>
          <div class="text-sm">
            <span class="mr-2 font-bold">{{ data.consignee }}</span>
            <span>{{ data.consigneePhone }}</span>
          </div>
        </div>
      </div>

      <div class="flex items-center p-2 bg-white rounded-lg">
        <vc-img :src="data.goodsImg" size="50" class="rounded-lg overflow-hidden mr-3"></vc-img>
        <div class="flex-1 truncate mr-2">
          {{ data.goodsName }}
        </div>
        <div>
          积分：<span class="text-primary">{{ data.goodsIntegral }}</span>
        </div>
      </div>

      <div class="p-2 bg-white rounded-lg">
        <div class="border-b border-line pb-1 mb-1 text-center text-sm">
          兑换说明
        </div>
        <div class="whitespace-pre-line break-words">
          {{ data.orderRemarks || '无' }}
        </div>
      </div>

      <div v-if="exchangeList.length" class="p-2 bg-white rounded-lg">
        <div class="border-b border-line pb-1 text-center mb-2 text-sm">
          兑换记录
        </div>
        <div class="space-y-2">
          <div
            v-for="(item, index) of exchangeList"
            :key="index"
            class="flex items-center p-2 bg-gray bg-opacity-50 rounded-lg"
          >
            <vc-img
              :src="item.voucherImg"
              size="50"
              class="rounded-lg mr-2"
              @click="preview(item.voucherImg)"
            ></vc-img>
            <div
              class="flex-1 overflow-hidden"
              @click="() => {
                exchangeRemarks = item.exchangeRemarks
                showExchangeRemarks = true
              }"
            >
              <div class="truncate">
                {{ item.exchangeRemarks }}
              </div>
              <div class="text-xs">
                {{ item.createTime }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <van-popup v-model="showExchangeRemarks" position="bottom">
      <div class="bg-white h-[40vh] rounded-t-xl p-3">
        {{ exchangeRemarks }}
      </div>
    </van-popup>
  </vc-container>
</template>

<script>
import { ImagePreview } from 'vant'
import { getOrderIntegralDetail, getPointMailOrderExchange } from '@/api/order'

export default {
  name: 'PointsMallOrderInfo',
  components: {},
  data() {
    return {
      orderNo: null,
      data: {},
      exchangeList: [],
      exchangeRemarks: '',
      showReasonPopup: false,
      showExchangeRemarks: false,
    }
  },
  created() {
    this.orderNo = this.$route.params.orderNo
    if (!this.orderNo) {
      this.$toast('订单编号不存在')
      this.$router.back()
      return
    }

    this.loadData()
    this.getPointMailOrderExchange()
  },
  methods: {
    async loadData() {
      const res = await getOrderIntegralDetail(this.orderNo)
      this.data = res.body.resultMap
    },
    async getPointMailOrderExchange() {
      const res = await getPointMailOrderExchange(this.orderNo)
      this.exchangeList = res.body.exchangeList
    },
    preview(img) {
      ImagePreview([img])
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
