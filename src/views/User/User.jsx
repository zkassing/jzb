import { useEffect } from "react";
import { GET_USERINFO } from "../../api/user";
import { useState } from "react";
import "./User.css"
import { useNavigate } from "react-router-dom";
import s from './User.module.css'

function UserInfo ({data}) {

  return (
    <div className="user-info">
      <div className="userinfo-body">
        <div className="username">{data.username}</div>
        <div className="usersign">{data.signature}</div>
      </div>
      <div className="userinfo-avatar">
        <img width={'100%'} src={data.avatar} alt="" />
      </div>
    </div>
  )
}

function User() {
  const [userInfo, setUserInfo] = useState({})
  const navigate = useNavigate()

  const logout = () => {
    // 退出操作
    navigate('/select')
    localStorage.removeItem('token')
    localStorage.removeItem('userinfo')

  }

  useEffect(() => {
    /*  
      为什么要先从storage中获取，因为优化性能。没有必要每次都重新请求
    */
    // 获取userInfo 从localStorage中    
    const info = localStorage.getItem('userinfo')

    if (info) {
      setUserInfo(JSON.parse(info))
    } else {
      GET_USERINFO().then(res => {
        console.log(res)
        localStorage.setItem('userinfo', JSON.stringify(res.data))
        setUserInfo(res.data)
      })
    }
  }, [])

  return (
    <div className="box">
      <UserInfo data={userInfo}></UserInfo>

      <button className="button" onClick={logout}>退出登录</button>
    </div>
  );
}

export default User;