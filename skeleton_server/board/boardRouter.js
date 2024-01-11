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

// http://localhost:8000/boards/insert
router.post('/insert', function(req, res, next) {
    console.log('board router, insert가 호출')
    // post방식은 request body를 통해서 데이터를 전달하는 방식
    const data = req.body
    boardDAO.insert(data, (resp) => {
        res.send(resp)
        //res.json(resp) 으로 가능
    })
})

// http://localhost:8000/boards/board/8 
router.get('/board/:id', function(req, res, next) {
    const { id } = req.params
    console.log('board/:id 호출', id)
    boardDAO.board(id, (resp) => {
        res.json(resp)
    })
})

// http://localhost:8000/boards/delete/8 
router.post('/delete/:id', function(req, res, next) {
    const { id } = req.params
    console.log('delete/:id 호출', id)
    boardDAO.delete(id, (resp) => {
        res.json(resp)
    })
})

// http://localhost:8000/boards/update/8 
router.post('/update', function(req, res, next) {
    const data = req.body
    console.log(data)
    boardDAO.update(data, (resp) => {
        res.json(resp)
    })
})

module.exports = router