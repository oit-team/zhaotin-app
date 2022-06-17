<template>
  <vc-container>
    <van-nav-bar
      title="我的收藏"
      left-arrow
      @click-left="$router.back()"
    />

    <vc-list :promise="loadData" first-load>
      <div class="p-2 space-y-3">
        <van-swipe-cell v-for="item of list" :key="item.id" class="rounded-xl">
          <div
            class="rounded-x1 overflow-hidden"
          >
            <div class="flex items-center p-2 bg-white" @click="$router.to('ProductDetail', {styleId: item.styleId})">
              <div class="mr-2">
                <vc-img fit="contain" :src="item.resUrl" size="60"></vc-img>
              </div>
              <div class="flex overflow-hidden flex-col flex-1 justify-around self-stretch">
                <div class="truncate">{{ item.styleName }}</div>
                <div class="text-xs text-secondary">收藏时间：{{ item.createTime }}</div>
              </div>
              <div>
                <vc-text :text="item.tradePrice" mode="price"></vc-text>
              </div>
            </div>
          </div>
          <template #right>
            <van-button
              class="dltBtn h-full bg-red-400 border-current"
              square
              type="danger"
              text="删除"
              @click="remove(item)"
            />
          </template>
        </van-swipe-cell>
      </div>
    </vc-list>
  </vc-container>
</template>

<script>
import { delStyleCollection, getStyleCollection } from '@/api/product'
import theme from '@/theme'
import VcContainer from '../../components/basic/Container/Container'

export default {
  name: 'Collection',
  components: { VcContainer },
  data: () => ({
    list: [],
    swipeOptions: [
      {
        text: '删除',
        threshold: 60,
        style: { backgroundColor: theme.colors.error },
      },
    ],
  }),

  methods: {
    async loadData(params) {
      const res = await getStyleCollection(params)
      this.$loadMoreData(this.list, res.body.styleCollection, params)
      return res.body.count
    },
    async remove(item) {
      await this.$promiseLoading(delStyleCollection(item.styleId))
      this.list.splice(this.list.indexOf(item), 1)
      this.$toast('删除成功')
    },
  },
}
</script>

<style lang="less" scoped>
</style>
