<template>
  <div class="flex flex-col h-screen">
    <div class="sticky-top z-50 bg-white">
      <Search is-link class="pl-4">
        <template #after>
          <ShopCartIcon class="mx-3" />
        </template>
      </Search>

      <div class="pl-3">
        <div class="border-b border-line pr-5">
          <vc-tabs v-model="category" class="flex-1 overflow-hidden category-tabs">
            <van-tab
              v-for="item of categoryList"
              :key="item.dictitemDisplayName"
              :title="item.dictitemDisplayName"
              :name="item.dictitemDisplayName"
            ></van-tab>
          </vc-tabs>
        </div>

        <div class="flex items-center">
          <vc-item-group
            v-if="categoryList[categoryIndex]"
            v-model="categoryChild"
            class="flex flex-1 overflow-x-auto space-x-2 py-2 pr-4 pl-1"
            active-class="!bg-black text-primary"
            mandatory
            into-view
          >
            <vc-item
              class="rounded-full flex whitespace-nowrap py-1 px-3 bg-[#ECE8E5]"
              value=""
              @click="changeCategoryChild"
            >
              <span class="text-xs">全部</span>
            </vc-item>
            <vc-item
              v-for="item of categoryList[categoryIndex].childerType"
              :key="item.dictitemDisplayName"
              class="rounded-full flex whitespace-nowrap py-1 px-3 bg-[#ECE8E5]"
              :value="item.dictitemDisplayName"
              @click="changeCategoryChild"
            >
              <span class="text-xs">{{ item.dictitemDisplayName }}</span>
            </vc-item>
          </vc-item-group>

          <div class="pl-3 pr-6">
            <van-badge :content="filterCount || ''" @click.native="() => $refs.filterPanel.toggle()">
              <vc-icon class="align-baseline text-lg" name="filter"></vc-icon>
            </van-badge>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-1 relative bg-gray overflow-hidden">
      <FilterPanel ref="filterPanel" @confirm="onFilter" />
      <vc-list ref="list" class="h-full overflow-auto" :promise="loadData">
        <ProductList
          :list="productList"
          @click="$router.to('ProductDetail', { styleId: $event.styleId })"
        ></ProductList>
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
import { getStyleList, getStyleTypeInfoAll } from '@/api/product'

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
    categoryChild: '',
    categoryChildList: [],
    filterCount: 0,
  }),

  computed: {
    categoryIndex() {
      return this.categoryList.findIndex(item => item.dictitemDisplayName === this.category)
    },
  },

  watch: {
    categoryIndex() {
      this.categoryChild = ''
      this.$refs.list.reset().load()
    },
  },

  async mounted() {
    await this.getStyleTypeInfoAll()
    this.$refs.list.load()
  },

  activated() {
    const { params } = this.$route
    if (params) {
      this.$refs.filterPanel.setFilter(params)

      if (params.category)
        this.category = params.category
    }
  },

  deactivated() {
    this.$refs.filterPanel?.close()
  },

  methods: {
    async loadData(params) {
      const res = await getStyleList({
        styleCategory: this.categoryList[this.categoryIndex].dictitemDisplayName,
        styleChildCategory: this.categoryChild,
        status: 1,
        ...this.filterForm,
        ...params,
      })
      this.$loadMoreData(this.productList, res.body.resultList, params)
      return res.body.totalCount
    },
    async getStyleTypeInfoAll() {
      const res = await getStyleTypeInfoAll()
      this.categoryList = res.body.resultList
    },
    onFilter({ params, count }) {
      this.filterForm = params
      this.filterCount = count
      this.$refs.list.reset().load()
    },
    changeCategoryChild() {
      this.$nextTick(() => this.$refs.list.reset().load())
    },
  },
}
</script>

<style lang="scss">
.van-tab:first-child {
  //padding: 12px;
}

.category-tabs .van-tab {
  flex: initial;
  padding-left: 8px;
  padding-right: 8px;
  white-space: nowrap;
}
</style>
