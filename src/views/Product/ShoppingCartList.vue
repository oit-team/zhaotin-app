<template>
  <div class="bg-gray flex flex-col zt-page">
    <van-nav-bar
      title="购物车"
      :right-text="rightText"
      left-arrow
      @click-left="$router.back()"
      @click-right="changeRight"
    />
    <div class="flex-1 flex flex-col space-y-2 p-2">
      <ShopItem v-for="item of list" :key="item.styleId" class="mb-2" :item="item" :price="getPrice(item)">
        <template #checkbox>
          <van-checkbox
            icon-size="16px"
            checked-color="#CDA46C"
            label-disabled
            class="!w-5"
            :value="selectedMap[item.styleId] && selectedMap[item.styleId].length === item.style.length"
            @input="checkFather(item ,item.styleId, $event)"
          ></van-checkbox>
        </template>
        <ShopStyleItem
          v-for="style of item.style"
          :key="style.id"
          :item="style"
          @change-number="changeNumber(item.style, style.id, $event)"
        >
          <template #checkbox>
            <van-checkbox
              icon-size="16px"
              checked-color="#CDA46C"
              label-disabled
              class="!w-5"
              :value="selectedMap[item.styleId] && selectedMap[item.styleId].includes(style.id)"
              @input="checkChild(item.styleId, style.id, $event)"
            ></van-checkbox>
          </template>
        </ShopStyleItem>
      </ShopItem>
    </div>
    <div class="flex items-center p-2 h-12 bg-white sticky-bottom">
      <van-checkbox
        icon-size="16px"
        checked-color="#CDA46C"
        v-model="allChecked"
        @change="checkAll()"
      >
        全选
      </van-checkbox>
      <div class="flex items-center ml-auto">
        <div v-if="priceData" class="flex flex-col whitespace-nowrap mr-2">
          <span class="text-xs text-right">已选{{ priceData.styleNumber }}件</span>
          <span class="flex text-xs">
            <span>共计</span>
            <span>￥{{ priceData.styleTotalPrice }}</span>
          </span>
        </div>
        <van-button class="!h-8" type="primary" @click="submit()">结算</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from '@/components/vant'
import ShopItem from '@/components/business/shopping-cart/ShopItem'
import ShopStyleItem from '@/components/business/shopping-cart/ShopStyleItem'
import { keyBy } from 'lodash'
import { deleteShoppingCartStyle, updateShoppingCart } from '@/api/order'
// import { SUBMIT_ORDER_EVENT } from '../order/submit-order'

