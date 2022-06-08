<template>
  <div>
    <div class="bg-gray">
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
          <van-cell title="我的积分" :value="String($store.state.userData.customerIntegral)" is-link>
            <!--          <template #icon>-->
            <!--            <vc-icon class="text-primary" name="icon-a-jifen" size="18"></vc-icon>-->
            <!--          </template>-->
            <!-- <vc-icon slot="icon" class="text-primary" name="icon-a-jifen" size="18"></vc-icon> -->
          </van-cell>
          <van-cell
            title="购物车"
            is-link
            @click="$Router.to('shoppingCartList')"
          >
            <!-- <vc-icon slot="icon" class="text-primary" name="icon-gouwuche" size="18"></vc-icon> -->
          </van-cell>
          <van-cell title="我的收藏" is-link @click="$router.to('Collection')">
            <!-- <vc-icon slot="icon" class="text-primary" name="icon-tuijian-xing1" size="16"></vc-icon> -->
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
</style>
