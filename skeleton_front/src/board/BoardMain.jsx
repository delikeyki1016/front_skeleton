import { Routes, Route } from 'react-router-dom'
import BoardList from './component/BoardList'

const BoardMain = () => {
    return (
        <div>
            <h1>Board Main</h1>
            <Routes>
                <Route path='/list' element={<BoardList />} />
            </Routes>
        </div>
    )
}

export default BoardMain