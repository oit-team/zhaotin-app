<template>
  <vc-container class="bg-gray">
    <Search v-if="!pointsMall" is-link back>
      <template #after>
        <ShopCartIcon class="ml-3 mr-2" />
      </template>
    </Search>
    <van-nav-bar
      v-else
      title="兑品详情"
      left-arrow
      @click-left="$router.back()"
    />

    <div class="flex-1 overflow-auto">
      <Swiper :data="data" />

      <div class="p-3">
        <div class="p-3 mb-2 bg-white rounded-lg">
          <div class="mb-2">
            <span class="font-bold">{{ data.styleName }}</span>
          </div>
          <div class="flex justify-between items-center">
            <div>
              <div class="items-center mb-2">
                <span class="text-sm text-secondary">款号：</span>
                <span class="text-sm">{{ data.styleNo }}</span>
              </div>
              <div class="relative flex flex-row items-center">
                <span class="text-sm text-secondary">推荐：</span>
                <van-rate count="5" :value="data.recommendationLevel" size="12"></van-rate>
                <div class="absolute inset-0"></div>
              </div>
            </div>
            <div class="flex flex-col items-end">
              <vc-text mode="price" :text="data.tradePrice || 0"></vc-text>
              <div v-if="pointsMall">
                <span>积分：</span>
                <vc-text class="text-primary" mode="price" text-symbol="" :text="data.goodsPtice || 0"></vc-text>
              </div>
            </div>
          </div>
        </div>

        <div class="p-3 mb-2 bg-white rounded-lg flex flex-col">
          <div class="flex" @click="openChoose(1)">
            <span class="mr-3 text-sm text-secondary">规格</span>
            <span class="flex-1 text-sm">{{ colorCount }}种颜色 · {{ sizeCount }} 种尺码 可选</span>
            <vc-icon class="text-sm text-primary" name="chevron-right"></vc-icon>
          </div>
          <div class="flex mt-4" @click="showProperty = true">
            <span class="mr-3 text-sm text-secondary">属性</span>
            <div class="flex flex-row flex-1 -ml-2 divide-x divide-line overflow-hidden">
              <span class="px-2 text-sm truncate">{{ data.styleFabric }}</span>
              <span class="px-2 text-sm truncate">{{ data.styleFlowerPattern }}</span>
              <span class="px-2 text-sm truncate">{{ data.styleCategory }}</span>
            </div>
            <vc-icon class="text-sm text-primary" name="chevron-right"></vc-icon>
          </div>
          <div class="flex mt-4" @click="showProperty = true">
            <span class="mr-3 text-sm text-secondary">标签</span>
            <span class="flex-1 text-sm truncate">
              {{ data.styleLabel && data.styleLabel.replace(/[,，]/g, ' ') }}
            </span>
            <vc-icon class="text-sm text-primary" name="chevron-right"></vc-icon>
          </div>
        </div>

        <div class="p-3 mb-2 bg-white rounded-lg" @click="showSellingPoint = true">
          <div class="flex-row items-center mb-3 flex">
            <span class="flex-1 font-bold text-sm leading-16px">商品卖点</span>
            <vc-icon class="text-sm text-primary" name="chevron-right"></vc-icon>
          </div>
          <div>
            <div
              v-for="item of [
                {key: 'sellingPointFabric', name: '面料'},
                {key: 'designSellingPoint', name: '设计'},
                {key: 'wearSellingPoint', name: '穿着'},
              ]"
              :key="item.key"
              class="flex flex-row items-center mt-3"
            >
              <span class="mr-4 text-sm leading-16px text-secondary self-start">{{ item.name }}</span>
              <span v-html="data[item.key]" class="flex-1 text-xs line-clamp-2 leading-16px"></span>
            </div>
          </div>
        </div>

        <div v-if="data._styleData && data._styleData.length" class="p-3 mb-2 bg-white rounded-lg">
          <span class="flex-1 font-bold text-sm">商品属性</span>
          <div
            v-for="(item, index) of data._styleData"
            :key="index"
            class="flex flex-row items-center py-2 border-b border-line"
          >
            <span class="mr-6 text-sm w-120rpx text-secondary">{{ item.name }}</span>
            <div
              class="flex flex-row flex-1 justify-around py-1 text-center tags"
            >
              <span
                v-for="opt of item.options"
                :key="opt.option"
                class="text-sm text-center rounded leading-24px w-1/3 mx-2"
                :class="opt.status ? 'bg-primary text-white' : ''"
              >
                {{ opt.option }}
              </span>
            </div>
          </div>
        </div>

        <div v-if="data._title && data._title.length" class="p-3 mb-2 bg-white rounded-lg">
          <div class="font-bold mb-3 text-sm">尺码信息</div>

          <div class="overflow-x-auto">
            <table class="text-sm text-center whitespace-nowrap">
              <thead>
                <tr>
                  <th class="font-normal pr-6 sticky left-0 bg-white text-secondary">尺码</th>
                  <th
                    v-for="item of data._title"
                    :key="item"
                    class="font-normal px-6"
                  >
                    {{ item }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="size of data.styleSizeList"
                  :key="size.sizeName"
                  class="h-8"
                >
                  <td class="pr-6 sticky left-0 bg-white text-secondary">{{ size.sizeName }}</td>
                  <td
                    v-for="(item, index) of size.sizeConfig"
                    :key="index"
                  >
                    {{ item }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-if="data._styleWashing && data._styleWashing.length" class="p-3 mb-2 bg-white rounded-lg">
          <span class="pb-2 font-bold text-sm">洗涤说明</span>

          <div class="grid grid-cols-4 gap-2">
            <div
              v-for="(item, index) of data._styleWashing"
              :key="index"
              class="flex flex-col items-center"
            >
              <vc-img :src="item.resUrl" height="50px" width="50px"></vc-img>
              <span class="text-xs text-center">{{ item.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-center px-3 bg-white h-15 sticky-bottom border-t border-line">
      <template v-if="!pointsMall">
        <div class="flex space-x-3 text-center whitespace-nowrap mr-2">
          <div @click="addStyleCollection()">
            <vc-icon
              :class="{'text-primary': data.styleIsCollection}"
              :name="data.styleIsCollection ? 'star' : 'star-o'"
            ></vc-icon>
            <div class="text-xs transform scale-65">收藏</div>
          </div>
          <div @click="callCustomerService()">
            <vc-icon name="message"></vc-icon>
            <div class="text-xs transform scale-65">客服</div>
          </div>
        </div>
        <div class="flex flex-1 space-x-2">
          <van-button
            class="!text-white"
            block
            color="#FF9326"
            text="加入进货车"
            round
            @click="openChoose(0)"
          ></van-button>
          <van-button
            class="!bg-price !text-white"
            block
            text="立即订购"
            round
            @click="openChoose(1)"
          ></van-button>
        </div>
      </template>
      <template v-else>
        <van-button class="bg-price text-white" block round @click="openChoose(2)">立即兑换</van-button>
      </template>
    </div>

    <ProductChoose ref="productChoose" :data="data" @confirm="confirm"></ProductChoose>

    <van-popup v-model="showProperty" position="bottom">
      <div class="bg-white h-[50vh] overflow-auto rounded-t-xl flex flex-col">
        <vc-tabs class="my-2">
          <van-tab title="基本信息"></van-tab>
        </vc-tabs>
        <div class="text-sm px-6 flex-1 overflow-auto">
          <div
            v-for="item of [
              {title: '款式', key: 'styleLength'},
              {title: '类别', key: 'styleCategory'},
              {title: '标签', key: 'styleLabel'},
              {title: '场合', key: 'styleInfo'},
              {title: '材质', key: 'styleFabric'},
              {title: '廓形', key: 'styleFlowerPattern'},
            ]"
            :key="item.key"
            class="py-3 border-b border-line"
          >
            <span class="mr-4 text-secondary">{{ item.title }}</span>
            <span class="text-sm">{{ data[item.key] }}</span>
          </div>
          <div class="flex flex-row py-3 border-b border-line">
            <span class="mr-4 text-secondary">服务</span>
            <span v-html="data.service"></span>
          </div>
        </div>
      </div>
    </van-popup>

    <van-popup v-model="showSellingPoint" position="bottom">
      <div class="bg-white h-[50vh] rounded-t-xl flex flex-col">
        <vc-tabs v-model="sellingPointIndex" class="my-2">
          <van-tab v-for="tab of ['面料卖点', '设计卖点', '穿着卖点']" :key="tab" :title="tab"></van-tab>
        </vc-tabs>
        <div class="text-sm leading-loose py-2 px-6 flex-1 overflow-auto">
          <div v-html="data[['sellingPointFabric', 'designSellingPoint', 'wearSellingPoint'][sellingPointIndex]]"></div>
        </div>
      </div>
    </van-popup>
  </vc-container>
</template>

<script>
import Search from '@/components/business/Product/Search'
import Swiper from '@/components/business/Product/Swiper'
import ProductChoose from '@/components/business/Product/ProductChoose'
import ShopCartIcon from '@/components/business/ShoppingCart/ShopCartIcon'
import { addStyleCollection, delStyleCollection, getStyleById, insertShoppingCart } from '@/api/product'
import theme from '@/theme'
import { keyBy } from 'lodash'
import { callCustomerService } from '@/utils'
import { SUBMIT_ORDER_EVENT } from '../Order/OrderSubmit'
import { getGoodsDetails } from '../../api/pointsMall'

const MODE = {
  SHOPPING_CART: 0,
  ORDER: 1,
  POINTS_MALL: 2,
}

export default {
  name: 'ProductDetail',

  components: {
    Search,
    Swiper,
    ProductChoose,
    ShopCartIcon,
  },

  data() {
    return {
      MODE,
      theme,
      styleId: '',
      keyword: '',
      data: {},
      // 订购方式
      mode: 0,
      showShopping: false,
      showProperty: false,
      showSellingPoint: false,
      sellingPointIndex: 0,
    }
  },

  computed: {
    styleColorMap() {
      return keyBy(this.data?.styleColorList, 'id')
    },
    colorCount() {
      return this.data?.styleColorList?.length ?? 0
    },
    sizeCount() {
      return this.data?.styleColorList?.reduce((prev, curr) => prev + curr.styleSize.length, 0)
    },
    diffKeys() {
      return this.pointsMall
        ? {}
        : {}
    },
  },

  watch: {
    styleId: 'getStyleInfo',
  },

  beforeCreate() {
    this.pointsMall = this.$route.meta.pointsMall
  },

  activated() {
    this.styleId = this.$route.params.styleId
  },

  methods: {
    callCustomerService,
    async getStyleInfo() {
      try {
        const api = this.pointsMall ? getGoodsDetails : getStyleById
        const res = await this.$promiseLoading(api(this.styleId))
        const data = res?.body.resultList
        // 根据是否是积分商城判断不同的状态值
        if (this.pointsMall ? data.state === 2 : data.status === 0) {
          this.$toast.fail('商品已下架')
          this.$router.back()
          return
        }
        data._styleData = data.styleData ? JSON.parse(data.styleData) : []
        data._styleWashing = (data.styleWashing ? JSON.parse(data.styleWashing) : []).filter(item => item.status)
        data._title = data.titleMap && Object
          .keys(data.titleMap)
          .sort((prev, next) => (+prev.substring(3)) - (+next.substring(3)))
          .map(key => data.titleMap[key])
        this.data = res?.body.resultList
      } catch (e) {
        console.error(e)
        this.$router.back()
        return Promise.reject(e)
      }
    },
    openChoose(mode) {
      this.mode = mode
      this.$refs.productChoose.open()
    },
    confirm(select) {
      const styleList = []
      Object
        .entries(select)
        .forEach(([styleId, sizeInfo]) => {
          const color = this.styleColorMap[styleId]
          const size = Object
            .entries(sizeInfo)
            .filter(([, num]) => num > 0)
            .map(([sizeName, sizeNumber]) => ({
              sizeName,
              sizeNumber,
            }))
          if (size.length) {
            let styleItem = {
              styleColor: color.id,
              styleColorName: color.styleColor,
              styleId: this.data.styleId,
              styleNo: this.data.styleNo,
              styleSize: size,
            }

            if (this.mode === MODE.ORDER) {
              styleItem = {
                ...color,
                ...styleItem,
                imgUrl: color?.styleImg[0]?.resUrl,
              }
            }

            styleList.push(styleItem)
          }
        })

      if (!styleList.length) return this.$toast('请选择下单数量')

      switch (this.mode) {
        // 添加到进货车
        case MODE.SHOPPING_CART:
          this.insertShoppingCart(styleList)
          break
        // 提交积分订单
        case MODE.POINTS_MALL:
        // 提交订单
        // eslint-disable-next-line no-fallthrough
        case MODE.ORDER: {
          const orderItem = {
            style: styleList,
            styleId: this.data.styleId,
            styleName: this.data.styleName,
            styleNo: this.data.styleNo,
          }

          if (this.mode === MODE.POINTS_MALL) {
            orderItem.goodsId = this.data.goodsId
            orderItem.goodsIntegral = this.data.goodsIntegral
            orderItem.goodsCode = this.data.goodsCode
          }

          const order = [orderItem]

          this.$root.$once(SUBMIT_ORDER_EVENT, () => {
            const choose = this.$refs.productChoose
            choose.reset()
            choose.close()
          })
          this.$store.commit('shoppingCart/setOrderList', order)
          this.$router.to('OrderSubmit', {
            pointsMall: this.pointsMall,
            list: order,
          })
          break
        }
      }
    },
    async insertShoppingCart(styleList) {
      await this.$promiseLoading(insertShoppingCart({ styleList }))
      await this.$store.dispatch('shoppingCart/getShoppingCart')
      this.$toast.success('添加成功')
    },
    genTabs(tabs) {
      return tabs.map(name => ({ name }))
    },
    async addStyleCollection() {
      if (this.data.styleIsCollection) {
        await this.$dialog.confirm({
          title: '提示',
          message: '要取消收藏吗？',
        })
        await this.$promiseLoading(delStyleCollection(this.data.styleId))
        this.$toast('已取消收藏')
      } else {
        await this.$promiseLoading(addStyleCollection({
          styleId: this.data.styleId,
        }))
        this.$toast.success('收藏成功')
      }

      this.data.styleIsCollection = !this.data.styleIsCollection
    },
  },
}
</script>

<style scoped>

</style>
