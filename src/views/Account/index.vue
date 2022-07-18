<template>
  <div class="bg-gray zt-page">
    <div>
      <div class="pt-status-bar bg-white"></div>
      <div class="flex py-5 px-3 items-center bg-white mb-2" @click="$router.to('Setting')">
        <vc-img
          class="rounded-circle bg-gray p-2 overflow-hidden mr-2"
          src="img/account/183cb153b843906f367b2d27d530dac8.png"
          size="50"
        />
        <div class="flex-1">
          <div class="font-bold">{{ $store.state.userData.customerName }}</div>
        </div>
        <div>
          <!-- <vc-icon name="icon-chevron-right" /> -->
        </div>
      </div>
      <div class="space-y-2">
        <van-cell-group class="bg-white">
          <van-cell
            class="items-center"
            title="我的积分"
            size="large"
            :value="String($store.state.userData.customerIntegral)"
          >
            <vc-icon slot="icon" class="text-primary mr-1" name="credits" size="22"></vc-icon>
          </van-cell>
          <van-cell
            class="items-center"
            title="进货车"
            is-link
            size="large"
            @click="$router.to('ShoppingCartList')"
          >
            <vc-icon slot="icon" class="text-primary mr-2" name="shopping-cart" size="18"></vc-icon>
          </van-cell>
          <van-cell
            class="items-center"
            title="我的收藏"
            size="large"
            is-link
            @click="$router.to('Collection')"
          >
            <vc-icon slot="icon" class="text-primary mr-2" name="star" size="18"></vc-icon>
          </van-cell>
          <van-cell
            class="items-center"
            title="积分商城订单"
            size="large"
            is-link
            @click="$router.to('PointsMallOrder')"
          >
            <vc-icon slot="icon" class="text-primary mr-2" name="star" size="18"></vc-icon>
          </van-cell>
        </van-cell-group>
      </div>
    </div>
    <Tabbar />
  </div>
</template>

<script>
import Tabbar from '@/components/business/Tabbar'

export default {
  name: 'Account',
  components: { Tabbar },
}
</script>

<style scoped lang="scss">
.van-cell::v-deep .van-cell__body {
  padding: 14px 16px;
}

.zt-page {
  min-height: 100vh;
}
</style>
