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

/**
 * 获取登录背景图
 */
export function getLoginBackground() {
  return post[API_SERVICE.SYSTEM]('/user/getLoginBackground')
}
