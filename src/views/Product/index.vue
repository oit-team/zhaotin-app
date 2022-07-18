<template>
  <div class="flex flex-col h-screen">
    <div class="sticky-top z-50 bg-white">
      <Search is-link>
        <template #after>
          <ShopCartIcon class="mx-3" />
        </template>
      </Search>

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
            :value="item.categoryName"
          >
            <span class="text-xs">{{ item.categoryName }}</span>
            <span class="text-xs transform scale-65 self-end">({{ item.countNum }})</span>
          </vc-item>
        </vc-item-group>

        <div class="px-3">
          <van-badge :content="filterCount || ''" @click.native="() => $refs.filterPanel.toggle()">
            <vc-icon class="align-baseline text-lg" name="filter"></vc-icon>
          </van-badge>
        </div>
      </div>
    </div>

    <div class="flex-1 relative bg-gray overflow-hidden">
      <FilterPanel ref="filterPanel" @confirm="onFilter" />
      <vc-list ref="list" class="h-full overflow-auto" :promise="loadData" first-load>
        <product-list
          :list="productList"
          @click="$router.to('ProductDetail', { styleId: $event.styleId })"
        ></product-list>
      </vc-list>
    </div>

    <Tabbar />
  </div>
</template>

<script>
import Search from '@/components/business/Product/Search'
import ProductList from '@/components/business/Product/ProductList'
import FilterPanel from '@/components/business/Product/FilterPanel'
import Tabbar from '@/components/business/Tabbar'
import ShopCartIcon from '@/components/business/ShoppingCart/ShopCartIcon'
import { getStyleCategory, getStyleList } from '@/api/product'

export default {
  name: 'Product',

  components: {
    Search,
    ProductList,
    FilterPanel,
    Tabbar,
    ShopCartIcon,
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
      this.$refs.list.reset().load()
    },
  },

  mounted() {
    this.getStyleCategory()
  },

  activated() {
    const { params } = this.$route
    if (params) {
      this.$refs.filterPanel.setFilter(params)

      if (params.category) {
        this.category = params.category
      }
    }
  },

  deactivated() {
    this.$refs.filterPanel?.close()
  },

  methods: {
    async loadData(params) {
      const res = await getStyleList({
        styleCategory: this.category,
        status: 1,
        ...this.filterForm,
        ...params,
      })
      this.$loadMoreData(this.productList, res.body.resultList, params)
      return res.body.totalCount
    },
    async getStyleCategory() {
      const res = await getStyleCategory()
      this.categoryList = res.body.styleCategory
    },
    onFilter({ params, count }) {
      this.filterForm = params
      this.filterCount = count
      this.$refs.list.reset().load()
    },
  },
}
</script>

<style scoped>

</style>
