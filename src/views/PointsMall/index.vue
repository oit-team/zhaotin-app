<template>
  <div class="flex flex-col h-screen">
    <div class="sticky-top z-50 bg-white">
      <Search back placeholder="搜索商品" @search="searchText = $event"></Search>

      <div class="flex items-center px-3">
        <vc-item-group
          v-model="category"
          class="flex flex-1 overflow-x-auto space-x-2 py-2"
          active-class="!bg-black text-primary"
          mandatory
        >
          <vc-item class="rounded-full flex whitespace-nowrap py-1 px-3 bg-[#ECE8E5]" value="">
            <span class="text-xs">全部</span>
          </vc-item>
          <vc-item
            v-for="item of categoryList"
            :key="item.categoryName"
            class="rounded-full flex whitespace-nowrap py-1 px-3 bg-[#ECE8E5]"
            :value="item.orderKey"
          >
            <span class="text-xs">{{ item.categoryName }}</span>
            <span class="text-xs transform scale-65 self-end">({{ item.total }})</span>
          </vc-item>
        </vc-item-group>
      </div>
    </div>

    <div class="flex-1 relative bg-gray overflow-hidden">
      <vc-list ref="list" class="h-full overflow-auto" :promise="loadData" first-load>
        <product-list
          :list="productList"
          :key-map="{
            img: 'image',
            title: 'goodsName',
            price: 'goodsPrice',
          }"
          @click="toDetail"
        ></product-list>
      </vc-list>
    </div>
  </div>
</template>

<script>
import Search from '@/components/business/Product/Search'
import ProductList from '@/components/business/Product/ProductList'
import { getGoodsList, getTypeAndData } from '../../api/pointsMall'

export default {
  name: 'PointsMall',

  components: {
    Search,
    ProductList,
  },

  data: () => ({
    productList: [],
    searchText: '',
    category: '',
    categoryList: [],
  }),

  watch: {
    category: 'reload',
    searchText: 'reload',
  },

  mounted() {
    this.getStyleCategory()
  },

  methods: {
    async loadData(params) {
      const res = await getGoodsList({
        goodsType: this.category,
        state: 1,
        goodsName: this.searchText,
        ...params,
      })
      this.$loadMoreData(this.productList, res.body.goodsList, params)
      return res.body.totalCount
    },
    reload() {
      this.$refs.list.reset().load()
    },
    async getStyleCategory() {
      const res = await getTypeAndData()
      this.categoryList = res.body.goodsCategory
    },
    toDetail(item) {
      const to = item.goodsSort === 1 ? 'PointsMallDetail' : 'PointsMallProductDetail'
      this.$router.to(to, { styleId: item.goodsId })
    },
  },
}
</script>

<style scoped>

</style>
