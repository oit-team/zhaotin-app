<template>
  <div class="h-full">
    <van-nav-bar
      title="我的收藏"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- <vc-scroll-view class="p-2 h-full"> -->
    <div class="p-2 h-full">
      <van-swipe-cell v-for="item of list" :key="item.id" class="rounded-x1 space-y-3">
        <div
          class="rounded-x1 overflow-hidden"
        >
          <div class="flex items-center p-2 bg-white" @click="$Router.to('productDetailNvue', {styleId: item.styleId})">
            <div class="mr-2">
              <vc-img fit="contain" :src="item.resUrl" size="60"></vc-img>
            </div>
            <div class="flex overflow-hidden flex-col flex-1 justify-around self-stretch">
              <div class="truncate">{{ item.styleName }}</div>
              <div class="text-xs text-secondary">收藏时间：{{ item.createTime }}</div>
            </div>
            <div>
              <span class="color-red">￥{{ item.tradePrice }}</span>
            </div>
          </div>
        </div>
        <template #right>
          <van-button square @click="remove(item)" class="dltBtn h-full bg-red-400 border-current" type="danger" text="删除" />
        </template>
      </van-swipe-cell>
    </div>
    <!-- <vc-load-more ref="loadMore" :promise="loadData" first-load></vc-load-more> -->
    <!-- </vc-scroll-view> -->
  </div>
</template>

<script>
import { delStyleCollection, getStyleCollection } from '@/api/product'
import theme from '@/theme'

export default {
  name: 'Collection',

  data: () => ({
    list: [],
    swipeOptions: [
      {
        text: '删除',
        threshold: 60,
        style: { backgroundColor: theme.colors.error },
      },
    ],
    pageForm: {
    },
  }),

  created() {
    this.loadData(this.pageForm)
  },
  methods: {
    async loadData(params) {
      const res = await getStyleCollection(params)
      this.list = [...this.list, ...res.body.styleCollection]
      // this.$loadMoreData(this.list, res.body.styleCollection, params)
      return res.body.count
    },
    async remove(item) {
      await this.$promiseLoading(delStyleCollection(item.id))
      this.$toast('删除成功')
      this.list = []
      // this.$refs.loadMore.reset().load()
    },
  },
}
</script>

<style lang='scss' scoped>
.color-red{
  color: #FF0000;
}
.dltBtn{
  border-radius: 0 5px 5px 0 !important;
}
</style>
