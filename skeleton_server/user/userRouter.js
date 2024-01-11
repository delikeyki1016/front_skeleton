const express = require('express')
const router = express.Router()
const userDAO = require('./userDAO')

// 유저업무와 관련된 요청이 들어왔을 때 그 요청을 처리하는 역할 http://localhost:8000/users/signup/
router.post('/signup', async (req, res, next) => {
    console.log('user router, signup이 호출되었다')
    // front 전달 데이터 획득
    const data = req.body
    userDAO.signup(data, (resp) => {
        res.send(resp)
    })
})

router.post('/signin', async (req, res, next) => { // async 없어도 됨
    console.log('user router, signIn으로 접속되었다')
    // front 전달 데이터 획득
    const data = req.body
    userDAO.login(data, (resp) => {
        res.json(resp)
    })
})

module.exports = router