<template>
  <VcContainer class="bg-gray">
    <van-nav-bar
      title="全部订单"
    />

    <vc-list :promise="loadData" first-load>
      <div class="pt-2">
        <div
          v-for="order of list"
          :key="order.orderId"
          class="bg-white mb-3 mx-2 rounded-lg overflow-hidden"
          @click="$router.to('OrderInfo', { orderId: order.orderId })"
        >
          <div class="flex justify-between p-2 text-sm border-b border-line">
            <span>
              <span>单号：</span>
              <span>{{ order.orderNo }}</span>
            </span>
            <!--          <span>{{ ORDER_STATE_TEXT[order.orderState] }}</span> -->
          </div>
          <div class="space-y-2 p-2">
            <div
              v-for="item of order.orderStyleList"
              :key="item.styleId"
              class="flex items-center"
            >
              <vc-img
                class="rounded-lg overflow-hidden bg-white mr-2 flex-shrink-0"
                fit="contain"
                :src="item.imgDetailUrl"
                size="50"
              ></vc-img>
              <div class="bg-[#f7f7f7] rounded-lg flex-1 flex items-center self-stretch pr-2 overflow-hidden">
                <div class="flex-1 text-xs ml-3 pr-2 overflow-hidden">
                  <div class="mb-1 truncate">
                    {{ item.styleName }}
                  </div>
                  <div class="text-xs text-caption">
                    {{ item.styleNo }}
                  </div>
                </div>
                <div class="flex items-center">
                  <van-badge class="times-symbol mr-4 text-black" color="white" :content="item.styleNumber"></van-badge>
                  <vc-text :text="item.styleTotal" mode="price"></vc-text>
                </div>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between p-2 border-t border-line">
            <div class="text-xs text-caption">
              <span>下单时间：</span>
              <span>{{ order.orderTime }}</span>
            </div>
            <div class="flex text-sm">
              <span>总价：</span>
              <vc-text :text="order.orderPrice" mode="price"></vc-text>
            </div>
          </div>
        </div>
      </div>
    </vc-list>

    <Tabbar />
  </VcContainer>
</template>

<script>
import Tabbar from '@/components/business/Tabbar'
import { getOrder } from '@/api/order'
import VcContainer from '@/components/basic/Container/Container'

const ORDER_STATE = {
  NOT_PAID: 0,
  NOT_SHIPPED: 1,
  COMPLETED: 2,
}

const ORDER_STATE_TEXT = {
  [ORDER_STATE.NOT_PAID]: '未支付',
  [ORDER_STATE.NOT_SHIPPED]: '未发货',
  [ORDER_STATE.COMPLETED]: '已完成',
}

export default {
  name: 'Order',

  components: {
    VcContainer,
    Tabbar,
  },

  data: () => ({
    ORDER_STATE_TEXT,
    list: [],
  }),

  methods: {
    async loadData(params) {
      const res = await getOrder({
        userId: this.$store.state.userData.id,
        ...params,
      })
      this.$loadMoreData(this.list, res.body.resultList, params)
      return res.body.count
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
