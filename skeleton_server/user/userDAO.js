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
            // pool에서 connection 1개를 획득
            conn = await getPool().getConnection()
            console.log('DAO', item)
            // email check sql 문 실행
            const [respCheck] = await conn.query(sql.checkId, item.email) // item.email를 ?에 대입
            if (respCheck[0]) {
                // console.log('respCheck', respCheck)
                // 이메일로 select되는 데이터가 있다면, 이미 가입된 회원이다
                callback({status:500, message:'사용자가 존재합니다.'})
            } else {
                // 회원가입. table에 insert
                // 유저패스워드는 hash문자열로 변형시켜서 저장 
                const salt = await bcrypt.genSalt()
                // bcrypt.hash : bcrypt 라이브러리를 사용하여 비밀번호를 해시화
                // item.password : 해시화할 원본 비밀번호
                // salt : bcrypt에서 사용하는 salt 값으로, 해시 과정에서 추가적인 보안을 제공
                // async (error, hash) => {} : 해시 생성이 완료되면 콜백 함수가 호출. 콜백 함수는 두 개의 매개변수를 받습니다.
                //   error : 해시 생성 중 발생한 오류, hash : 생성된 해시 값, 
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
    },

    login: async (item, callback) => {
        // 유저 입력 데이터 획득
        const {email, password} = item
        console.log('item:', email, password)
        let conn = null
        try {
            // console.log('1. 커넥션받기 전 conn', conn)
            conn = await getPool().getConnection()
            // console.log('2. 커넥션받은 후 conn', conn)
            // sql 실행
            const [user] = await conn.query(sql.checkId, [email])
            console.log('3. user', user)
            if(!user[0]) {
                // db에 데이터가 없다. 유저가 입력한 이메일이 잘못되었다는 이야기.
                callback({status:500, message: '아이디,패스워드를 확인해주세요.'})
            } else {
                // db에 데이터가 있다. 유저입력 비밀번호와 db의 비밀번호를 비교
                console.log('유저입력 패스워드:', password, 'DB 입력되있는 패스워드:', user[0].password)
                // db에는 비밀번호가 해시로 저장되어있기 때문에, 유저입력 비밀번호를 해시로 만들어서 비교해야 한다.
                bcrypt.compare(password, user[0].password, async (error, result)=>{
                    if(error) {
                        callback({status:500, message: '아이디, 패스워드를 확인해주세요'})
                    } else if(result) {
                        console.log('4. result', result)
                        callback({status:200, message: 'OK', data:{name: user[0].name}, email: user[0].email})
                    } else {
                        callback({status:500, message: '아이디, 패스워드를 확인해주세요'}) 
                    }
                })
            }

        } catch(e) {
            return {status: 500, message: '로그인 실패', error: e}
        } finally {
            if(conn !== null) conn.release()
        }
    }
}

module.exports = userDAO