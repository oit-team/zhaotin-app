import { ApiError } from '@oit/utils'
import axios from 'axios'
import API_SERVICE from './enum/API_SERVICE'

const axiosInstance = axios.create({})

// 添加请求拦截器
axiosInstance.interceptors.request.use((config) => {
  return config
}, function (error) {
  return Promise.reject(new ApiError({ error }))
})

// 添加响应拦截器
axiosInstance.interceptors.response.use((response) => {
  return response
}, function (error) {
  return Promise.reject(new ApiError({ error }))
})

export function post(url, params, config) {
  const userData = {}

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

  return axiosInstance.post(url, params, config)
}

/**
 * 创建拼接请求服务的请求函数
 */
Object.values(API_SERVICE).forEach(service => {
  post[service] = function (url, params, config) {
    return post(`/${service}${url}`, params, config)
  }
})