export default {
  name: 'ShoppingCartList',
  components: {
    ShopItem,
    ShopStyleItem,
  },

  data() {
    return {
      rightText: '删除',
      select: true,
      selectedMap: {},
      priceData: null,
      listPriceData: [],
      data: null,
      checkAllList: [],
      allChecked: false,
    }
  },
  computed: {
    list() {
      return this.$store.state.shoppingCart.list
    },
    shoppingCartData() {
      return this.$store.state.shoppingCart.data
    },
    // allChecked() {
    //   return this.list.every(item => {
    //     if (this.selectedMap[item.styleId]) {
    //       return this.selectedMap[item.styleId].length === item.style.length
    //     }
    //     return false
    //   })
    // },
    listMap() {
      return keyBy(this.list, 'styleId')
    },
  },

  watch: {
    selectedMap: {
      deep: true,
      handler() {
        this.getStylePrice()
      },
    },
  },
  created() {
    this.loadData()
    // this.loadShoppingCart()
    console.log(this.$store.state.shoppingCart)
  },
  methods: {
    async loadData() {
      await this.loadShoppingCart()
      await this.loadPriceData()
    },
    async loadShoppingCart() {
      await this.$store.dispatch('shoppingCart/getShoppingCart')
    },
    changeSelectItem(item, check) {
      const styleIdList = this.selectedMap[item.styleId]
      if (check) {
        if (!styleIdList) this.$set(this.selectedMap, item.styleId, [])
        this.$set(this.selectedMap, item.styleId, item.style.map(({ id }) => id))
      } else {
        this.$set(this.selectedMap, item.styleId, [])
      }
    },
    changeSelectStyle(item, id, check) {
      const styleIdList = this.selectedMap[item.styleId]
      if (check) {
        if (!styleIdList) this.$set(this.selectedMap, item.styleId, [])
        this.selectedMap[item.styleId].push(id)
      } else if (styleIdList.includes(id)) {
        styleIdList.splice(styleIdList.indexOf(id), 1)
      }
    },
    selectAll(check) {
      if (check) {
        this.list.forEach(item => this.changeSelectItem(item, true))
      } else {
        this.selectedMap = {}
      }
    },
    changeNumber(style, id, {
      value,
      size,
    }) {
      const update = async () => {
        await this.updateShopCart()
        this.$store.commit('shoppingCart/setOrderList', this.getSelectedList())
        await this.loadPriceData()
      }

      if (value <= 0) {
        // uni.showModal({
        //   title: '提示',
        //   content: '确定要删除吗',
        //   success: ({ confirm }) => {
        //     if (confirm) {
        //       update()
        //       this.loadShoppingCart()
        //     } else {
        //       size.sizeNumber = 1
        //     }
        //   },
        // })
        Dialog.confirm({
          title: '提示',
          message: '确定要删除吗',
        })
          .then((confirm) => {
            if (confirm) {
              update()
              this.loadShoppingCart()
            } else {
              size.sizeNumber = 1
            }
          })
          .catch(() => {
            // on cancel
          })
        console.log(123)
      } else {
        update()
      }
    },
    getSelectedList() {
      const listMap = JSON.parse(JSON.stringify(this.listMap))
      return Object
        .entries(this.selectedMap)
        .map(([styleId, styleList]) => {
          return {
            ...listMap[styleId],
            style: styleList.map(id => {
              return listMap[styleId].style?.find(style => style.id === id)
            }),
          }
        })
    },
    submit() {
      if (!Object.values(this.selectedMap).some(item => item.some(count => count > 0))) {
        return this.$toast('请选择商品')
      }
      // uni.$off(SUBMIT_ORDER_EVENT, this.clearSelectMap)
      // uni.$once(SUBMIT_ORDER_EVENT, this.clearSelectMap)
      this.$Router.to('submitOrder')
    },
    clearSelectMap() {
      this.selectedMap = {}
    },
    async updateShopCart() {
      const list = []
      const selectList = this.$store.state.shoppingCart.list || []
      selectList.forEach(({
        style,
        styleNo,
      }) => {
        style.forEach(item => {
          list.push({
            styleNo,
            styleId: item.styleId,
            styleSize: item.styleSize,
            styleColor: item.id,
          })
        })
      })
      await this.$promiseLoading(updateShoppingCart({
        styleList: list,
      }))
    },
    async getStylePrice() {
      this.$store.commit('shoppingCart/setOrderList', this.getSelectedList())
      const res = await this.$store.dispatch('shoppingCart/getStylePrice')
      this.priceData = res.body
    },
    async getStyleListPrice() {
      const res = await this.$store.dispatch('shoppingCart/getStylePrice', true)
      const data = res.body
      data.styleMap = keyBy(data.styleList, 'styleId')
      this.listPriceData = res.body
    },
    loadPriceData() {
      return Promise.all([this.getStylePrice(), this.getStyleListPrice()])
    },
    getPrice(item) {
      return this.listPriceData?.styleMap?.[item.styleId]?.stylePrice || 0
    },
    async deleteShoppingItem() {
      const styleList = []

      Object.entries(this.selectedMap).forEach(([key, value]) => {
        const item = value.map(id => ({
          styleId: key,
          styleColor: id,
        }))
        styleList.push(...item)
      })

      if (!styleList.length) return this.$toast('请先选择')

      // await this.$toast('确定要删除所选商品吗？')
      Dialog.confirm({
        title: '提示',
        message: '确定要删除吗',
      })
        .then(async () => {
          await deleteShoppingCartStyle({
            styleList,
            shoppingCartId: this.shoppingCartData.id,
          })
          await this.loadShoppingCart()
          this.selectedMap = {}
          await this.loadPriceData()
          this.$toast('删除成功')
        })
        .catch(() => {
          // on cancel
          this.$toast('删除失败')
        })
    },
    changeRight() {
      if (this.selectedMap !== {}) {
        this.deleteShoppingItem()
      }
    },
    // 底部全选
    checkAll() {
      console.log(this.allChecked)
      if (this.allChecked) {
        this.list.forEach(e => {
          this.$set(this.selectedMap, e.styleId, [])
          if (e.style.length) {
            e.style.forEach(i => {
              this.selectedMap[e.styleId].push(i.id)
            })
          }
        })
      } else {
        this.selectedMap = {}
      }
    },
    // 商品选择
    checkFather(item, itemId, e) {
      const that = this
      if (e) {
        that.selectedMap[itemId] = []
        item.style.forEach(i => {
          that.selectedMap[itemId].push(i.id)
        })
      } else {
        delete that.selectedMap[itemId]
      }
      that.$forceUpdate()
      console.log(that.selectedMap)
    },
    checkChild(itemId, styleId, e) {
      const that = this
      const styleIdList = that.selectedMap[itemId]
      if (e) {
        if (!styleIdList) that.$set(that.selectedMap, itemId, [])
        that.selectedMap[itemId].push(styleId)
      } else if (styleIdList.includes(styleId)) {
        styleIdList.splice(styleIdList.indexOf(styleId), 1)
      }
      that.$forceUpdate()
      console.log(that.selectedMap)
    },
    // isAllcheck() {
    //   this.list.forEach(e => {
    //     if (this.selectedMap[e.styleId] && this.selectedMap[e.styleId].length === e.style.length) {
    //       this.allChecked = true
    //     } else {
    //       this.allChecked = false
    //     }
    //   })
    // },
  },
}
</script>

<style lang='scss' scoped>
.zt-page{
  min-height: 100vh;
}
</style>