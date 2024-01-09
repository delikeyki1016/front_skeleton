import { Routes, Route } from 'react-router-dom'
import Header from './home/component/Header'
import Footer from './home/component/Footer'
import HomeMain from './home/HomeMain'
import UserMain from './user/UserMain'

const App = () => {
  return (
    <div>
      <Header />
      {/* 각 화면이 라우팅되게 등록, 각 업무의 첫화면만 등록하고, 그 안의 화면전환은 중첩 라우팅으로 처리 */}
      <Routes>
        <Route path='/' element={<HomeMain />} />
        <Route path='/user/*' element={<UserMain />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App