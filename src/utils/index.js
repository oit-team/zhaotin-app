import Vue from 'vue'
import { loadMoreData, promiseLoading } from './helper'

Vue.prototype.$promiseLoading = promiseLoading
Vue.prototype.$loadMoreData = loadMoreData

export * from './helper'
