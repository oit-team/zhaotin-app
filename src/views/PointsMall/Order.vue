<template>
  <vc-container>
    <vc-nav-bar title="积分订单" />

    <vc-list :promise="loadData" first-load>
      <div v-for="item of list" :key="item.id">{{ item }}</div>
    </vc-list>
  </vc-container>
</template>

<script>
import { getPointMailOrderList } from '@/api/order'

export default {
  name: 'PointsMallOrder',

  data: () => ({
    list: [],
  }),

  methods: {
    async loadData(params) {
      const res = await getPointMailOrderList({
        userId: this.$store.state.userData.id,
        ...params,
      })
      this.$loadMoreData(this.list, res.body.resultList, params)
      return res.body.count
    },
  },
}
</script>

<style scoped>

</style>
