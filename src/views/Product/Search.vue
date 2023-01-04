<template>
  <div class="flex flex-col bg-gray">
    <Search
      v-model="searchText"
      back
      :autofocus="!onlyVideo"
      @search="onConfirm()"
      @clear="onConfirm()"
    ></Search>

    <vc-list ref="list" class="flex-1 overflow-auto" :promise="loadData">
      <ProductList :list="productList" @click="$router.to('ProductDetail', { styleId: $event.styleId })"></ProductList>
    </vc-list>
  </div>
</template>

<script>
import Search from '@/components/business/Product/Search'
import ProductList from '@/components/business/Product/ProductList'
import { getStyleList } from '@/api/product'

export default {
  name: 'ProductSearch',

  components: {
    Search,
    ProductList,
  },

  data: () => ({
    productList: [],
    searchText: '',
    onlyVideo: false,
  }),

  mounted() {
    this.onlyVideo = Boolean(this.$route.params.video)
    this.$refs.list.load()
  },

  methods: {
    async loadData(params) {
      const res = await getStyleList({
        videoCode: Number(this.onlyVideo),
        styleSearch: this.searchText,
        status: 1,
        ...params,
      })
      this.$loadMoreData(this.productList, res.body.resultList, params)
      return res.body.totalCount
    },
    onConfirm() {
      this.productList = []
      this.$refs.list.reset().load()
    },
  },
}
</script>

<style scoped>

</style>
