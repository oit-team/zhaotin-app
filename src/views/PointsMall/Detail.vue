<template>
  <vc-container>
    <vc-nav-bar title="兑品详情" />

    <div class="flex-1 overflow-auto">
      <div class="m-3">
        <div class="aspect-1/1">
          <van-swipe
            ref="swipe"
            class="rounded-lg"
            indicator-color="white"
            lazy-render
            :show-indicators="false"
            @change="swiperIndex = $event"
          >
            <van-swipe-item>
              <SwiperVideo :data="data" />
            </van-swipe-item>
            <van-swipe-item v-for="(item, index) of data.imgUrlList" :key="index" @click="openPreview(index)">
              <vc-img :src="item" size="100%" />
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>

      <div class="m-3">
        <div class="p-3 mb-2 bg-white rounded-lg">
          <div class="flex justify-between items-center">
            <div class="flex-1 mr-3 overflow-hidden">
              <div class="mb-2 truncate">
                <span class="font-bold">{{ data.goodsName }}</span>
              </div>
              <div class="truncate">
                <span class="text-sm text-secondary">款号：</span>
                <span class="text-sm">{{ data.goodsCode }}</span>
              </div>
            </div>
            <div class="flex flex-col items-end">
              <vc-text mode="price" :text="data.goodsPrice || 0"></vc-text>
              <div>
                <span>积分：</span>
                <vc-text class="text-primary" mode="price" text-symbol="" :text="data.goodsIntegral || 0"></vc-text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white px-3 py-2">
      <van-button class="bg-price text-white" block round @click="submit">立即兑换</van-button>
    </div>
  </vc-container>
</template>

<script>
import { getGoodsDetails } from '@/api/pointsMall'
import SwiperVideo from '@/components/business/Product/SwiperVideo'
import { ImagePreview } from 'vant'

export default {
  name: 'PointsMallDetail',

  components: {
    SwiperVideo,
  },

  data: () => ({
    swiperIndex: 0,
    data: {},
  }),

  mounted() {
    this.styleId = this.$route.params.styleId
    this.getGoodsDetails()
  },

  methods: {
    async getGoodsDetails() {
      const res = await getGoodsDetails(this.styleId)
      this.data = res.body.goodsDetails
    },
    openPreview(index) {
      ImagePreview({
        images: this.data.imgUrlList.map(item => item.resUrl),
        startPosition: index,
      })
    },
    submit() {
      this.$router.to('OrderSubmit', {
        pointsMall: true,
        pointsMallItem: this.data,
      })
    },
  },
}
</script>

<style scoped>

</style>
