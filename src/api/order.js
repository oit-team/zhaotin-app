import { post } from './index'
import API_SERVICE from './enum/API_SERVICE'

/**
 * 新增订单
 * @param params
 */
export function addOrder(params) {
  return post[API_SERVICE.ORDER]('/orderInfo/addOrder', params)
}

/**
 * 查询订单
 * @param params
 */
export function getOrder(params) {
  return post[API_SERVICE.ORDER]('/orderInfo/getOrder', params)
}

/**
 * 获取订单详情
 * @param orderId
 */
export function getOrderById(orderId) {
  return post[API_SERVICE.ORDER]('/orderInfo/getOrderById', { orderId })
}

/**
 * 更新进货车
 * @param params
 */
export function updateShoppingCart(params) {
  return post[API_SERVICE.ORDER]('/shoppingCart/updateShoppingCart', params)
}

/**
 * 移除进货车内商品
 * @param params
 */
export function deleteShoppingCartStyle(params) {
  return post[API_SERVICE.ORDER]('/shoppingCart/deleteShoppingCartStyle', params)
}
