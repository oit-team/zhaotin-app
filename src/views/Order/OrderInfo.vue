<template>
  <div class="bg-gray">
    <van-nav-bar
      title="订单详情"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="mx-2 mt-2 px-4 flex items-center bg-white rounded-lg p-2">
      <div class="flex-1">
        <div>{{ data.consigneeAddress }}</div>
        <div class="text-sm">
          <span class="mr-2 font-bold">{{ data.consignee }}</span>
          <span>{{ data.consigneePhone }}</span>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg mx-2 mt-2 p-2 px-4 text-sm" @click="showReasonPopup = true">
      <span>下单事由</span>
      <span class="float-right">
        <span class="text-secondary">{{ data.orderReason }}</span>
        <vc-icon name="chevron-right" />
      </span>
    </div>

    <div class="p-2 space-y-2">
      <ShopItem
        v-for="item of data.orderStyleList"
        :key="item.styleId"
        :item="item"
        :price="item.stylePrice"
      >
        <ShopStyleItem
          v-for="style of item.style"
          :key="style.id"
          :item="style"
          readonly
        >
        </ShopStyleItem>
      </ShopItem>
    </div>

    <div>
      <van-popup v-model="showReasonPopup" round position="bottom">
        <div class="bg-white rounded-t-lg px-6 min-h-300px text-sm">
          <vc-tabs class="py-2">
            <van-tab title="下单事由"></van-tab>
          </vc-tabs>
          <div class="flex">
            <span>类型：</span>
            <span>{{ data.orderReason }}</span>
          </div>
          <div class="flex">
            <span>备注：</span>
            <span class="break-all flex-1">{{ data.orderNote || '无' }}</span>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { getOrderById } from '@/api/order'
import ShopItem from '@/components/business/ShoppingCart/ShopItem'
import ShopStyleItem from '@/components/business/ShoppingCart/ShopStyleItem'

export default {
  name: 'OrderInfo',
  components: {
    ShopItem,
    ShopStyleItem,
  },
  data() {
    return {
      orderNo: null,
      data: {},
      showReasonPopup: false,
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
  },
  methods: {
    async loadData() {
      const res = await getOrderById(this.orderNo)
      this.data = res.body.resultList
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
