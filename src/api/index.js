import axios from 'axios'
import store from '@/store'
import { Toast } from 'vant'
import { ApiError } from '@oit/utils'
import API_SERVICE from './enum/API_SERVICE'
import API_STATUS from './enum/API_STATUS'
// eslint-disable-next-line no-unused-vars
import Vue from 'vue'

const BASE_URL = process.env.NODE_ENV === 'production' ? '/ztApi' : '/api'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
})

// 添加请求拦截器
axiosInstance.interceptors.request.use((config) => {
  config.headers.token = localStorage.getItem('token')
  return config
}, function (error) {
  return Promise.reject(new ApiError({ error }))
})

// 添加响应拦截器
axiosInstance.interceptors.response.use((response) => {
  if (response.data.head?.status !== API_STATUS.OK) {
    return Promise.reject(new ApiError({
      response,
      message: response.data.head.msg,
      status: response.data.head.status,
    }))
  }
  return response
}, async (error) => {
  console.log(error)
  if (error.response.status === 403) {
    // token失效自动刷新
    await store.dispatch('updateUserData')
    // 重新发起请求
    return axiosInstance.request(error.config)
  }

  return Promise.reject(new ApiError({ error }))
})

export function post(url, params = {}, config = {}) {
  const { userData } = store.state

  params = {
    head: {
      aid: userData.id,
      cmd: config.cmd,
      ver: '1.0',
      ln: 'cn',
      mod: 'app',
      de: '2019-10-16',
      sync: 1,
      uuid: userData.brandId,
      chcode: 'ef19843298ae8f2134f',
    },
    con: params,
  }

  return axiosInstance
    .post(url, params, config)
    .then(res => res.data)
}

/**
 * 创建拼接请求服务的请求函数
 */
Object.values(API_SERVICE).forEach(service => {
  post[service] = function (url, params, config) {
    return post(`/${service}${url}`, params, config)
  }
})

// 捕获Promise错误
window.addEventListener('unhandledrejection', event => {
  const { reason } = event
  // 处理接口错误
  if (reason instanceof ApiError) {
    // 输出提示消息
    Toast.fail(reason.message)
    console.error(reason)
    event.preventDefault()
  }
}, false)

Vue.config.errorHandler = (err, vm, info) => {
  if (err instanceof ApiError) {
    return Promise.reject(err)
  } else {
    console.error(err)
  }
}
