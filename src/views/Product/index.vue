<template>
  <div class="flex flex-col h-screen">
    <div class="sticky-top z-50 bg-white">
      <Search is-link></Search>

      <div class="flex">
        <vc-item-group
          v-model="category"
          class="flex flex-1 overflow-x-auto space-x-2 p-2"
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
            :value="item.categoryName"
          >
            <span class="text-xs">{{ item.categoryName }}</span>
            <span class="text-xs transform scale-65 self-end">({{ item.countNum }})</span>
          </vc-item>
        </vc-item-group>
      </div>
    </div>

    <div class="flex-1 relative bg-gray">
      <product-list :list="productList"></product-list>
    </div>

    <Tabbar />
  </div>
</template>

<script>
import Search from '@/components/business/Product/Search'
import ProductList from '@/components/business/Product/ProductList'
import Tabbar from '@/components/business/Tabbar'
import { getStyleCategory, getStyleList } from '@/api/product'

export default {
  name: 'Product',

  components: {
    Search,
    ProductList,
    Tabbar,
  },

  data: () => ({
    filterForm: {},
    productList: [],
    category: '',
    categoryList: [],
    filterCount: 0,
  }),

  watch: {
    category() {
      this.loadData()
    },
  },

  mounted() {
    this.loadData()
    this.getStyleCategory()
  },

  activated() {
    const { params } = this.$route
    if (params.category) {
      this.category = params.category
    }
  },

  methods: {
    async loadData(params) {
      params = {
        pageNum: 1,
        pageSize: 9,
      }
      const promise = getStyleList({
        styleCategory: this.category,
        status: 1,
        ...this.filterForm,
        ...params,
      })
      const res = await promise
      this.$loadMoreData(this.productList, res.body.resultList, params)
      return res.body.totalCount
    },
    async getStyleCategory() {
      const res = await getStyleCategory()
      this.categoryList = res.body.styleCategory
    },
  },
}
</script>

<style scoped>

</style>
