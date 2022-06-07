import Vue from 'vue'
import { Toast } from 'vant'

import 'vant/lib/index.less'

Toast.loading = (fn => {
  return function (options = '加载中...') {
    options = typeof options === 'string'
      ? {
          message: options,
          duration: 0,
        }
      : options
    return fn.call(this, options)
  }
})(Toast.loading)

Vue.use(Toast)

export * from './components'
