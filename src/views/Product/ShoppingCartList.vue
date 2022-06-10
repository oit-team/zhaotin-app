<template>
  <div class="bg-gray zt-page">
    <van-nav-bar
      title="购物车"
      :right-text="rightText"
      left-arrow
      @click-left="$router.back()"
      @click-right="changeRight"
    />
    <div class="flex-1 flex flex-col space-y-2 p-2">
      <van-checkbox-group v-model="checkList" ref="checkboxGroup">
        <ShopItem v-for="item of list" :key="item.styleId" :item="item" :price="getPrice(item)">
          <!-- {{ item }} -->
          <template #checkbox>
            <van-checkbox
              ref="childCheckbox"
              icon-size="16px"
              checked-color="#CDA46C"
              label-disabled
              class="!w-5"
              @change="childCheck"
              :name="selectedMap[item.styleId] && selectedMap[item.styleId].length === item.style.length"
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
                :name="selectedMap[item.styleId] && selectedMap[item.styleId].includes(style.id)"
              ></van-checkbox>
            </template>
          </ShopStyleItem>
        </ShopItem>
      </van-checkbox-group>
    </div>
    <div class="flex items-center p-2 h-12 bg-white sticky-bottom">
      <!-- <ShopCheckbox :value="allChecked" :disabled="!list.length" @input="selectAll">全选</ShopCheckbox> -->
      <van-checkbox
        icon-size="16px"
        checked-color="#CDA46C"
        v-model="allCheck"
        @change="checkAll"
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
import ShopItem from '@/components/business/shopping-cart/shop-item'
import ShopStyleItem from '@/components/business/shopping-cart/shop-style-item'
import { keyBy } from 'lodash'
// import { getShoppingCart } from '@/api/product'
// import { deleteShoppingCartStyle, updateShoppingCart } from '@/api/order'
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
      isDelete: true,
      select: true,
      selectedMap: {},
      priceData: null,
      listPriceData: [],
      // list: [],
      data: null,
      checkList: [],
      allCheck: false,
    }
  },
  computed: {
    list() {
      return this.$store.state.shoppingCart.list
    },
    shoppingCartData() {
      return this.$store.state.shoppingCart.data
    },
    allChecked() {
      return this.list.every(item => {
        if (this.selectedMap[item.styleId]) {
          return this.selectedMap[item.styleId].length === item.style.length
        }
        return false
      })
    },
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
      // const res = await getShoppingCart({})
      // this.data = res.body.resultList
      // this.list = res.body.resultList.styleList
      // console.log(this.data)
      // console.log(this.list)
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
    // changeNumber(style, id, {
    //   value,
    //   size,
    // }) {
    //   const update = async () => {
    //     await this.updateShopCart()
    //     this.$store.commit('shoppingCart/setOrderList', this.getSelectedList())
    //     await this.loadPriceData()
    //   }

    //   if (value <= 0) {
    //     // uni.showModal({
    //     //   title: '提示',
    //     //   content: '确定要删除吗',
    //     //   success: ({ confirm }) => {
    //     //     if (confirm) {
    //     //       update()
    //     //       this.loadShoppingCart()
    //     //     } else {
    //     //       size.sizeNumber = 1
    //     //     }
    //     //   },
    //     // })
    //     console.log(123)
    //   } else {
    //     update()
    //   }
    // },
    getSelectedList() {
      const listMap = JSON.parse(JSON.stringify(this.listMap))
      return Object
        .entries(this.selectedMap)
        .map(([styleId, styleList]) => {
          // styleList.filter(({ id }) => {
          //   console.log(id)
          //   return listMap[styleId].style?.find(style => style.id === id)
          // })
          // list.push({
          //   ...listMap[styleId],
          //   style: styleList.map(id => {
          //     return listMap[styleId].style?.find(style => style.id === id)
          //   }),
          // })
          return {
            ...listMap[styleId],
            style: styleList.map(id => {
              return listMap[styleId].style?.find(style => style.id === id)
            }),
          }
        })
    },
    // submit() {
    //   if (!Object.values(this.selectedMap).some(item => item.some(count => count > 0))) {
    //     return this.$toast('请选择商品')
    //   }
    //   // uni.$off(SUBMIT_ORDER_EVENT, this.clearSelectMap)
    //   // uni.$once(SUBMIT_ORDER_EVENT, this.clearSelectMap)
    //   this.$Router.to('submitOrder')
    // },
    // clearSelectMap() {
    //   this.selectedMap = {}
    // },
    // async updateShopCart() {
    //   const list = []
    //   const selectList = this.$store.state.shoppingCart.list || []
    //   selectList.forEach(({
    //     style,
    //     styleNo,
    //   }) => {
    //     style.forEach(item => {
    //       list.push({
    //         styleNo,
    //         styleId: item.styleId,
    //         styleSize: item.styleSize,
    //         styleColor: item.id,
    //       })
    //     })
    //   })
    //   await this.$promiseLoading(updateShoppingCart({
    //     styleList: list,
    //   }))
    // },
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
    // async deleteShoppingItem() {
    //   const styleList = []

    //   Object.entries(this.selectedMap).forEach(([key, value]) => {
    //     const item = value.map(id => ({
    //       styleId: key,
    //       styleColor: id,
    //     }))
    //     styleList.push(...item)
    //   })

    //   if (!styleList.length) return this.$toast('请先选择')

    //   await this.$showToast('确定要删除所选商品吗？')
    //   await deleteShoppingCartStyle({
    //     styleList,
    //     shoppingCartId: this.shoppingCartData.id,
    //   })
    //   await this.loadShoppingCart()
    //   this.selectedMap = {}
    //   await this.loadPriceData()
    //   this.$toast('删除成功')
    // },
    changeRight() {
      this.rightText = this.isDelete ? '删除' : '取消'
      this.isDelete = !this.isDelete
    },
    checkAll() {
      if (this.allCheck) {
        this.$refs.checkboxGroup.toggleAll(true)
      } else {
        this.$refs.checkboxGroup.toggleAll()
      }
    },
    childCheck(e) {
      console.log(e)
      if (e) {
        this.$refs.childCheckbox.toggleAll(true)
      } else {
        this.$refs.childCheckbox.toggleAll()
      }
    },
  },
}
</script>

<style lang='scss' scoped>
.zt-page{
  min-height: 100vh;
}
</style>
