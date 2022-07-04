<template>
  <div class="bg-line flex flex-col">
    <van-nav-bar
      title="提交订单"
      left-arrow
      @click-left="$router.back()"
    />

    <div class="mx-2 mt-2 px-4 flex items-center bg-white rounded-lg p-2" @click="switchAddress()">
      <div v-if="addressInfo" class="flex items-center flex-1">
        <div class="flex-1">
          <div>{{ addressInfo.address }}</div>
          <div class="text-sm">
            <span class="mr-2 font-bold">{{ addressInfo.consignee }}</span>
            <span>{{ addressInfo.contactNum }}</span>
          </div>
        </div>
      </div>
      <div v-else class="flex-1 flex items-center">
        <vc-icon name="icon-pos" size="30"></vc-icon>
        <div class="text-sm text-secondary">请先添加地址</div>
      </div>
      <div class="mr-2">
        <vc-icon name="icon-chevron-right"></vc-icon>
      </div>
    </div>

    <div class="bg-white rounded-lg mx-2 mt-2 p-2 px-4 text-sm" @click="showReasonPopup = true">
      <span>下单事由</span>
      <span class="float-right">
        <span class="text-secondary">{{ form.orderReason || '请选择下单事由' }}</span>
        <!-- <vc-icon name="icon-chevron-right"></vc-icon> -->
      </span>
    </div>

    <div class="flex-1 p-2 space-y-2">
      <ShopItem
        v-for="item of list"
        :key="item.styleId"
        :item="item"
        :price="getPrice(item)"
      >
        <ShopStyleItem
          v-for="style of item.style"
          :key="style.id"
          :item="style"
          readonly
        >
        </ShopStyleItem>
      </ShopItem>
    </div>

    <div class="sticky-bottom bg-white h-12 p-3 flex items-center justify-between">
      <div class="pl-1">
        <div v-if="priceData" class="flex flex-col whitespace-nowrap mr-2">
          <span class="text-xs">已选{{ priceData.styleNumber }}件</span>
          <span class="flex text-xs">
            <span>共计</span>
            <vc-text mode="price" :text="priceData.styleTotalPrice"></vc-text>
          </span>
        </div>
      </div>
      <div>
        <van-button class="!h-8" type="primary" @click="submit()">提交订单</van-button>
      </div>
    </div>

    <!-- 弹出框 -->
    <div>
      <van-popup v-model="showReasonPopup" position="bottom" closeable @close="showReasonPopup = false">
        <van-form
          ref="form"
          class="rounded-t-lg bg-white px-3 pb-2 pt-5"
          :model="tempForm"
          :rules="rules"
          label-position="top"
        >
          <van-field
            required
            label="类型"
            label-width="30"
            prop="orderReason"
            border-bottom
          >
            <template #input>
              <van-radio-group
                v-model="tempForm.orderReason"
                class="space-y-2"
              >
                <van-radio
                  v-for="item of orderReasonList"
                  :key="item"
                  :name="item"
                  icon-size="16px"
                >
                  {{ item }}
                </van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field
            type="textarea"
            rows="2"
            label="备注"
            label-width="30"
            v-model="tempForm.orderNote"
            placeholder="请输入备注"
            show-word-limit
            height="40"
          ></van-field>
          <van-button block class="my-2" type="primary" @click="confirmForm()">确定</van-button>
        </van-form>
      </van-popup>
    </div>
  </div>
</template>

<script>
import ShopItem from '@/components/business/ShoppingCart/ShopItem'
import ShopStyleItem from '@/components/business/ShoppingCart/ShopStyleItem'
import { keyBy } from 'lodash'
import { getReceiving } from '@/api/account'
import { addOrder } from '@/api/order'
import { dictitemInfoAllMethod } from '@/api/product'

export const SUBMIT_ORDER_EVENT = 'page:submit-order'

export default {
  name: 'OrderSubmit',

  components: {
    ShopItem,
    ShopStyleItem,
  },

  data: () => ({
    addressInfo: null,
    priceData: null,
    orderReasonList: [],
    tempForm: {
      orderReason: '',
      orderNote: '',
    },
    form: {},
    rules: {
      orderReason: [
        {
          required: true,
          message: '请选择类型',
          trigger: ['change'],
        },
      ],
    },
    showReasonPopup: false,
  }),

  computed: {
    list() {
      return this.$store.state.shoppingCart.orderList
    },
  },

  created() {
    this.$promiseLoading([
      this.getReceiving(),
      this.getStylePrice(),
      this.dictitemInfoAllMethod(),
    ])
  },

  methods: {
    async submit() {
      const styleList = this.list.reduce((prev, curr) => {
        const styles = curr.style.map(item => ({
          styleId: item.styleId,
          styleColor: item.id,
          styleNo: curr.styleNo,
          styleSize: item.styleSize,
        }))
        return [...prev, ...styles]
      }, [])

      await this.$promiseLoading(
        addOrder({
          receivingId: this.addressInfo.id,
          orderType: 1,
          styleList,
          ...this.form,
        }),
      )
      await this.$store.commit('shoppingCart/setOrderList', [])
      this.$root.$emit(SUBMIT_ORDER_EVENT)
      this.$toast('下单成功！')
      this.$store.dispatch('shoppingCart/getShoppingCart')
      this.$router.back()
    },
    async getReceiving() {
      const res = await getReceiving()
      this.addressInfo = res.body.resultList[0]
    },
    switchAddress() {
      this.$root.$once('page:switch-address', item => {
        this.addressInfo = item
      })
      this.$router.to('Address', {
        selectMode: true,
      })
    },
    async getStylePrice() {
      const res = await this.$store.dispatch('shoppingCart/getStylePrice')
      const data = res.body
      data.styleMap = keyBy(data.styleList, 'styleId')
      this.priceData = data
    },
    getPrice(item) {
      return this.priceData?.styleMap?.[item.styleId]?.stylePrice || 0
    },
    async dictitemInfoAllMethod() {
      const res = await dictitemInfoAllMethod({
        type: 'ORDER_REASON',
      }, {
        cmd: 100009,
      })
      this.orderReasonList = res.body.result.map(item => item.dicttimeDisplayName)
    },
    async confirmForm() {
      await this.$refs.form.validate()
      this.form = this.tempForm
      this.showReasonPopup = false
    },
  },
}
</script>

<style lang='scss' scoped>

</style>
