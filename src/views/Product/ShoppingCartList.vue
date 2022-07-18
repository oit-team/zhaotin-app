<template>
  <div class="bg-gray flex flex-col zt-page">
    <van-nav-bar
      title="进货车"
      :right-text="rightText"
      left-arrow
      @click-left="$router.back()"
      @click-right="changeRight"
    />

    <div class="flex-1 flex flex-col space-y-2 p-2">
      <ShopItem v-for="item of list" :key="item.styleId" class="mb-2" :item="item" :price="item.stylePrice">
        <template #checkbox>
          <van-checkbox
            icon-size="16px"
            checked-color="#CDA46C"
            label-disabled
            class="!w-5"
            :value="selectedMap[item.styleId] && selectedMap[item.styleId].length === item.style.length"
            @input="changeSelectItem(item, $event)"
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
              @input="changeSelectStyle(item, style.id, $event)"
            ></van-checkbox>
          </template>
        </ShopStyleItem>
      </ShopItem>
    </div>

    <div class="flex items-center p-3 h-12 bg-white sticky-bottom">
      <van-checkbox
        class="ml-2"
        icon-size="16px"
        checked-color="#CDA46C"
        :value="allChecked"
        @input="selectAll"
      >
        全选
      </van-checkbox>
      <div class="flex items-center ml-auto">
        <div v-if="priceData" class="flex flex-col whitespace-nowrap mr-2">
          <span class="text-xs text-right">已选{{ priceData.styleNumber }}件</span>
          <span class="flex text-xs">
            <span>共计</span>
            <vc-text :text="priceData.styleTotalPrice || 0" mode="price"></vc-text>
          </span>
        </div>
        <van-button class="!h-8" type="primary" @click="submit()">
          结算
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { keyBy } from 'lodash'
import { SUBMIT_ORDER_EVENT } from '../Order/OrderSubmit'
import { Dialog } from '@/components/vant'
import ShopItem from '@/components/business/ShoppingCart/ShopItem'
import ShopStyleItem from '@/components/business/ShoppingCart/ShopStyleItem'
import { deleteShoppingCartStyle, updateShoppingCart } from '@/api/order'
import { queryStylePrice } from '@/utils/actions'

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
      data: null,
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
      return this.list.every((item) => {
        if (this.selectedMap[item.styleId])
          return this.selectedMap[item.styleId].length === item.style.length

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
      if (check)
        this.list.forEach(item => this.changeSelectItem(item, true))
      else
        this.selectedMap = {}
    },
    changeNumber(style, id, {
      value,
      size,
    }) {
      const update = async () => {
        await this.updateShopCart()
        await this.loadPriceData()
      }

      if (value <= 0) {
        // FIXME 完善删除功能
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
            style: styleList.map((id) => {
              return listMap[styleId].style?.find(style => style.id === id)
            }),
          }
        })
    },
    submit() {
      if (!Object.values(this.selectedMap).some(item => item.length))
        return this.$toast('请选择商品')

      this.$root.$off(SUBMIT_ORDER_EVENT, this.clearSelectMap)
      this.$root.$once(SUBMIT_ORDER_EVENT, this.clearSelectMap)
      this.$router.to('OrderSubmit', {
        list: this.getSelectedList(),
      })
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
        style.forEach((item) => {
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
    /**
     * 已选商品价格
     */
    async getStylePrice() {
      const selectList = this.getSelectedList()
      const hasSelect = selectList.some(item => item.style.length)
      // 无选择时不调用接口
      if (!this.priceData?.styleList?.length && !hasSelect) return

      const res = await queryStylePrice(selectList)
      this.priceData = res.body
    },
    loadPriceData() {
      return this.getStylePrice()
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
      if (this.selectedMap !== {})
        this.deleteShoppingItem()
    },
  },
}
</script>

<style lang='scss' scoped>
.zt-page{
  min-height: 100vh;
}
</style>
