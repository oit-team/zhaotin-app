<template>
  <div class="bg-gray flex flex-col">
    <Search is-link />

    <div class="flex-1 overflow-auto">
      <div class="aspect-6/16">
        <van-swipe :autoplay="5000" indicator-color="white">
          <van-swipe-item v-for="(item, index) of carousel" :key="index">
            <vc-img :src="item" size="100%" />
          </van-swipe-item>
        </van-swipe>
      </div>

      <div class="bg-white">
        <div class="grid grid-cols-5 gap-y-2 px-6 pt-4 pb-4 bg-gray rounded-b-[40px]">
          <div
            v-for="(item, index) of fastNav"
            :key="index"
            class="flex flex-col items-center mb-2"
            @click="fastNavClick(item)"
          >
            <vc-img class="rounded" :src="`img/home/${item.icon}`" width="40" height="40" />
            <span class="mt-1 text-xs">{{ item.name }}</span>
          </div>
          <div
            v-for="(item) of styleTypeList"
            :key="item.dictitemCode"
            class="flex flex-col items-center"
            @click="$router.to('Product', { styleMajor: item.dicttimeDisplayName })"
          >
            <vc-img class="rounded-circle overflow-hidden bg-white" :src="item.imgUrl" size="40" />
            <span class="mt-1 text-xs">{{ item.dicttimeDisplayName }}</span>
          </div>
        </div>
      </div>

      <!-- 类别 -->
      <div class="flex py-4 px-6 bg-white rounded overflow-auto">
        <div
          v-for="(item, index) of styleCategoryList"
          :key="index"
          class="flex flex-col justify-center items-center min-w-[20%]"
          @click="$router.to('Product', { category: item.categoryName })"
        >
          <vc-img class="rounded-circle bg-[#f6f6f6] overflow-hidden mb-2" :src="item.imgUrl" size="40" />
          <div class="text-xs truncate">
            {{ item.categoryName }}
          </div>
        </div>
      </div>

      <div v-if="notice[0]" class="py-2">
        <van-notice-bar
          left-icon="volume-o"
          :text="notice[0]"
          background="#ffffff"
          color="#9B9B9B"
        />
      </div>

      <div class="flex-1 bg-white rounded-t-lg py-2">
        <div class="text-center px-100px mb-2">
          <van-divider :hairline="false" class="border-primary text-primary">
            {{ seasonStyle }}
          </van-divider>
        </div>
        <div class="grid grid-cols-3 gap-3 px-4 mb-3">
          <div
            v-for="item of productList"
            :key="item.styleId"
            class="flex overflow-hidden flex-col border border-line rounded-lg aspect-5/4"
            @click="$router.to('ProductDetail', { styleId: item.styleId })"
          >
            <vc-img
              class="rounded overflow-hidden"
              :src="item.resUrl"
            ></vc-img>
          </div>
        </div>
        <!--      <vc-load-more ref="loadMore" :promise="loadData" first-load></vc-load-more> -->
      </div>
    </div>

    <!-- 底部导航 -->
    <Tabbar />
  </div>
</template>

<script>
import Tabbar from '@/components/business/Tabbar'
import Search from '@/components/business/Product/Search'

import { dictitemInfoAllMethod, getStyleCategory, getStyleList, getSystemConfig } from '@/api/product'
import { callCustomerService } from '@/utils'

export default {
  name: 'Home',

  components: {
    Tabbar,
    Search,
  },

  data: () => ({
    carousel: [],
    notice: [],
    productList: [],
    styleCategoryList: [],
    styleTypeList: [],
    seasonStyle: '',
  }),

  created() {
    this.loadData()
    this.getSystemConfig()
    this.dictitemInfoAllMethod()
    this.getStyleCategory()

    this.fastNav = [
      {
        name: '企业简介',
        icon: '14146659cfb3360cd9a5b14e20f0ee4a.png',
        to: 'About',
        params: {
          info: true,
        },
      },
      {
        name: '进货车',
        icon: 'ffc9161564acf3b3f6296bd305a2f922.png',
        to: 'ShoppingCartList',
      },
      {
        name: '商品视频',
        icon: '235a4909826ec42730c1b1c784d1ca84.png',
        to: 'ProductSearch',
        params: {
          video: true,
        },
      },
      {
        name: '物流',
        icon: '3d2c66892fa51710bdf675a9024a9540.png',
        to: 'PointsMall',
      },
      {
        name: '客服',
        icon: 'e63fa06c35ad927607be1536412ea7a8.png',
        click: callCustomerService,
      },
    ]
  },

  methods: {
    async loadData() {
      const pageSize = 12
      const res = await getStyleList({
        styleCode: '1',
        pageNum: 1,
        status: 1,
        pageSize,
      })
      this.productList = [...this.productList, ...res.body.resultList]
      this.seasonStyle = res.body.seasonStyle
      return pageSize
    },
    async getSystemConfig() {
      const res = await getSystemConfig()
      this.notice = res.body.announceInfo
      this.carousel = res.body.homePageImage
    },
    fastNavClick(item) {
      if (item.to)
        this.$router.to(item.to, item.params)
      else if (item.click)
        item.click()
    },
    async dictitemInfoAllMethod() {
      const res = await dictitemInfoAllMethod({
        type: 'STYLE_BAR_CODE',
      }, {
        cmd: 100009,
      })

      this.styleTypeList = res.body.result
    },
    async getStyleCategory() {
      const res = await getStyleCategory({
        dictCode: 'SYSTEM_CONFIG',
      })
      this.styleCategoryList = res.body.styleCategory
    },
  },
}
</script>

<style scoped>
::v-deep .van-notice-bar__left-icon{
  color: theme('colors.primary');
}
</style>
