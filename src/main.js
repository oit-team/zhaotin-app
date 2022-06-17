import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/components'
import '@/directives'
import '@/utils'
import '@/assets/icons'

import '@/styles/index.scss'
import 'windi.css'
import theme from './theme'

Vue.config.productionTip = false
Vue.prototype.$theme = theme

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
