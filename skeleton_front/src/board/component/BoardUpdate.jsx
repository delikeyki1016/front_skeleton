import axios from "axios"
import React, {useCallback, useState, useEffect} from 'react'
import { useNavigate, useParams } from "react-router"
import { Link } from "react-router-dom"

const BoardUpdate = ()=>{
    const navigate = useNavigate()

    const {id} = useParams()

    //controlled component 
    const [data, setData] = useState({name:'', title:'', content:''})

    // 컴포넌트가 나오자마자, 서버에서 데이터 획득 후 화면에 출력
    const getBoard = useCallback(async ()=>{
        // 서버연동
        const resp = await axios.get('http://localhost:8000/boards/board/'+id)
        if(resp.data.status === 500) window.alert('게시물 조회 실패')
        else {
            setData(resp.data.data)
        }
    }, []) 

    useEffect(()=>{
        // 서버에서 최초에 한번만 데이터를 받아오면 된다.
        getBoard()
    }, []) 

    
    // 유저가 수정한 것을 서버연동 
    const changeData = useCallback((e) => {
        setData({...data, [e.target.name]: e.target.value})
    }, [data])

    const boardUpdate = useCallback(async (e)=>{
        e.preventDefault()
        console.log(data)
        // 서버연동
        const resp = await axios.post('http://localhost:8000/boards/update', data)
        if(resp.data.status === 500) window.alert('입력오류')
        // board list로 화면전환
        else navigate('/board/list')
    }, [data, navigate])

    return (
        <main id="main">
            <section className="intro-single">
                <div className="container">
                    <div className="row">
                    <div className="col-md-12 col-lg-8">
                        <div className="title-single-box">
                        <h1 className="title-single">게시물 수정</h1>
                        <span className="color-text-a">Board Update</span>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-4">
                        <nav aria-label="breadcrumb" className="breadcrumb-box d-flex justify-content-lg-end">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                            <a href="#">Home</a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                            Board Update
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
                                    {/* <tr>
                                        <td>이름</td>
                                        <td>
                                            {}
                                        </td>
                                    </tr> */}
                                    <tr>
                                        <td>타이틀</td>
                                        <td>
                                            <input type='text' className="form-control" name='title' 
                                            value={data.title} onChange={changeData} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>내용</td>
                                        <td>
                                            <textarea cols="80" rows="10" name='content' className="form-control" 
                                            value={data.content} onChange={changeData}></textarea>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2" className="text-end">
                                            {/* 입력한 내용 취소 */}
                                            {/* <button type='reset' className="btn btn-primary btn-sm" onClick={()=>setData({name:'', title:'', content:''})}>취소</button> */}
                                            {/* <Link to='/board/list'><button type='button' className="btn btn-primary btn-sm">취소</button></Link> */}
                                            <button type='button' className="btn btn-primary btn-sm" onClick={()=>navigate('/board/list')}>취소</button>
                                            {" "}
                                            <button type='submit' className="btn btn-warning btn-sm" onClick={boardUpdate}>수정</button>
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

export default BoardUpdate
