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
        <div class="text-sm text-secondary">
          请先添加地址
        </div>
      </div>
      <div class="mr-2">
        <vc-icon name="chevron-right"></vc-icon>
      </div>
    </div>

    <div v-if="!pointsMall" class="bg-white rounded-lg mx-2 mt-2 p-2 px-4 text-sm" @click="showReasonPopup = true">
      <span>下单事由</span>
      <span class="float-right">
        <span class="text-secondary">{{ form.orderReason || '请选择下单事由' }}</span>
        <vc-icon name="chevron-right"></vc-icon>
      </span>
    </div>

    <div class="flex-1 p-2 space-y-2">
      <!-- 标准商品 -->
      <template v-if="!pointsMallItem">
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
          <template v-if="pointsMall" #price>
            <div class="flex text-sm mr-2">
              <span>单件积分：</span>
              <span class="text-primary">{{ item.goodsIntegral }}</span>
            </div>
          </template>
        </ShopItem>
      </template>
      <!-- 积分商品 -->
      <template v-if="pointsMallItem">
        <div class="bg-white rounded-lg p-2 flex items-center">
          <vc-img class="mr-2" :src="pointsMallItem.imgUrlList[0]" size="40"></vc-img>
          <span class="mr-2 flex-1 truncate">{{ pointsMallItem.goodsName }}</span>
          <span class="text-primary">{{ pointsMallItem.goodsIntegral }}</span>
        </div>

        <van-field
          v-model="remark"
          class="rounded-lg"
          type="textarea"
          rows="1"
          maxlength="120"
          show-word-limit
          placeholder="请输入备注"
        />
      </template>
    </div>

    <div class="sticky-bottom bg-white h-12 p-3 flex items-center justify-between">
      <div class="pl-1">
        <div v-if="pointsMall" class="flex flex-col whitespace-nowrap mr-2">
          <span class="text-xs">已选{{ total }}件</span>
          <span class="flex text-xs">
            <span>共计积分：</span>
            <span class="text-primary">{{ orderIntegral }}</span>
          </span>
        </div>
        <div v-if="priceData" class="flex flex-col whitespace-nowrap mr-2">
          <span class="text-xs">已选{{ priceData.styleNumber }}件</span>
          <span class="flex text-xs">
            <span>共计</span>
            <vc-text mode="price" :text="priceData.styleTotalPrice"></vc-text>
          </span>
        </div>
      </div>
      <div>
        <van-button class="!h-8" type="primary" @click="submit()">
          提交订单
        </van-button>
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
            v-model="tempForm.orderNote"
            type="textarea"
            rows="2"
            label="备注"
            label-width="30"
            placeholder="请输入备注"
            show-word-limit
            height="40"
          ></van-field>
          <van-button class="my-2" block type="primary" @click="confirmForm()">
            确定
          </van-button>
        </van-form>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { keyBy } from 'lodash'
import { queryStylePrice } from '../../utils/actions'
import ShopItem from '@/components/business/ShoppingCart/ShopItem'
import ShopStyleItem from '@/components/business/ShoppingCart/ShopStyleItem'
import { getReceiving } from '@/api/account'
import { addIntegralOrder, addOrder, getOrderIntegral } from '@/api/order'
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
    orderIntegral: 0,
    tempForm: {
      orderReason: '',
      orderNote: '',
    },
    form: {},
    remark: '',

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
    // list() {
    //   return this.$store.state.shoppingCart.orderList
    // },
    // 积分商品总数
    total() {
      return this.pointsMallItem
        ? 1
        : this.list[0]?.style?.reduce((prev, curr) => {
          return curr.styleSize.reduce((prev, curr) => prev + curr.sizeNumber, prev)
        }, 0)
    },
  },

  created() {
    const { params } = this.$route
    // 标准商品
    this.list = params.list
    // 标记是否是积分商城订单
    this.pointsMall = params.pointsMall
    // 积分商品项目
    this.pointsMallItem = params.pointsMallItem

    this.$promiseLoading([
      this.getReceiving(),
      this.pointsMall ? this.getOrderIntegral() : this.getStylePrice(),
      this.dictitemInfoAllMethod(),
    ])
  },

  methods: {
    async submit() {
      if (!this.pointsMall) {
        await this.submitOrder()
        this.$store.dispatch('shoppingCart/getShoppingCart')
      } else {
        await this.submitPointMallOrder()
      }

      await this.$store.commit('shoppingCart/setOrderList', [])
      this.$root.$emit(SUBMIT_ORDER_EVENT)
      this.$toast('下单成功！')
      this.$router.back()
    },
    async submitOrder() {
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
    },
    async submitPointMallOrder() {
      let item = {}
      let orderRemarks = ''

      if (this.pointsMallItem) {
        if (!this.remark) {
          this.$toast('请填写备注')
          throw new Error('请填写备注')
        }
        orderRemarks = this.remark
        item = this.pointsMallItem
      } else {
        item = this.list[0]
        const remark = item.style.reduce((prev, curr) => {
          const styleSize = curr.styleSize.reduce((prev, curr) => {
            return `${prev}${curr.sizeName}×${curr.sizeNumber} `
          }, '')

          return `${prev}${curr.styleColorName} ${styleSize}\n`
        }, '')
        orderRemarks = remark.replace(/ \n$/, '')
      }

      const params = {
        orderUser: this.$store.state.userData.id,
        receivingId: this.addressInfo.id,
        goodsId: item.goodsId,
        goodsNumber: this.pointsMallItem ? 1 : this.total,
        goodsNo: item.goodsCode,
        goodsIntegral: item.goodsIntegral,
        orderRemarks,
      }

      await this.$promiseLoading(
        addIntegralOrder(params),
      )
    },
    async getReceiving() {
      const res = await getReceiving()
      this.addressInfo = res.body.resultList[0]
    },
    switchAddress() {
      this.$root.$once('switch-address', (item) => {
        this.addressInfo = item
      })
      this.$router.to('Address', {
        selectMode: true,
      })
    },
    async getStylePrice() {
      const res = await queryStylePrice(this.list)
      const data = res.body
      data.styleMap = keyBy(data.styleList, 'styleId')
      this.priceData = data
    },
    async getOrderIntegral() {
      const item = this.pointsMallItem ?? this.list[0]
      if (!item) return

      const res = await getOrderIntegral({
        goodsId: item.goodsId,
        goodsNumber: this.total,
      })
      this.orderIntegral = res.body.orderIntegral
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

<style lang="scss" scoped>

</style>
