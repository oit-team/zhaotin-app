import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import storage from './store/local'

import '@/components'

import 'windi.css'

Vue.config.productionTip = false

new Vue({
  localStorage: storage,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
