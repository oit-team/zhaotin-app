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
