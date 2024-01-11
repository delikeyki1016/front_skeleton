const getPool = require('../common/pool')

// 필요한 sql 등록
const sql = {
    boardList: 'SELECT * FROM board ORDER BY id DESC',
    insert: 'INSERT INTO board (name, title, content) VALUES (?, ?, ?)',
}

const boardDAO = {
    // 게시물 조회 요청이 들어왔을 때 라우터에 의해 실행되고 dbms 연동
    boardList: async (callback) => {
        let conn = null
        try {
            conn = await getPool().getConnection()
            const [respList] = await conn.query(sql.boardList) 
            // console.log(respList)
            callback({status:200, message: 'OK', data:respList})
            // if (respList[0]) {
            //     callback({status:200, message: 'OK', data:respList})
            // } else {
            //     callback({status:500, message: 'board 목록 조회 실패'})
            // }
        } catch(error) {
            return {status: 500, message: 'board 목록 조회 실패', error: error}
        } finally {
            if(conn !== null) conn.release()
        }
    },

    insert: async (item, callback) => {
        let conn = null
        try {
            conn = await getPool().getConnection()
            console.log('Board Insert DAO', item)
            const [resp] = await conn.query(sql.insert, [item.name, item.title, item.content]) 
            console.log(resp)
            callback({status:200, message: 'OK', data: resp})
        } catch(error) {
            return {status: 500, message: 'board 입력 실패', error: error}
        } finally {
            if(conn !== null) conn.release()
        }
    }
}

module.exports = boardDAO