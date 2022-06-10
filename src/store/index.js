import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import shoppingCart from './shoppingCart'
// import { getCheckUserInfo } from '../api/account'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userData: {},
  },
  getters: {},
  mutations: {
    setUserData(state, data) {
      state.userData = data
      localStorage.setItem('userData', data)
    },
  },
  actions: {
    logout(ctx, toLogin = true) {
      ctx.commit('setUserData', {})
      localStorage.removeItem('token')
      toLogin && router.to('Login')
    },
  },
  modules: {
    shoppingCart,
  },
})
