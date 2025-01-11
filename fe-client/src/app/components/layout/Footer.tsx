import React from 'react'

export default function Footer() {
    return (
        <>
            <div className="container-fluid bg-light mt-5 py-5">
                <div className="container pt-5">
                    <div className="row g-5">
                        <div className="col-lg-3 col-md-6">
                            <h5 className="text-uppercase border-start border-5 border-primary ps-3 mb-4">Get In Touch</h5>
                            <p className="mb-4">No dolore ipsum accusam no lorem. Invidunt sed clita kasd clita et et dolor sed dolor</p>
                            <p className="mb-2"><i className="bi bi-geo-alt text-primary me-2"></i>123 Street, New York, USA</p>
                            <p className="mb-2"><i className="bi bi-envelope-open text-primary me-2"></i>info@example.com</p>
                            <p className="mb-0"><i className="bi bi-telephone text-primary me-2"></i>+012 345 67890</p>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h5 className="text-uppercase border-start border-5 border-primary ps-3 mb-4">Quick Links</h5>
                            <div className="d-flex flex-column justify-content-start">
                                <a className="text-body mb-2" href="#"><i className="bi bi-arrow-right text-primary me-2"></i>Home</a>
                                <a className="text-body mb-2" href="#"><i className="bi bi-arrow-right text-primary me-2"></i>About Us</a>
                                <a className="text-body mb-2" href="#"><i className="bi bi-arrow-right text-primary me-2"></i>Our Services</a>
                                <a className="text-body mb-2" href="#"><i className="bi bi-arrow-right text-primary me-2"></i>Meet The Team</a>
                                <a className="text-body mb-2" href="#"><i className="bi bi-arrow-right text-primary me-2"></i>Latest Blog</a>
                                <a className="text-body" href="#"><i className="bi bi-arrow-right text-primary me-2"></i>Contact Us</a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h5 className="text-uppercase border-start border-5 border-primary ps-3 mb-4">Popular Links</h5>
                            <div className="d-flex flex-column justify-content-start">
                                <a className="text-body mb-2" href="#"><i className="bi bi-arrow-right text-primary me-2"></i>Home</a>
                                <a className="text-body mb-2" href="#"><i className="bi bi-arrow-right text-primary me-2"></i>About Us</a>
                                <a className="text-body mb-2" href="#"><i className="bi bi-arrow-right text-primary me-2"></i>Our Services</a>
                                <a className="text-body mb-2" href="#"><i className="bi bi-arrow-right text-primary me-2"></i>Meet The Team</a>
                                <a className="text-body mb-2" href="#"><i className="bi bi-arrow-right text-primary me-2"></i>Latest Blog</a>
                                <a className="text-body" href="#"><i className="bi bi-arrow-right text-primary me-2"></i>Contact Us</a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h5 className="text-uppercase border-start border-5 border-primary ps-3 mb-4">Newsletter</h5>
                            <form action="">
                                <div className="input-group">
                                    <input type="text" className="form-control p-3" placeholder="Your Email" />
                                    <button className="btn btn-primary">Sign Up</button>
                                </div>
                            </form>
                            <h6 className="text-uppercase mt-4 mb-3">Follow Us</h6>
                            <div className="d-flex">
                                <a className="btn btn-outline-primary btn-square me-2" href="#"><i className="bi bi-twitter"></i></a>
                                <a className="btn btn-outline-primary btn-square me-2" href="#"><i className="bi bi-facebook"></i></a>
                                <a className="btn btn-outline-primary btn-square me-2" href="#"><i className="bi bi-linkedin"></i></a>
                                <a className="btn btn-outline-primary btn-square" href="#"><i className="bi bi-instagram"></i></a>
                            </div>
                        </div>
                        <div className="col-12 text-center text-body">
                            <a className="text-body" href="">Terms & Conditions</a>
                            <span className="mx-1">|</span>
                            <a className="text-body" href="">Privacy Policy</a>
                            <span className="mx-1">|</span>
                            <a className="text-body" href="">Customer Support</a>
                            <span className="mx-1">|</span>
                            <a className="text-body" href="">Payments</a>
                            <span className="mx-1">|</span>
                            <a className="text-body" href="">Help</a>
                            <span className="mx-1">|</span>
                            <a className="text-body" href="">FAQs</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
