import { Toast } from 'vant'

let promiseLoadingTimer = null
/**
 * 根据promise状态显示loading效果
 * @param promises
 * @param config
 */
export function promiseLoading(promises, config) {
  const toast = Toast.loading(config)
  clearTimeout(promiseLoadingTimer)
  // 超时强制取消loading
  promiseLoadingTimer = setTimeout(toast.close, 60000)
  // 数组时执行all方法
  if (Array.isArray(promises)) return Promise.all(promises).finally(toast.close)
  return promises.finally(toast.close)
}
