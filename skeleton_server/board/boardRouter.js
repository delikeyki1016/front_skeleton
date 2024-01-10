const express = require('express')
const router = express.Router()
const boardDAO = require('./boardDAO')

// 유저요청이 들어오면 실행 http://localhost:8000/boards/boardList
router.get('/boardList', function(req, res, next) {
    console.log('board router, boardList이 호출되었다')
    boardDAO.boardList((resp) => {
        res.json(resp)
    })
})

module.exports = router