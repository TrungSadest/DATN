import React, { useEffect } from 'react'

export default function About() {

    useEffect(() => {
        window.scrollTo(0, 0); // Cuộn lên vị trí x=0, y=0 khi component render
    }, []);
    return (
        <>
            <div className="container-fluid bg-offer my-5 py-5">
                <div className="container py-5">
                    <div className="row gx-5">
                        <div className="col-lg-5 mb-5 mb-lg-0" style={{ minHeight: '500px' }}>
                            <div className="position-relative h-100">
                                <img className="position-absolute w-100 h-100 rounded" src="/assets/img/house-2.png" style={{ objectFit: 'cover' }} />
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="border-start border-5 border-primary ps-5 mb-5">
                                <h6 className="text-primary text-uppercase">Mua bán bất động sản</h6>
                                <h1 className="display-5 text-uppercase mb-0">Giới thiệu về Chúng Tôi</h1>
                            </div>
                            <h4 className="text-body mb-4">Diam dolor diam ipsum tempor sit. Clita erat ipsum et lorem stet no labore lorem sit clita duo justo magna dolore</h4>
                            <div className="bg-light p-4">
                                <ul className="nav nav-pills justify-content-between mb-3" id="pills-tab" role="tablist">
                                    <li className="nav-item w-50" role="presentation">
                                        <button className="nav-link text-uppercase w-100 active" id="pills-1-tab" data-bs-toggle="pill"
                                            data-bs-target="#pills-1" type="button" role="tab" aria-controls="pills-1"
                                            aria-selected="true">Giá trị cốt lõi</button>
                                    </li>
                                    <li className="nav-item w-50" role="presentation">
                                        <button className="nav-link text-uppercase w-100" id="pills-2-tab" data-bs-toggle="pill"
                                            data-bs-target="#pills-2" type="button" role="tab" aria-controls="pills-2"
                                            aria-selected="false">Lý do chọn chúng tôi</button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-1" role="tabpanel" aria-labelledby="pills-1-tab">
                                        <p className="mb-0">
                                            <b>Tín nhiệm: </b>
                                            Đặt chữ tín lên hàng đầu, luôn minh bạch trong mọi giao dịch.
                                            <br />
                                            <b>Chất lượng: </b>
                                            Cung cấp sản phẩm và dịch vụ tốt nhất, đáp ứng mọi nhu cầu của khách hàng.
                                            <br />
                                            <b>Tận tâm: </b>
                                            Lấy sự hài lòng của khách hàng làm kim chỉ nam cho mọi hoạt động.
                                            <br />
                                            <b>Sáng tạo: </b>
                                            Không ngừng đổi mới và ứng dụng công nghệ để nâng cao trải nghiệm khách hàng.
                                        </p>
                                    </div>
                                    <div className="tab-pane fade" id="pills-2" role="tabpanel" aria-labelledby="pills-2-tab">
                                        <p className="mb-0">
                                            <b>Bất động sản đa dạng: </b>
                                            Căn hộ, nhà phố, đất nền, khu nghỉ dưỡng… đáp ứng mọi nhu cầu.
                                            <br />
                                            <b>Tư vấn chuyên sâu: </b>
                                            Đội ngũ chuyên viên tận tâm, giàu kinh nghiệm sẵn sàng hỗ trợ.
                                            <br />
                                            <b>Pháp lý minh bạch: </b>
                                            Đảm bảo an toàn và rõ ràng trong mọi giao dịch.
                                            <br />
                                            <b>Hậu mãi chuyên nghiệp: </b>
                                            Luôn đồng hành cùng khách hàng ngay cả sau khi giao dịch hoàn tất.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid py-5">
                <div className="container">
                    <div className="border-start border-5 border-primary ps-5 mb-5">
                        <h6 className="text-primary text-uppercase">Chính Sách Ưu Đãi</h6>
                        <h1 className="display-5 text-uppercase mb-0">Chia sẻ cơ hội - Nhân đôi giá trị</h1>
                    </div>
                    <div className="row gx-5">
                        <div className="col-lg-5 mb-5 mb-lg-0" style={{ minHeight: '400px' }}>
                            <div className="w-100 h-100">
                                <img className="w-100 h-100 border rounded-3" src="/assets/img/mls-discount-policy.svg" style={{ objectFit: 'cover' }} />
                            </div>
                        </div>
                        <div className="d-flex flex-column align-items-center justify-content-between col-lg-7">
                            <div className="row border-bottom">
                                <div className='col-2 mb-4'>
                                    <img className="w-100 rounded-3" src="/assets/img/mls-you.svg" />
                                </div>
                                <div className='col-10'>
                                    <h4 className="mb-4 text-primary">(F0) Khi bạn bán được 1 giấy phép thì bạn sẽ nhận được 30% lợi nhuận của giao dịch đó.</h4>
                                </div>
                            </div>
                            <div className="row border-bottom mt-3">
                                <div className='col-2 mb-4'>
                                    <img className="w-100 rounded-3" src="/assets/img/mls-seller-f1.svg" />
                                </div>
                                <div className='col-10'>
                                    <h4 className="mb-4 text-warning">(F1) Người trực tiếp do bạn giới thiệu bán được 1 giấy phép thì bạn sẽ nhận được 15% lợi nhuận của giao dịch đó.</h4>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className='col-2 mb-4'>
                                    <img className="w-100 rounded-3" src="/assets/img/mls-seller-f2.svg" />
                                </div>
                                <div className='col-10'>
                                    <h4 className="mb-4 text-danger">(F2) Người được các F1 giới thiệu bán được 1 giấy phép thì bạn sẽ nhận được 5% lợi nhuận của giao dịch đó.</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container-fluid py-5">
                <div className="container">
                    <div className="row gx-5">
                        <div className="col-lg-5 mb-5 mb-lg-0" style={{ minHeight: '400px' }}>
                            <div className="h-100">
                                <img className="w-100 h-100 rounded-3" src="/assets/img/mls-ads.svg" style={{ objectFit: 'cover' }} />
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="border-start border-5 border-primary ps-5 mb-5">
                                <h6 className="text-primary text-uppercase">Giới thiệu về chúng tôi</h6>
                                <h1 className="display-5 text-uppercase mb-0">Hệ thống mua & bán giấy phép</h1>
                            </div>
                            <h4 className="text-body mb-2">Giải pháp hiện đại hóa quy trình đặt hàng – Dễ dàng, nhanh chóng, và hiệu quả</h4>
                            {/* <h6 className='text-secondary mb-4'>Hệ thống mua & bán giấy phép QR Order là nền tảng cung cấp giải pháp quản lý và đặt hàng qua mã QR tiên tiến,
                                giúp các doanh nghiệp nhà hàng, quán cafe, và cửa hàng dịch vụ cải thiện trải nghiệm khách hàng và tối ưu hóa hoạt động vận hành.</h6> */}
                            <div className="bg-light p-4">
                                <ul className="row nav nav-pills justify-content-between mb-3" id="pills-tab" role="tablist">
                                    <li className="nav-item col-4" role="presentation">
                                        <button className="nav-link text-uppercase w-100 active" id="pills-1-tab" data-bs-toggle="pill"
                                            data-bs-target="#pills-1" type="button" role="tab" aria-controls="pills-1"
                                            aria-selected="true">Công cụ linh hoạt</button>
                                    </li>
                                    <li className="nav-item col-4" role="presentation">
                                        <button className="nav-link text-uppercase w-100" id="pills-2-tab" data-bs-toggle="pill"
                                            data-bs-target="#pills-2" type="button" role="tab" aria-controls="pills-2"
                                            aria-selected="false">Tiện ích đa dạng</button>
                                    </li>
                                    <li className="nav-item col-4" role="presentation">
                                        <button className="nav-link text-uppercase w-100" id="pills-3-tab" data-bs-toggle="pill"
                                            data-bs-target="#pills-3" type="button" role="tab" aria-controls="pills-2"
                                            aria-selected="false">Cơ hội kinh doanh</button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="pills-tabContent">
                                    <div style={{ minHeight: '150px' }} className="tab-pane fade show active" id="pills-1" role="tabpanel" aria-labelledby="pills-1-tab">
                                        <p className="mb-0">Hệ thống QR Order được thiết kế để giúp các doanh nghiệp dễ dàng triển khai mã QR cá nhân hóa,
                                            phù hợp với từng mô hình kinh doanh. Với công cụ này, doanh nghiệp có thể nhanh chóng tạo mã QR độc nhất,
                                            kết nối trực tiếp với menu hoặc dịch vụ của mình. Khách hàng chỉ cần quét mã bằng điện thoại là có thể đặt hàng ngay lập tức,
                                            không cần tải ứng dụng hay thực hiện các bước phức tạp.
                                            Điều này không chỉ tối ưu hóa trải nghiệm người dùng mà còn giảm tải công việc cho nhân viên phục vụ.</p>
                                    </div>
                                    <div style={{ minHeight: '150px' }} className="tab-pane fade" id="pills-2" role="tabpanel" aria-labelledby="pills-2-tab">
                                        <p className="mb-0">Hệ thống tích hợp tất cả các tính năng quan trọng để quản lý vận hành trong một nền tảng duy nhất.
                                            Doanh nghiệp có thể dễ dàng quản lý và cập nhật menu, xử lý thanh toán nhanh chóng qua nhiều hình thức
                                            (tiền mặt, thẻ, ví điện tử), và theo dõi trạng thái đơn hàng theo thời gian thực.
                                            Ngoài ra, hệ thống còn cung cấp báo cáo chi tiết về hoạt động kinh doanh,
                                            giúp chủ doanh nghiệp đưa ra các quyết định chiến lược một cách hiệu quả.</p>
                                    </div>
                                    <div style={{ minHeight: '150px' }} className="tab-pane fade" id="pills-3" role="tabpanel" aria-labelledby="pills-3-tab">
                                        <p className="mb-0">Hệ thống không chỉ là một giải pháp công nghệ mà còn mở ra nhiều cơ hội kinh doanh hấp dẫn.
                                            Doanh nghiệp hoặc cá nhân có thể tham gia vào việc chia sẻ và mua bán giấy phép sử dụng ứng dụng QR Order.
                                            Điều này không chỉ giúp mở rộng mạng lưới hợp tác mà còn tạo nguồn thu nhập thụ động.
                                            Mô hình linh hoạt này mang lại lợi ích đôi bên: vừa giúp đối tác tiếp cận giải pháp công nghệ tiên tiến,
                                            vừa xây dựng cộng đồng doanh nghiệp cùng phát triển bền vững.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
