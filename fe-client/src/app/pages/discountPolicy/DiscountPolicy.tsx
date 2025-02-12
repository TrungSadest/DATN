import React, { useEffect } from 'react'

export default function DiscountPolicy() {
    useEffect(() => {
        window.scrollTo(0, 0); // Cuộn lên vị trí x=0, y=0 khi component render
    }, []);

    return (
        <>
            <div className="container-fluid py-5">
                <div className="container">
                    <div className="border-start border-5 border-primary ps-5 mb-5">
                        <h6 className="text-primary text-uppercase">Chính Sách Ưu Đãi</h6>
                        <h1 className="display-5 text-uppercase mb-0">Chia sẻ cơ hội - Nhân đôi giá trị</h1>
                    </div>
                    <div className="row gx-5">
                        <div className="col-lg-5 mb-5 mb-lg-0" style={{ minHeight: '500px' }}>
                            <div className="position-relative h-100">
                                <img className="position-absolute w-100 h-100 border rounded-3"
                                    src="/assets/img/mls-discount-policy.svg" style={{ objectFit: 'cover' }} />
                            </div>
                        </div>
                        <div className="d-flex flex-column align-items-center justify-content-between col-lg-7">
                            <div className="row border-bottom">
                                <div className='col-2 mb-4'>
                                    <img className="w-100 rounded-3" src="/assets/img/mls-you.svg" />
                                </div>
                                <div className='col-10'>
                                    <h4 className="mb-4 text-primary">(F0) Khi bạn bán được 1 giấy phép thì bạn sẽ nhận được 30%
                                        lợi nhuận của giao dịch đó.</h4>
                                </div>
                            </div>
                            <div className="row border-bottom mt-3">
                                <div className='col-2 mb-4'>
                                    <img className="w-100 rounded-3" src="/assets/img/mls-seller-f1.svg" />
                                </div>
                                <div className='col-10'>
                                    <h4 className="mb-4 text-warning">(F1) Người trực tiếp do bạn giới thiệu bán được 1 giấy phép thì bạn sẽ nhận được 15%
                                        lợi nhuận của giao dịch đó.</h4>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className='col-2 mb-4'>
                                    <img className="w-100 rounded-3" src="/assets/img/mls-seller-f2.svg" />
                                </div>
                                <div className='col-10'>
                                    <h4 className="mb-4 text-danger">(F2) Người được các F1 giới thiệu bán được 1 giấy phép thì bạn sẽ nhận được 5%
                                        lợi nhuận của giao dịch đó.</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
