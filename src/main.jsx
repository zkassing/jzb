import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Router } from 'react-router-dom'
import Routes from './routes/Routes'
import { Suspense } from 'react'
import "reset.css"
// import "https://at.alicdn.com/t/c/font_4461543_f6dym4nvfuq.css"
import "./index.css"
import 'zarm/dist/zarm.css';

import { createBrowserHistory } from 'history'
import { useState } from 'react'
 
// 封装一个组件 是一个基于Router的路由组件
function HistoryRouter ({history, children, ...props}) {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });
  React.useLayoutEffect(() => history.listen(setState), [history]);

  return <Router {...props} location={state.location} navigationType={state.action} navigator={history} >
    {children}
  </Router>;
}

export const history = createBrowserHistory()
 
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense>
      {/* <BrowserRouter>
        <Routes></Routes>
      </BrowserRouter> */}
      <HistoryRouter history={history}>
        <Routes></Routes>
      </HistoryRouter>
    </Suspense>
   
  </React.StrictMode>,
)
