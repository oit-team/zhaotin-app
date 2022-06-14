import { post } from '.'
import API_SERVICE from './enum/API_SERVICE'

/**
 * 登录
 * @param params
 * @param params.userName 用户名
 * @param params.password 密码
 */
export function login(params) {
  return post[API_SERVICE.SYSTEM]('/user/login', params)
}

export function getCheckUserInfo() {
  return post[API_SERVICE.SYSTEM]('/user/getCheckUserInfo', {
    token: localStorage.getItem('token'),
  })
}

/**
 * 修改密码
 * @param params
 */
export function updatePassWord(params) {
  return post[API_SERVICE.SYSTEM]('/user/updatePassWord', params)
}

/**
 * 查询收货地址
 * @param params
 */
export function getReceiving(params) {
  return post[API_SERVICE.ORDER]('/customerReceiving/getReceiving', params)
}

/**
 * 新增收货地址
 * @param params
 */
export function addReceiving(params) {
  return post[API_SERVICE.ORDER]('/customerReceiving/addReceiving', params)
}

/**
 * 查询收货详情
 * @param id
 */
export function getReceivingById(id) {
  return post[API_SERVICE.ORDER]('/customerReceiving/getReceivingById', { receivingId: id })
}

/**
 * 更新收货地址
 * @param params
 */
export function updateReceiving(params) {
  return post[API_SERVICE.ORDER]('/customerReceiving/updateReceiving', params)
}

/**
 * 删除收货地址
 * @param params
 */
export function delReceiving(params) {
  return post[API_SERVICE.ORDER]('/customerReceiving/delReceiving', params)
}

/**
 * 获取登录背景图
 */
export function getLoginBackground() {
  return post[API_SERVICE.SYSTEM]('/user/getLoginBackground')
}
