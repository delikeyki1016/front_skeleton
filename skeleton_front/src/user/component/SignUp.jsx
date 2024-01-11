import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'

const SignUp = ()=>{

    // url path 조정
    const navigate = useNavigate()

    // 유저입력값을 controlled component 로 설정
    const [data, setData] = useState({name:'', email:'', password:''})
    // 빈 의존성 배열 []은 함수가 외부 변수에 의존하지 않음을 나타냅니다. 따라서 이 함수는 한 번만 생성됩니다.
    const changeData = useCallback((e) => {
        // 현재 상태(data)를 받아와서 새로운 상태 객체를 반환
        // 현재 상태의 얕은 복사본을 생성하고, 이벤트를 트리거한 입력 필드에 해당하는 속성을 업데이트
        setData((data)=> ({...data, [e.target.name]: e.target.value}))
    }, [])
    // submit 버튼 클릭 이벤트, 
    // 해당함수가 빈번하게 생성되는 것을 막기위해 useCallback 사용 [data, navigate]가 변경될 때만 해당 함수를 생성
    const signup = useCallback(async (e)=>{
        e.preventDefault()
        console.log(data)
        // 서버연동
        const resp = await axios.post('http://localhost:8000/users/signup', data)
        if(resp.data.status === 500) window.alert('사용자가 존재합니다.')
        // 첫화면으로 화면전환
        else navigate('/')
    }, [data, navigate])

    return (
        <main id="main">

            {/* <!-- ======= Intro Single ======= --> */}
            <section className="intro-single">
            <div className="container">
                <div className="row">
                <div className="col-md-12 col-lg-8">
                    <div className="title-single-box">
                    <h1 className="title-single">Sign Up</h1>
                    </div>
                </div>
                <div className="col-md-12 col-lg-4">
                    <nav aria-label="breadcrumb" className="breadcrumb-box d-flex justify-content-lg-end">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                        <a href="#">Home</a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                        SignUp
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
                {/* ajax로 서버에 유저 입력데이터를 전송 */}
                {/* ajax에서 서버url 지정, http request method를 지정한다. 따라서 여기서는 속성 지정이 필요없다. */}
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
                    <div className="col-sm12 position-relative form-group mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name="name"
                        value={data.name} onChange={changeData} />
                    </div>
                    <div className="col-sm12 position-relative form-group">
                        <button type="submit" className="btn btn-danger btn-sm" onClick={signup}>SignUp</button>
                        {" "}
                        <button type="reset" className="btn btn-primary btn-sm" onClick={()=>setData({name:'', email:'', password:''})}>Reset</button>
                    </div>
                </form>
            </div>
            </section>
        
            {/* <!-- =======Team Section ======= --> */}
            <section className="section-agents section-t8">
            <div className="container">
                <div className="row">
                <div className="col-md-12">
                    <div className="title-wrap d-flex justify-content-between">
                    <div className="title-box">
                        <h2 className="title-a">Meet Our Team</h2>
                    </div>
                    </div>
                </div>
                </div>
                <div className="row">
                <div className="col-md-4">
                    <div className="card-box-d">
                    <div className="card-img-d">
                        {/* signup.jsx 컴포넌트가 라우팅되는 조건이http:// localhost:5173/user/ 이다. 
                        따라서 이미지경로가 http:// localhost:5173/user/images/ 로 지정되기 때문에 
                        이미지 경로를 /루트로 설정해줘야 함 */}
                        <img src="/images/agent-7.jpg" alt="" className="img-d img-fluid" />
                    </div>
                    <div className="card-overlay card-overlay-hover">
                        <div className="card-header-d">
                        <div className="card-title-d align-self-center">
                            <h3 className="title-d">
                            <a href="agent-single.html" className="link-two">Margaret Sotillo
                                <br/> Escala</a>
                            </h3>
                        </div>
                        </div>
                        <div className="card-body-d">
                        <p className="content-d color-text-a">
                            Sed porttitor lectus nibh, Cras ultricies ligula sed magna dictum porta two.
                        </p>
                        <div className="info-agents color-a">
                            <p>
                            <strong>Phone: </strong> +54 356 945234
                            </p>
                            <p>
                            <strong>Email: </strong> agents@example.com
                            </p>
                        </div>
                        </div>
                        <div className="card-footer-d">
                        <div className="socials-footer d-flex justify-content-center">
                            <ul className="list-inline">
                            <li className="list-inline-item">
                                <a href="#" className="link-one">
                                <i className="bi bi-facebook" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#" className="link-one">
                                <i className="bi bi-twitter" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#" className="link-one">
                                <i className="bi bi-instagram" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#" className="link-one">
                                <i className="bi bi-linkedin" aria-hidden="true"></i>
                                </a>
                            </li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card-box-d">
                    <div className="card-img-d">
                        <img src="/images/agent-6.jpg" alt="" className="img-d img-fluid" />
                    </div>
                    <div className="card-overlay card-overlay-hover">
                        <div className="card-header-d">
                        <div className="card-title-d align-self-center">
                            <h3 className="title-d">
                            <a href="agent-single.html" className="link-two">Stiven Spilver
                                <br/> Darw</a>
                            </h3>
                        </div>
                        </div>
                        <div className="card-body-d">
                        <p className="content-d color-text-a">
                            Sed porttitor lectus nibh, Cras ultricies ligula sed magna dictum porta two.
                        </p>
                        <div className="info-agents color-a">
                            <p>
                            <strong>Phone: </strong> +54 356 945234
                            </p>
                            <p>
                            <strong>Email: </strong> agents@example.com
                            </p>
                        </div>
                        </div>
                        <div className="card-footer-d">
                        <div className="socials-footer d-flex justify-content-center">
                            <ul className="list-inline">
                            <li className="list-inline-item">
                                <a href="#" className="link-one">
                                <i className="bi bi-facebook" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#" className="link-one">
                                <i className="bi bi-twitter" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#" className="link-one">
                                <i className="bi bi-instagram" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#" className="link-one">
                                <i className="bi bi-linkedin" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#" className="link-one">
                                <i className="bi bi-dribbble" aria-hidden="true"></i>
                                </a>
                            </li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card-box-d">
                    <div className="card-img-d">
                        <img src="/images/agent-5.jpg" alt="" className="img-d img-fluid" />
                    </div>
                    <div className="card-overlay card-overlay-hover">
                        <div className="card-header-d">
                        <div className="card-title-d align-self-center">
                            <h3 className="title-d">
                            <a href="agent-single.html" className="link-two">Emma Toledo
                                <br/> Cascada</a>
                            </h3>
                        </div>
                        </div>
                        <div className="card-body-d">
                        <p className="content-d color-text-a">
                            Sed porttitor lectus nibh, Cras ultricies ligula sed magna dictum porta two.
                        </p>
                        <div className="info-agents color-a">
                            <p>
                            <strong>Phone: </strong> +54 356 945234
                            </p>
                            <p>
                            <strong>Email: </strong> agents@example.com
                            </p>
                        </div>
                        </div>
                        <div className="card-footer-d">
                        <div className="socials-footer d-flex justify-content-center">
                            <ul className="list-inline">
                            <li className="list-inline-item">
                                <a href="#" className="link-one">
                                <i className="bi bi-facebook" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#" className="link-one">
                                <i className="bi bi-twitter" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#" className="link-one">
                                <i className="bi bi-instagram" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#" className="link-one">
                                <i className="bi bi-linkedin" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#" className="link-one">
                                <i className="bi bi-dribbble" aria-hidden="true"></i>
                                </a>
                            </li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>
            {/* <!-- End About Section--> */}
        
        </main>
    )
}

export default SignUp