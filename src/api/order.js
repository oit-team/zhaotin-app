import API_SERVICE from './enum/API_SERVICE'
import { post } from './index'

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
 * @param orderNo
 */
export function getOrderById(orderNo) {
  return post[API_SERVICE.ORDER]('/orderInfo/getOrderById', { orderNo })
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

/**
 * 查询订单所需的总积分
 * @param params
 */
export function getOrderIntegral(params) {
  return post[API_SERVICE.ORDER]('/integralShop/getOrderIntegral', params)
}

/**
 * 创建积分商城订单
 * @param params
 */
export function addIntegralOrder(params) {
  return post[API_SERVICE.ORDER]('/integralShop/addIntegralOrder', params)
}

/**
 * 积分商城订单记录
 * @param params
 */
export function getPointMailOrderList(params) {
  return post[API_SERVICE.ORDER]('/integralShop/getOrderList', params)
}

/**
 * 获取积分商城订单详情
 * @param orderNo
 */
export function getOrderIntegralDetail(orderNo) {
  return post[API_SERVICE.ORDER]('/integralShop/getOrderDetail', { orderNo })
}

/**
 * 查询订单兑换记录
 * @param orderNo
 */
export function getPointMailOrderExchange(orderNo) {
  return post[API_SERVICE.ORDER]('/integralShop/getOrderExchange', { orderNo })
}

/**
 * 订单状态
 */
export function getCountOrderState() {
  return post[API_SERVICE.ORDER]('/integralShop/getCountOrderState')
}
