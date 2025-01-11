import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import License from './license/License';
import About from './about/About';
import BuyComponent from './buy/BuyComponent';
export default function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn lên vị trí x=0, y=0 khi component render
  }, []);
  const emailVerification = () => {
    navigate('email-verification');
  }
  return (
    <>


      <div className="relative container-fluid bg-primary py-7 mb-5">
        <div className="container z-1">
          <div className="row justify-content-start">
            <div className="col-lg-8 text-center text-lg-start">
              <h1 className="display-1 text-uppercase text-dark mb-3">Lương Oanh BĐS</h1>
              <h1 className="text-uppercase text-white mb-3">Tạo dựng giá trị, kiến tạo tương lai.</h1>
              <p className="fs-2 text-white">
                Mua bán, ký gửi bất động sản.
                <br />
                Đất đấu giá, đất thổ cư, đất vườn 50 năm.
                <br />
                Nhận làm sổ pháp lý, check quy hoạch hiệu quả.
              </p>
              <div className="d-flex align-items-center justify-content-center justify-content-lg-start pt-5">
                <a onClick={() => { navigate('/license') }} className="btn btn-outline-light border-2 z-1">Mua ngay</a>
              </div>
            </div>
          </div>
        </div>
        <img style={{
          position: 'absolute',
          bottom: '180px',
          left: '0px',
          height: '60%',
          opacity: '0.1'
        }} src="/assets/img/LO-BDS-LIGHT.svg" alt="" />
      </div>


      <BuyComponent />
      {/* <License /> */}
      {/* <About /> */}

      <div className="container-fluid py-5">
        <div className="container">
          <div className="border-start border-5 border-primary ps-5 mb-5" style={{ maxWidth: '600px' }}>
            <h6 className="text-primary text-uppercase">Đất Đẹp Giá Tốt</h6>
            <h1 className="display-5 text-uppercase mb-0">Đất Nền Tiềm Năng</h1>
          </div>
          <div className="row g-5">
            <div className="col-lg-6">
              <div className="blog-item">
                <div className="row g-0 bg-light overflow-hidden">
                  <div className="col-12 col-sm-5 h-100">
                    <img className="img-fluid h-100" src="/assets/img/blog-1.jpg" style={{ objectFit: 'cover' }} />
                  </div>
                  <div className="col-12 col-sm-7 h-100 d-flex flex-column justify-content-center">
                    <div className="p-4">
                      <div className="d-flex mb-3">
                        <small className="me-3"><i className="bi bi-bookmarks me-2"></i>Web Design</small>
                        <small><i className="bi bi-calendar-date me-2"></i>01 Jan, 2045</small>
                      </div>
                      <h5 className="text-uppercase mb-3">Dolor sit magna rebum clita rebum dolor</h5>
                      <p>Ipsum sed lorem amet dolor amet duo ipsum amet et dolore est stet tempor eos dolor</p>
                      <a className="text-primary text-uppercase" href="">Read More<i className="bi bi-chevron-right"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="blog-item">
                <div className="row g-0 bg-light overflow-hidden">
                  <div className="col-12 col-sm-5 h-100">
                    <img className="img-fluid h-100" src="/assets/img/blog-2.jpg" style={{ objectFit: 'cover' }} />
                  </div>
                  <div className="col-12 col-sm-7 h-100 d-flex flex-column justify-content-center">
                    <div className="p-4">
                      <div className="d-flex mb-3">
                        <small className="me-3"><i className="bi bi-bookmarks me-2"></i>Web Design</small>
                        <small><i className="bi bi-calendar-date me-2"></i>01 Jan, 2045</small>
                      </div>
                      <h5 className="text-uppercase mb-3">Dolor sit magna rebum clita rebum dolor</h5>
                      <p>Ipsum sed lorem amet dolor amet duo ipsum amet et dolore est stet tempor eos dolor</p>
                      <a className="text-primary text-uppercase" href="">Read More<i className="bi bi-chevron-right"></i></a>
                    </div>
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
