<template>
  <vc-container>
    <vc-nav-bar title="积分订单" />

    <vc-list :promise="loadData" first-load>
      <div
        v-for="order of list"
        :key="order.orderId"
        class="bg-white my-3 mx-3 rounded-lg overflow-hidden"
        @click="$router.to('PointsMallOrderInfo', { orderNo: order.orderNo })"
      >
        <div class="flex justify-between p-2 text-sm border-b border-line">
          <span>
            <span>单号：</span>
            <span>{{ order.orderNo }}</span>
          </span>
          <!--          <span>{{ ORDER_STATE_TEXT[order.orderState] }}</span> -->
        </div>
        <div class="p-2 flex">
          <vc-img :src="order.imgUrl" size="50" class="rounded-lg overflow-hidden mr-2"></vc-img>
          <div class="flex-1 line-clamp-2 whitespace-pre-line break-words">
            {{ order.orderRemarks }}
          </div>
        </div>
        <div class="flex items-center justify-between p-2 border-t border-line">
          <div class="text-xs text-caption">
            <span>下单时间：</span>
            <span>{{ order.orderTime }}</span>
          </div>
          <div class="flex text-sm">
            <span>积分：</span>
            <span class="text-primary">{{ order.orderIntegral }}</span>
          </div>
        </div>
      </div>
    </vc-list>
  </vc-container>
</template>

<script>
import { getPointMailOrderList } from '@/api/order'

export default {
  name: 'PointsMallOrder',

  data: () => ({
    list: [],
  }),

  methods: {
    async loadData(params) {
      const res = await getPointMailOrderList({
        userId: this.$store.state.userData.id,
        ...params,
      })
      this.$loadMoreData(this.list, res.body.resultList, params)
      return res.body.count
    },
  },
}
</script>

<style scoped>

</style>
