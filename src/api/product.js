import API_SERVICE from './enum/API_SERVICE'
import { post } from './index'
import store from '@/store'

export function getStyleList(params) {
  return post[API_SERVICE.GOODS]('/style/getStyleList', params)
}

export function getStyleById(styleId) {
  return post[API_SERVICE.GOODS]('/style/getStyleById', { styleId })
}

export function dictitemInfoAllMethod(params, config = {}) {
  return post[API_SERVICE.GOODS]('/dictitemInfo/dictitemInfoAllMethod', {
    brandId: store.state.userData.brandId,
    userId: store.state.userData.id,
    ...params,
  }, config)
}

/**
 * 获取进货车列表
 * @param params
 */
export function getShoppingCart(params) {
  return post[API_SERVICE.ORDER]('/shoppingCart/getShoppingCart', params)
}

/**
 * 添加进货车
 * @param params
 */
export function insertShoppingCart(params) {
  return post[API_SERVICE.ORDER]('/shoppingCart/insertShoppingCart', params)
}

/**
 * 计算商品总价、总数和单价
 * @param params
 */
export function getStylePrice(params) {
  return post[API_SERVICE.ORDER]('/orderInfo/getStylePrice', params)
}

/**
 * 查询字典项
 * @param params
 */
export function selectDictInfo(params) {
  return post[API_SERVICE.GOODS]('/dictitemInfo/selectDictInfo', params, {
    cmd: 100009,
  })
}

/**
 * 查询轮播图和公告
 * @param params
 */
export function getSystemConfig(params = {}) {
  return post[API_SERVICE.GOODS]('/dictitemInfo/getSystemConfig', params)
}

/**
 * 查询款式类别名称，图片，以及数量
 * @param params
 */
export function getStyleCategory(params) {
  return post[API_SERVICE.GOODS]('/dictitemInfo/getStyleCategory', params)
}

/**
 * 添加到收藏
 * @param params
 */
export function addStyleCollection(params) {
  return post[API_SERVICE.GOODS]('/styleCollection/addStyleCollection', params)
}

/**
 * 查询收藏
 * @param params
 */
export function getStyleCollection(params) {
  return post[API_SERVICE.GOODS]('/styleCollection/getStyleCollection', params)
}

/**
 * 取消收藏
 * @param styleId
 */
export function delStyleCollection(styleId) {
  return post[API_SERVICE.GOODS]('/styleCollection/delStyleCollection', { styleId })
}

/**
 * 查询类别
 */
export function getStyleTypeInfoAll() {
  return post[API_SERVICE.GOODS]('/styleType/getStyleTypeInfoAll')
}

/**
 * 查询层级类别
 * @param params
 */
export function getStyleTypeList(params) {
  return post[API_SERVICE.GOODS]('/styleType/getStyleTypeList', params)
}
