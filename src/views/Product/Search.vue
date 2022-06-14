<template>
  <div class="flex flex-col bg-gray">
    <Search
      back
      :autofocus="!onlyVideo"
      v-model="searchText"
      @search="onConfirm()"
      @clear="onConfirm()"
    ></Search>
    <div class="flex-1">
      <ProductList :list="productList"></ProductList>
    </div>
  </div>
</template>

<script>
import ProductList from '@/components/business/Product/ProductList'
import Search from '../../components/business/Product/Search'
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

  created() {
    this.onlyVideo = Boolean(this.$route.params.video)
    this.loadData()
  },

  methods: {
    async loadData(params) {
      params = {
        pageNum: 1,
        pageSize: 9,
      }
      const promise = getStyleList({
        videoCode: Number(this.onlyVideo),
        styleSearch: this.searchText,
        status: 1,
        ...params,
      })
      const res = await promise
      this.productList = [...this.productList, ...res.body.resultList]
      return res.body.totalCount
    },
    onConfirm() {
      this.productList = []
      this.loadData()
      // this.$refs.loadMore.reset().load()
    },
  },
}
</script>

<style scoped>

</style>
