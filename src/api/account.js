import { post } from './index'
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
