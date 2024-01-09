const bcrypt = require('bcrypt')
const getPool = require('../common/pool')

const sql = {
    // 회원가입 시 중복 이메일 체크하기 위한 sql구문
    // ? 는 프로그램 데이터가 들어갈 자리
    checkId: 'SELECT * FROM user WHERE email = ?',
    signup: 'INSERT INTO user (name, email, password) VALUES (?, ?, ?)',
}

// DAO(Data Access Object) - DBMS연동처리
const userDAO = {
    // item : 클라이언트 요청데이터
    // callback : DBMS가 성공한 후에 호출할 개발자 함수
    signup: async (item, callback) => {
        // console.log('user DAO, signup이 콜되었다.')
        // callback()
        let conn = null
        try {
            // 정상실행 로직
            // pool에서 connection을 획득
            conn = await getPool().getConnection()
            console.log('DAO', item)
            // email check sql 문 실행
            const [respCheck] = await conn.query(sql.checkId, item.email) // item.email은 ?에 대입
            if (respCheck[0]) {
                // 이메일로 select되는 데이터가 있다면, 이미 가입된 회원이다
                callback({status:500, message:'사용자가 존재합니다.'})
            } else {
                // 회원가입. table에 insert
                // 유저패스워드는 hash문자열로 변형시켜서 저장 
                const salt = await bcrypt.genSalt()
                bcrypt.hash(item.password, salt, async (error, hash) => {
                    if(error) callback({status: 500, message: '암호화 실패', error: error})
                    else {
                        // db insert
                        const [resp] = await conn.query(sql.signup, [item.name, item.email, hash])
                        callback({status: 200, message: 'OK', data: resp})
                    }
                })
            }
        } catch(error) {
            // 에러발생시에 실행 로직
            return {status: 500, message: '유저 입력 실패', error: error}
        } finally {
            // 마지막에 항상 실행되는 로직
            // 사용했던 connection을 pool에 반환해서 다른 곳에서 사용할 수 있도록.
            if(conn !== null) conn.release()
        }
    }
}

module.exports = userDAO