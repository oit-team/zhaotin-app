import { post } from './index'
import API_SERVICE from './enum/API_SERVICE'

/**
 * 获取积分商城列表
 * @param params
 */
export function getGoodsList(params) {
  return post[API_SERVICE.GOODS]('/integralShop/getGoodsList', params)
}

/**
 * 获取积分商城类别信息
 */
export function getTypeAndData() {
  return post[API_SERVICE.GOODS]('/integralShop/getTypeAndData')
}

export function getGoodsDetails(goodsId) {
  return post[API_SERVICE.GOODS]('/integralShop/getGoodsDetails', { goodsId })
}
