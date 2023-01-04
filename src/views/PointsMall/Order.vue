<template>
  <vc-container>
    <vc-nav-bar title="积分订单" />

    <vc-tabs v-if="stateTabs.length" v-model="type" class="py-1 bg-white whitespace-nowrap">
      <van-tab
        :title="`全部(${stateTabs.reduce((prev, curr) => prev + curr.orderNum, 0)})`"
        name=""
      />
      <van-tab
        v-for="item of stateTabs"
        :key="item.stateKey"
        :name="item.stateKey"
        :title="`${item.stateName}(${item.orderNum})`"
      />
    </vc-tabs>

    <vc-list ref="list" :promise="loadData" first-load>
      <div
        v-for="order of list"
        :key="order.orderId"
        class="bg-white my-3 mx-3 rounded-lg overflow-hidden"
        @click="$router.to('PointsMallOrderInfo', { orderNo: order.orderNo })"
      >
        <div class="flex justify-between p-2 text-sm border-b border-line">
          <span class="truncate flex-1 mr-3">
            <span>单号：</span>
            <span>{{ order.orderNo }}</span>
          </span>
          <span>{{ order.orderState }}</span>
        </div>
        <div class="p-2 flex">
          <vc-img class="rounded-lg overflow-hidden mr-2" :src="order.imgUrl" size="50"></vc-img>
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
import { getCountOrderState, getPointMailOrderList } from '@/api/order'

export default {
  name: 'PointsMallOrder',

  data: () => ({
    list: [],
    stateTabs: [],
    type: '',
  }),

  watch: {
    type() {
      this.$refs.list.reset().load()
    },
  },

  created() {
    this.getCountOrderState()
  },

  methods: {
    async loadData(params) {
      const res = await getPointMailOrderList({
        userId: this.$store.state.userData.id,
        state: this.type,
        ...params,
      })
      this.$loadMoreData(this.list, res.body.resultList, params)
      return res.body.count
    },
    async getCountOrderState() {
      const res = await getCountOrderState()
      this.stateTabs = res.body.resultList
    },
  },
}
</script>

<style scoped>

</style>
