import { Link, useNavigate } from "react-router-dom";
import "./Select.css"

function Select() {

  const navigate = useNavigate()

  const login = () => {
    navigate('/login', {replace: true})
  }

  return (
    <div className="bg">
      <div className="select-panel">
        
        <Link to={'/register'} className="btn register">注册</Link>
        <Link to={'/login'} className="btn login">登录</Link>
        {/* <div className="btn register">注册</div>
        <div className="btn login" onClick={login}>登录</div> */}

      </div>
    </div>
  );
}

export default Select;