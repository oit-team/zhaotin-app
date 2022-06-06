import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Account/Login'),
  },
]

const router = new VueRouter({
  routes,
})

export default router
