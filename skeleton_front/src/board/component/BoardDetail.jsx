import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

const BoardDetail = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    // console.log(id)
    const [data, setData] = useState({name:'', title:'', content:'', createdAt:''})
    
    const getBoard = useCallback(async ()=>{
        // 서버연동
        const resp = await axios.get('http://localhost:8000/boards/board/'+id)
        console.log(resp)
        if(resp.data.status === 500) window.alert('게시물 조회 실패')
        else {
            setData(resp.data.data[0])
        }
    }, []) 

    useEffect(()=>{
        // 서버에서 최초에 한번만 데이터를 받아오면 된다.
        getBoard()
    }, [getBoard])

    return (
        <main id="main">
            <section className="intro-single">
                <div className="container">
                    <div className="row">
                    <div className="col-md-12 col-lg-8">
                        <div className="title-single-box">
                        <h1 className="title-single">게시물 상세</h1>
                        <span className="color-text-a">Board Detail</span>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-4">
                        <nav aria-label="breadcrumb" className="breadcrumb-box d-flex justify-content-lg-end">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                            <a href="#">Home</a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                            Board Detail
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
                        <form className="row">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td>타이틀</td>
                                        <td>{data.title}</td>
                                    </tr>
                                    <tr>
                                        <td>내용</td>
                                        <td>{data.content}</td>
                                    </tr>
                                    <tr>
                                        <td>작성자</td>
                                        <td>{data.name}</td>
                                    </tr>
                                    <tr>
                                        <td>작성일</td>
                                        <td>{data.createdAt}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2" className="text-end">
                                            <button type='button' className="btn btn-primary btn-sm" onClick={()=>navigate('/board/list')}>목록</button>
                                            {" "}
                                            <button type='submit' className="btn btn-warning btn-sm">수정</button>
                                            {" "}
                                            <button type='submit' className="btn btn-warning btn-sm">삭제</button>                                            
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>        
    )
}

export default BoardDetail