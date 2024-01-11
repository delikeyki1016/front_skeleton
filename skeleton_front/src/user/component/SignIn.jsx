import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'

const SignIn = ()=>{

    const navigate = useNavigate()

    const [data, setData] = useState({email:'', password:''})
    const changeData = useCallback((e) => {
        setData((data)=> ({...data, [e.target.name]: e.target.value}))
    }, [])
    
    const login = useCallback(async (e)=>{
        e.preventDefault()
        console.log(data)
        const resp = await axios.post('http://localhost:8000/users/signin', data)
        if(resp.data.status === 500) window.alert(resp.data.message)
        else {
            navigate('/')
            alert(`${resp.data.data.name}님 로그인되었습니다.`)
        }
    }, [data, navigate])

    return (
        <main id="main">

            {/* <!-- ======= Intro Single ======= --> */}
            <section className="intro-single">
            <div className="container">
                <div className="row">
                <div className="col-md-12 col-lg-8">
                    <div className="title-single-box">
                    <h1 className="title-single">Log In</h1>
                    </div>
                </div>
                <div className="col-md-12 col-lg-4">
                    <nav aria-label="breadcrumb" className="breadcrumb-box d-flex justify-content-lg-end">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                        <a href="#">Home</a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                        Log In
                        </li>
                    </ol>
                    </nav>
                </div>
                </div>
            </div>
            </section>
            {/* <!-- End Intro Single--> */}
        
            {/* <!-- ======= About Section ======= --> */}
            <section className="section-about">
            <div className="container">
                <form className="row">
                    <div className="col-sm12 position-relative form-group mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="text" className="form-control" id="email" name="email" 
                        value={data.email} onChange={changeData} />
                    </div>
                    <div className="col-sm12 position-relative form-group mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" 
                        value={data.password} onChange={changeData} />
                    </div>
                    <div className="col-sm12 position-relative form-group">
                        <button type="submit" className="btn btn-danger btn-sm" onClick={login}>LogIn</button>
                        {" "}
                        <button type="reset" className="btn btn-primary btn-sm" onClick={()=>setData({email:'', password:''})}>Reset</button>
                    </div>
                </form>
            </div>
            </section>
                
        </main>
    )
}

export default SignIn