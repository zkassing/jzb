import { Navigate } from 'react-router-dom'

function PrivateRoute({element}) {
  // 判断是否登录
  const token = localStorage.getItem('token')

  if (!token) return <Navigate to={'/select'}></Navigate>

  return element
}

export default PrivateRoute;