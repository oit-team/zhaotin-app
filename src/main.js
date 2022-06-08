import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/components'
import '@/utils'
import '@/assets/icons'

import '@/styles/index.scss'
import 'windi.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
