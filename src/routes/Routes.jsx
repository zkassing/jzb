import { useRoutes, Navigate } from 'react-router-dom'
import Login from '../views/Login/Login'
import App from '../views/App/App'
import { lazy } from 'react'
import PrivateRoute from './PrivateRoute'
import Register from '../views/Login/Register'
import Select from '../views/Login/Select'
import Detail from '../views/Bill/Detail'
const Bill = lazy(() => import('../views/Bill/Bill'))
const User = lazy(() => import('../views/User/User'))
const Data = lazy(() => import('../views/Data/Data'))
/* import Bill from '../views/Bill/Bill'
import Data from '../views/Data/Data'
import User from '../views/User/User' */



// 这个是一个组件
function Routes () {
  const routes = useRoutes([
    {
      path: '/login',
      element: <Login></Login>
    },

    {
      path: '/register',
      element: <Register></Register>
    },

    {
      path: '/select',
      element: <Select></Select>
    },

    {
      path: '/detail/:id',
      element: <PrivateRoute element={<Detail></Detail>}></PrivateRoute>
    },
    {
      path: '/',
      element: <App></App>,
      children: [
        {
          path: '',
          element: <Navigate to={'bill'}></Navigate>
        },
        {
          path: 'bill',
          element: <PrivateRoute element={<Bill></Bill>}></PrivateRoute>
        },

        {
          path: 'data',
          element: <PrivateRoute element={<Data></Data>}></PrivateRoute>
        },

        {
          path: 'user',
          element: <User></User>
        }
      ]
    }
  ])

  // routes这里得到的结果就是一个
  /* 
    <Routes>
      <Route></Route>
      <Route></Route>
      <Route></Route>
      <Route></Route>
      <Route></Route>
      <Route></Route>
    <Routes>
  
  */

  return routes
}

export default Routes