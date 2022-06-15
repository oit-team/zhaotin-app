<template>
  <div class="bg-line flex flex-col">
    <van-nav-bar
      title="收货地址"
      left-arrow
      @click-left="$router.back()"
    />

    <div class="p-2 flex-1 overflow-auto space-y-2">
      <div
        v-for="item of addressList"
        :key="item.id"
        class="bg-white mb-2"
      >
        <van-swipe-cell class="rounded-lg">
          <div
            class="flex items-center px-2 py-1"
            @click="select(item)"
          >
            <div class="flex flex-col flex-1">
              <div class="flex items-center">
                <van-tag
                  v-if="item.defaultNum"
                  class="mr-2"
                  :color="$theme.colors.primary"
                  :border-color="$theme.colors.primary"
                  size="mini"
                >
                  默认
                </van-tag>
                <span class="mr-2 font-bold">{{ item.consignee }}</span>
                <span class="text-xs text-secondary">{{ item.contactNum }}</span>
              </div>
              <div class="text-sm">
                {{ item.address }}
              </div>
            </div>
            <div>
              <vc-icon class="text-sm text-secondary" name="icon-pen-line" @click.stop="updateAddress(item)"></vc-icon>
            </div>
          </div>
          <template #right>
            <van-button class="h-full" square type="danger" @click="remove(item)" text="删除" />
          </template>
        </van-swipe-cell>
      </div>
    </div>

    <div class="p-2 bg-white">
      <van-button shape="circle" round block type="primary" @click="$router.to('AddressUpdate')">添加收货地址</van-button>
    </div>
  </div>
</template>

<script>
import { delReceiving, getReceiving } from '@/api/account'
import theme from '../../theme'

export default {
  name: 'Address',

  data: () => ({
    addressList: [],
    swipeOptions: [
      {
        text: '删除',
        threshold: 60,
        style: { backgroundColor: theme.colors.error },
      },
    ],
  }),

  created() {
    this.getReceiving()
    this.selectMode = this.$route.params.selectMode
  },

  activated() {
    this.getReceiving()
  },

  methods: {
    async getReceiving() {
      const res = await getReceiving()
      this.addressList = res.body.resultList
    },
    select(item) {
      if (!this.selectMode) return
      this.$root.$emit('page:switch-address', item)
      this.$router.back()
    },
    updateAddress(item) {
      this.$router.resolve({
        name: 'AddressUpdate',
        query: {
          id: item.id,
        },
      })
    },
    async remove(item) {
      await this.$promiseLoading(delReceiving({
        receivingId: item.id,
      }))
      this.$toast('删除成功')
      this.getReceiving()
    },
  },
}
</script>

<style scoped>

</style>
