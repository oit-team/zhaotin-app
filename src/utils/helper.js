import { Dialog, Toast } from 'vant'
import { isPlainObject } from 'lodash/lang'

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

/**
 * 转换单位
 * @param str
 * @param unit 单位默认px
 * @returns {string|undefined}
 */
export function convertToUnit(str, unit = 'px') {
  let size

  if (str === null || str === undefined || str === '') {
    return undefined
  } else if (isNaN(+str)) {
    size = String(str)
  } else {
    size = `${Number(str)}${unit}`
  }

  if (/([0-9]+(\.?[0-9]+)?)px$/.test(size)) {
    const num = parseFloat(size)
    return `${num / 375 * 100}vw`
  } else {
    return size
  }
}

export function setComponentProps(components, props) {
  Object.entries(props)
    .forEach(([key, value]) => {
      if (isPlainObject(components.props[key])) {
        components.props[key].default = value
      } else {
        components.props[key] = {
          type: components.props[key],
          default: value,
        }
      }
    })
}

export function loadMoreData(list, newList, pageParams) {
  if (pageParams.pageNum === 1) list.length = 0
  list.push(...newList)
}

export async function callCustomerService() {
  await Dialog.confirm({
    title: '提示',
    message: '连线客服为您一对一服务',
  })

  window.open('tel:13345731912')
}
