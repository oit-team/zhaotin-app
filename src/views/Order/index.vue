<template>
  <div class="bg-gray">
    <van-nav-bar
      title="全部订单"
    />
    <div class="pt-2">
      <div
        v-for="order of list"
        :key="order.orderId"
        class="bg-white mb-3 mx-2 rounded-lg overflow-hidden"
        @click="$Router.to('orderInfo', { orderId: order.orderId })"
      >
        <div class="flex justify-between p-2 text-sm border-b border-line">
          <span>
            <span>单号：</span>
            <span>{{ order.orderNo }}</span>
          </span>
          <!--          <span>{{ ORDER_STATE_TEXT[order.orderState] }}</span>-->
        </div>
        <div class="space-y-2 p-2">
          <div
            v-for="item of order.orderStyleList"
            :key="item.styleId"
            class="flex items-center"
          >
            <vc-img class="rounded-lg overflow-hidden bg-white mr-2" fit="contain" :src="item.imgDetailUrl" size="50"></vc-img>
            <div class="bg-[#f7f7f7] rounded-lg flex-1 flex items-center self-stretch pr-2">
              <div class="flex-1 text-xs ml-3 pr-2 overflow-hidden">
                <div class="mb-1 truncate">{{ item.styleName }}</div>
                <div class="text-xs text-caption">{{ item.styleNo }}</div>
              </div>
              <div class="flex items-center">
                <!--            <span class="mr-2 text-xs">&#215;3</span>-->
                <van-badge class="times-symbol mr-4" color="white">
                  <template #content>
                    <span class="black">×{{ item.styleNumber }}</span>
                  </template>
                </van-badge>
                <span class="price-red">
                  ￥{{ item.styleTotal }}
                </span>
                <!-- <u-text class="text-price text-xs" mode="price" :text="item.styleTotal"></u-text> -->
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
            <span class="price-red">￥{{ order.orderPrice }}</span>
          </div>
        </div>
      </div>
    </div>
    <Tabbar />
  </div>
</template>

<script>
import Tabbar from '@/components/business/Tabbar'
import { getOrder } from '../../api/order'
import { GLOBAL_EVENT } from '../../utils/events'

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
    Tabbar,
  },
  data: () => ({
    GLOBAL_EVENT,
    ORDER_STATE_TEXT,
    list: [],
    pageform: {
      pageNum: 1,
      pageSize: 12,
    },
  }),
  created() {
    this.LoadData(this.pageform)
  },
  methods: {
    async LoadData(params) {
      const res = await getOrder({
        ...params,
      })
      console.log(res)
      this.list = res.body.resultList
      this.$loadMoreData(this.list, res.body.resultList, params)
      return res.body.count
    },
  },
}
</script>

<style lang='scss' scoped>
.price-red{
  color: #FF0000;
}
.black{
  color: black;
}
</style>
