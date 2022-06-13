import { post } from './index'
import API_SERVICE from './enum/API_SERVICE'

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
 * 更新购物车
 * @param params
 */
export function updateShoppingCart(params) {
  return post[API_SERVICE.ORDER]('/shoppingCart/updateShoppingCart', params)
}

/**
 * 移除购物车内商品
 * @param params
 */
export function deleteShoppingCartStyle(params) {
  return post[API_SERVICE.ORDER]('/shoppingCart/deleteShoppingCartStyle', params)
}
