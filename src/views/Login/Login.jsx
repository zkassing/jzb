import { Link } from 'react-router-dom';
import './Login.css'
import { useState } from 'react';
import { LOGIN } from '../../api/user';
import { useNavigate } from 'react-router-dom';
function Login() {
  const navigate = useNavigate()

  const [data, setData] = useState({
    username: '',
    password: ''
  })

  const login = () => {
    console.log(data)
    LOGIN(data).then(res => {
      localStorage.setItem('token', res.data.token)
      // 跳转到首页
      navigate('/', {replace: true})
    })
  }

  return (
    <div className="login">
      <div className="form">
        <div className="form-item">
          <input type="text" placeholder='请输入用户名' value={data.username} onChange={(e) => setData({
            ...data,
            username: e.target.value
          })}/>
        </div>
        <div className="form-item">
          <input type="password" placeholder='请输入密码' value={data.password} onChange={(e) => setData({
            ...data,
            password: e.target.value
          })}/>
        </div>
        <div className="form-item">
          <button className='button' onClick={login}>登录</button>
          <p className="desc">暂无账号？请<Link to={'/register'}>注册</Link></p>
        </div>
      </div>
      
    </div>
  );
}

export default Login;