import axios from 'axios'
import { Toast } from 'zarm'
import { history } from '../main'
const instance = axios.create({
  baseURL: "http://cost.kassing.cn/api"
})

let loading = null
const codes = [400, 500, 402, 501]
instance.interceptors.request.use((config) => {
  loading = Toast.show({
    icon: 'loading',
    duration: 3000
  })

  // 获取token
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.authorization = token
  }

  return config
}, err => {

})

instance.interceptors.response.use((response) => {
  // 如果返回的respnse.data.code是500 说明接口调用出错了，我们要把请求转到.catch中
  const data = response.data

  if (codes.includes(data.code)) {
    // 显示一个Toast，展示错误信息
    Toast.show(data.msg)
    return Promise.reject(data.msg)
  } 
  

  if (data.code === 401) {
    // token过期，需要重新登录
    // location.href = "/select"
    history.replace('/select')
    // 删除对应的token和用户信息
    localStorage.removeItem('token')
    localStorage.removeItem('userinfo')
    return Promise.reject(data.msg)
  }

  loading.close()
  return data
}, (err) => {
  return Promise.reject(err)
})

export default instance