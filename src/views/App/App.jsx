import { Outlet, NavLink } from 'react-router-dom'
import "./App.css"


function Tabbar () {
  return (
    <div className="tabbar">
      <NavLink className="tabbar-item" to={'/bill'}>
        <span className='iconfont icon-zongzhangdan'></span>
        <span className='tabbarname'>账单</span>
      </NavLink>
      <NavLink className="tabbar-item" to={'/data'}>
        <span className='iconfont icon-shujufenxi'></span>
        <span className='tabbarname'>数据</span>
      </NavLink>
      <NavLink className="tabbar-item" to={'/user'}>
        <span className='iconfont icon-zhanghu'></span>
        <span className='tabbarname'>我的</span>
      </NavLink>
    </div>
  )
}

function App() {
  return (
    <>
      <Outlet></Outlet>

      <Tabbar></Tabbar>

    </>
  );
}

export default App;