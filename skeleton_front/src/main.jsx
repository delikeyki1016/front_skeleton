import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
// 부트스트랩 템플릿의 index.html에 <link>로 걸리는 css를 전역으로 추가
import './assets/vendor/bootstrap-icons/bootstrap-icons.min.css'
import './assets/vendor/animate.css/animate.min.css'
import './assets/css/style.css'
import './assets/vendor/swiper/swiper-bundle.min.css'
import './index.css'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
