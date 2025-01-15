import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { getUserInfo } from '../../reducers/userSlice';
import Cookies from 'universal-cookie';
import { AuthConstant } from '../../constants/authConstant';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const cookie = new Cookies();
    const dispatch = useAppDispatch();
    const [openMng, setOpenMng] = useState(false);
    const [openCart, setOpenCart] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const url = location.pathname;
    const arrUrl = url.split("/");
    const [isCollapseOpen, setCollapseOpen] = useState(false);
    const carts = JSON.parse(localStorage.getItem("cart") || "[]");

    useEffect(() => {
        dispatch(getUserInfo());
        if (cookie.get(AuthConstant.ACCESS_TOKEN) !== undefined && cookie.get(AuthConstant.ACCESS_TOKEN) !== '') {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, [navigate])

    const checkActive = (url: string) => {
        for (let i = 1; i <= arrUrl.length; i++) {
            if (arrUrl[i] == url) {
                return true;
            }
        }
        return false;
    }

    const handleLogout = () => {
        cookie.remove(AuthConstant.ACCESS_TOKEN);
        navigate('/');
        window.location.reload();
    }

    const handleMenuClick = (path: any) => {
        setOpenMng(false);
        setOpenCart(false);
        navigate(path); // Điều hướng đến path
        setCollapseOpen(false); // Đóng collapse
    };

    const toggleMng = () => {
        setOpenMng(!openMng);
        setOpenCart(false);
    }

    const toggleCart = () => {
        setOpenCart(!openCart);
        setOpenMng(false);
    }

    return (
        <>
            <nav className="z-999 navbar navbar-expand-lg bg-white navbar-light py-lg-0 px-lg-0 text-center shadow-sm">
                <div className='container-fluid'>
                    <div className='d-flex'>
                        <a onClick={() => { handleMenuClick('/dashboard') }} className="pointer d-flex align-content-center navbar-brand ms-lg-5">
                            <img style={{ width: '50px' }} src="/assets/img/favicon.ico" alt="" />
                            <span className="fw-bold d-none d-lg-block py-2" style={{ color: '#EF8121', fontWeight: 'bold' }}>Heaven</span>
                            <span style={{ fontWeight: 'bold' }} className="fw-bold d-none d-lg-block py-2">Shop</span>
                        </a>
                        {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button> */}
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded={isCollapseOpen} aria-label="Toggle navigation" onClick={() => setCollapseOpen(!isCollapseOpen)}>
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className={`collapse navbar-collapse ${isCollapseOpen ? 'show' : ''}`} id="navbarCollapse">
                            <div className="navbar-nav ms-auto py-0">
                                <a onClick={() => { handleMenuClick('/dashboard') }} className={`pointer nav-item nav-link ${checkActive('dashboard') ? 'active' : ''}`}>Trang chủ</a>
                                <a onClick={() => { handleMenuClick('/product') }} className={`pointer nav-item nav-link ${checkActive('product') ? 'active' : ''}`}>Sản phẩm</a>
                                <a className='pointer nav-item nav-link'>Thông tin</a>
                                <div className="nav-item dropdown">
                                    <a onClick={toggleMng} className={`pointer nav-link dropdown-toggle ${checkActive('mng') ? 'active' : ''}`}>Quản lý</a>
                                    {
                                        openMng && (
                                            <div className="dropdown-menu w-50 mx-auto text-center show">
                                                <a onClick={() => { handleMenuClick('/mng/account') }} className="pointer dropdown-item">Tài khoản</a>
                                                <a onClick={() => { handleMenuClick('/mng/license-mng') }} className="pointer dropdown-item">Giấy phép</a>
                                                <a onClick={() => { handleMenuClick('/mng/license-mng') }} className="pointer dropdown-item">Thống kê</a>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="nav-item">
                        <a onClick={() => { handleMenuClick('/cart') }} className="cart-icon pointer">
                            <i className="bi bi-cart"></i>
                            <span className="cart-count">{carts.length}</span>
                        </a>
                    </div>

                </div>
            </nav >
        </>
    )
}
