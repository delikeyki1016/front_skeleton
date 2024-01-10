import React, { useCallback, useEffect, useState } from 'react'
import axios from "axios"

const BoardList = () => {

    const [boardList, setBoardList] = useState({
        status:'', message:'', data:[]
    })

    const getBoardList = useCallback(async ()=>{
        // 서버연동
        const resp = await axios.get('http://localhost:8000/boards/boardList')
        if(resp.data.status === 500) window.alert('목록 조회 실패')
        else {
            console.log(resp.data)
            setBoardList(resp.data)
        }
    }, [])

    useEffect(()=>{
        // 서버에서 최초에 한번만 데이터를 받아오면 된다.
        getBoardList()
    }, [getBoardList])

    return (
        <main id="main">
            <section className="intro-single">
                <div className="container">
                    <div className="row">
                    <div className="col-md-12 col-lg-8">
                        <div className="title-single-box">
                        <h1 className="title-single">게시물 목록</h1>
                        <span className="color-text-a">Board List</span>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-4">
                        <nav aria-label="breadcrumb" className="breadcrumb-box d-flex justify-content-lg-end">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                            <a href="#">Home</a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                            Board List
                            </li>
                        </ol>
                        </nav>
                    </div>
                    </div>
                </div>
            </section>

            <section className="property-grid grid">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>번호</th>
                                        <th>타이틀</th>
                                        <th>이름</th>
                                        <th>작성일</th>
                                        <th>조회수</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {boardList.data.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.title}</td>
                                            <td>{item.name}</td>
                                            <td>{item.createdAt}</td>
                                            <td>{item.cnt}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={5} className="text-end">
                                            <button className='btn btn-primary'>ADD</button>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default BoardList