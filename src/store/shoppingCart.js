import { getShoppingCart, getStylePrice } from '@/api/product'

export default {
  namespaced: true,

  state: {
    data: {},
    list: [],
    orderList: [],
  },

  getters: {
    // maps(state) {
    //   return keyBy(state.list, 'styleId')
    // },
    total(state) {
      return state.list.reduce((prev, { style }) => {
        prev += style.length
        return prev
      }, 0)
    },
  },

  mutations: {
    setData(state, data) {
      state.data = data
    },
    setList(state, list) {
      state.list = list
    },
    setOrderList(state, list) {
      state.orderList = list
    },
  },

  actions: {
    async getShoppingCart(ctx) {
      const res = await getShoppingCart()
      ctx.commit('setData', res.body.resultList)
      ctx.commit('setList', res.body.resultList?.styleList)
      return res
    },
    async getStylePrice(ctx, list = false) {
      const styleList = []
      const selectList = list ? ctx.state.list : ctx.state.orderList
      selectList.forEach(({
        style,
        styleNo,
      }) => {
        style.forEach((item) => {
          styleList.push({
            styleNo,
            styleId: item.styleId,
            styleSize: item.styleSize,
          })
        })
      })
      return getStylePrice({
        styleList,
      })
    },
  },
}
