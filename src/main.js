import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import eruda from 'eruda'

import '@/components'
import '@/utils'
import '@/assets/icons'

import '@/styles/index.scss'
import 'windi.css'
import theme from './theme'

// process.env.NODE_ENV !== 'production' && eruda.init()

Vue.config.productionTip = false
Vue.prototype.$theme = theme

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
