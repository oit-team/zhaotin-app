<template>
  <div class="flex flex-col h-screen">
    <div class="sticky-top z-50 bg-white">
      <Search is-link class="pl-4">
        <template #after>
          <ShopCartIcon class="ml-3 mr-2" />
        </template>
      </Search>

      <div>
        <div class="bg-white border-b border-line pl-3 pr-5 relative z-99999">
          <vc-tabs v-model="category" class="flex-1 overflow-hidden category-tabs">
            <van-tab
              v-for="item of categoryList"
              :key="item.dictitemDisplayName"
              :name="item.dictitemDisplayName"
            >
              <template #title>
                <span>{{ item.dictitemDisplayName }}</span>
                <van-icon
                  v-if="item.childerType?.length"
                  class="bg-gray rounded-circle ml-1 p-[2px] text-xs leading-none"
                  :class="{ 'transform rotate-180': category === item.dictitemDisplayName && showSubcategory }"
                  name="arrow-down"
                  @click="showSubcategory = !showSubcategory"
                />
              </template>
            </van-tab>
          </vc-tabs>
        </div>

        <van-overlay :show="showSubcategory" position="top" @click="showSubcategory = false">
          <div class="bg-white pt-[83px]" @click.stop>
            <vc-item-group
              v-if="categoryList[categoryIndex]"
              v-model="categoryChild"
              class="flex flex-wrap gap-2 py-2 pr-4 pl-5"
              active-class="!bg-black text-primary"
              mandatory
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
          </div>
        </van-overlay>

        <div class="flex items-center px-3 py-2">
          <vc-item-group
            v-model="sortType"
            class="flex-1 flex text-sm pl-2 gap-4"
            active-class="text-primary"
            mandatory
          >
            <vc-item @click="changeSortType()">
              默认排序
            </vc-item>
            <vc-item value="shelfTimeSort" @click="changeSortType('shelfTimeSort')">
              <template #default="{ active }">
                上架时间
                <van-icon
                  name="play"
                  class="transform"
                  :class="!active || (active && sortSwitch === 1) ? '-rotate-90' : 'rotate-90'"
                />
              </template>
            </vc-item>
            <vc-item value="tradePriceSort" @click="changeSortType('tradePriceSort')">
              <template #default="{ active }">
                价格
                <van-icon
                  name="play"
                  class="transform"
                  :class="!active || (active && sortSwitch === 1) ? '-rotate-90' : 'rotate-90'"
                />
              </template>
            </vc-item>
          </vc-item-group>

          <div class="pl-3 pr-2">
            <van-badge class="flex" :content="filterCount || ''" @click.native="() => $refs.filterPanel.toggle()">
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
    showSubcategory: false,
    filterForm: {},
    productList: [],
    category: '',
    categoryList: [],
    categoryChild: '',
    categoryChildList: [],
    filterCount: 0,
    sortType: null,
    sortSwitch: 1,
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
      const _params = {
        styleCategory: this.categoryList[this.categoryIndex].dictitemDisplayName,
        styleChildCategory: this.categoryChild,
        status: 1,
        ...this.filterForm,
        ...params,
      }

      const sortKeys = ['shelfTimeSort', 'tradePriceSort']
      if (sortKeys.includes(this.sortType))
        _params[this.sortType] = String(this.sortSwitch)

      const res = await getStyleList(_params)
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
    changeSortType(type) {
      // 交换排序
      this.sortSwitch = this.sortSwitch === 1 && this.sortType === type ? 0 : 1
      setTimeout(() => this.$refs.list.reset().load())
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
  padding-left: 0;
  padding-right: 0;
  margin-right: 24px;
  white-space: nowrap;
}
</style>
