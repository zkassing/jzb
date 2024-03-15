// 进行登录注册的封装
import axios from '../utils/request'


export const LOGIN = (data) => axios.post('/user/login', data)

// 封装一个获取用户信息的操作
export const GET_USERINFO = () => axios.get('/user/get_userinfo')