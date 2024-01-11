import { Routes, Route } from 'react-router-dom'
import BoardList from './component/BoardList'
import BoardInsert from './component/BoardInsert'
import BoardDetail from './component/BoardDetail'

const BoardMain = () => {
    return (
        <div>
            <h1>Board Main</h1>
            <Routes>
                <Route path='/list' element={<BoardList />} />
                <Route path='/insert' element={<BoardInsert />} />
                <Route path='/detail/:id' element={<BoardDetail />} />
            </Routes>
        </div>
    )
}

export default BoardMain