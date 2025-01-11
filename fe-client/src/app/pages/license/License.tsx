import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function License() {
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0); // Cuộn lên vị trí x=0, y=0 khi component render
    }, []);

    const emailVerification = () => {
        navigate('/license/email-verification');
    }

    return (
        <>
            <div className="container-fluid py-5">
                <div className="container">
                    <div className="border-start border-5 border-primary ps-5 mb-5">
                        <h6 className="text-primary text-uppercase">Mua giấy phép</h6>
                        <h1 className="display-5 text-uppercase mb-0">Trải nghiệm bản quyền chính hãng</h1>
                    </div>
                    <div className="row d-flex justify-content-center g-5">
                        <div className="col-lg-4">
                            <div className="bg-light text-center pt-5 mt-lg-5 shadow">
                                <h2 className="text-uppercase">Basic</h2>
                                <h6 className="text-body mb-5">The Best Choice</h6>
                                <div className="text-center bg-primary p-4 mb-2">
                                    <h1 className="display-4 text-white mb-0">
                                        <small className="align-top"
                                            style={{ fontSize: '22px', lineHeight: '45px' }}>$</small>49<small
                                                className="align-bottom" style={{ fontSize: '16px', lineHeight: '40px' }}>/
                                            Mo</small>
                                    </h1>
                                </div>
                                <div className="text-center p-4">
                                    <div className="d-flex align-items-center justify-content-between mb-1">
                                        <span>HTML5 & CSS3</span>
                                        <i className="bi bi-check2 fs-4 text-primary"></i>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mb-1">
                                        <span>Bootstrap v5</span>
                                        <i className="bi bi-check2 fs-4 text-primary"></i>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mb-1">
                                        <span>Responsive Layout</span>
                                        <i className="bi bi-x fs-4 text-danger"></i>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mb-1">
                                        <span>Browsers Compatibility</span>
                                        <i className="bi bi-x fs-4 text-danger"></i>
                                    </div>
                                    <a onClick={() => { emailVerification(); }} className="btn btn-primary text-uppercase py-2 px-4 my-3">Buy Now</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="bg-light text-center pt-5 shadow">
                                <h2 className="text-uppercase">Standard</h2>
                                <h6 className="text-body mb-5">The Best Choice</h6>
                                <div className="text-center bg-warning p-4 mb-2">
                                    <h1 className="display-4 text-white mb-0">
                                        <small className="align-top"
                                            style={{ fontSize: '22px', lineHeight: '45px' }}>$</small>99<small
                                                className="align-bottom" style={{ fontSize: '16px', lineHeight: '40px' }}>/
                                            Mo</small>
                                    </h1>
                                </div>
                                <div className="text-center p-4">
                                    <div className="d-flex align-items-center justify-content-between mb-1">
                                        <span>HTML5 & CSS3</span>
                                        <i className="bi bi-check2 fs-4 text-primary"></i>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mb-1">
                                        <span>Bootstrap v5</span>
                                        <i className="bi bi-check2 fs-4 text-primary"></i>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mb-1">
                                        <span>Responsive Layout</span>
                                        <i className="bi bi-check2 fs-4 text-primary"></i>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mb-1">
                                        <span>Browsers Compatibility</span>
                                        <i className="bi bi-x fs-4 text-danger"></i>
                                    </div>
                                    <a onClick={() => { emailVerification(); }} className="btn btn-warning text-uppercase py-2 px-4 my-3">Buy Now</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="bg-light text-center pt-5 mt-lg-5 shadow">
                                <h2 className="text-uppercase">Extended</h2>
                                <h6 className="text-body mb-5">The Best Choice</h6>
                                <div className="text-center bg-primary p-4 mb-2">
                                    <h1 className="display-4 text-white mb-0">
                                        <small className="align-top"
                                            style={{ fontSize: '22px', lineHeight: '45px' }}>$</small>149<small
                                                className="align-bottom" style={{ fontSize: '16px', lineHeight: '40px' }}>/
                                            Mo</small>
                                    </h1>
                                </div>
                                <div className="text-center p-4">
                                    <div className="d-flex align-items-center justify-content-between mb-1">
                                        <span>HTML5 & CSS3</span>
                                        <i className="bi bi-check2 fs-4 text-primary"></i>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mb-1">
                                        <span>Bootstrap v5</span>
                                        <i className="bi bi-check2 fs-4 text-primary"></i>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mb-1">
                                        <span>Responsive Layout</span>
                                        <i className="bi bi-check2 fs-4 text-primary"></i>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mb-1">
                                        <span>Browsers Compatibility</span>
                                        <i className="bi bi-check2 fs-4 text-primary"></i>
                                    </div>
                                    <a onClick={() => { emailVerification(); }} className="btn btn-primary text-uppercase py-2 px-4 my-3">Buy Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
