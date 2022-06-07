import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
})

router.to = function (to, params) {
  const options = {}
  if (typeof to === 'string') {
    if (/[./]/.test(to)) {
      options.path = to
      options.query = params
    } else {
      options.name = to
      options.params = params
    }
  } else {
    Object.assign(options, to)
  }
  return router.push(options)
}

export default router
