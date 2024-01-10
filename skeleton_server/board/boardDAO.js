const getPool = require('../common/pool')

// 필요한 sql 등록
const sql = {
    boardList: 'SELECT * FROM board ORDER BY id DESC',
}

const boardDAO = {
    // 게시물 조회 요청이 들어왔을 때 라우터에 의해 실행되고 dbms 연동
    boardList: async (callback) => {
        let conn = null
        try {
            conn = await getPool().getConnection()
            const [respList] = await conn.query(sql.boardList) 
            // console.log(respList)
            if (respList[0]) {
                callback({status:200, message: 'OK', data:respList})
            } else {
                callback({status:500, message: 'board 목록 조회 실패'})
            }
        } catch(error) {
            return {status: 500, message: 'board 목록 조회 실패', error: error}
        } finally {
            if(conn !== null) conn.release()
        }
    }
}

module.exports = boardDAO