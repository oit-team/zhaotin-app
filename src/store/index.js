import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import shoppingCart from './shoppingCart'
import { getCheckUserInfo } from '../api/account'
import { Toast } from 'vant'

Vue.use(Vuex)

let updateUserDataPromise = null

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
    // 更新用户数据，单例模式
    updateUserData(ctx) {
      if (!updateUserDataPromise) updateUserDataPromise = getCheckUserInfo()
      return updateUserDataPromise
        .then(res => {
          const token = res.body.accessToken
          localStorage.setItem('token', token)
          ctx.commit('setUserData', res.body.resultList)
          return res
        })
        .catch(err => {
          Toast('登录过期，请重新登录')
          ctx.dispatch('logout')
          return Promise.reject(err)
        })
        .finally(() => {
          updateUserDataPromise = null
        })
    },
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
