const express = require('express')
const router = express.Router()
const boardDAO = require('./boardDAO')

// 유저요청이 들어오면 실행 http://localhost:8000/boards/boardList
router.get('/boardList', function(req, res, next) {
    console.log('board router, boardList이 호출')
    // 매개변수 callback 
    // (resp) => {
    //    res.json(resp)
    //}
    boardDAO.boardList((resp) => {
        res.json(resp)
    })
})

router.post('/insert', async (req, res, next) => {
    console.log('board router, insert가 호출')
    const data = req.body
    boardDAO.insert(data, (resp) => {
        res.send(resp)
    })
})

module.exports = router