import axios from '../utils/request'

export const ADD_BILL = (data) => axios.post('/bill/add', data)

export const GET_BILL = (params) => axios.get('/bill/list', {
  params
})

// 获取账单详情
export const GET_BILLDETAIL = (id) => axios.get('/bill/detail', {
  params: {
    id
  }
})

// 删除接口
export const DELETE_BILL = (id) => axios.post('/bill/delete', {
  id
})

// 编辑账单
export const UPDATE_BILL = (data) => axios.post('/bill/update', data)

// 查看账单数据
export const GET_BILLDATA = (date) => axios.get('/bill/data', {
  params: {
    date
  }
}) 

export const GET_TYPELIST = () => axios.get('/type/list')