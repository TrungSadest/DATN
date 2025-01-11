import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AuthService } from '../../services/auth/AuthService';
import { HttpStatusCode } from 'axios';
import { Constant } from '../../constants/constant';

export default function VerifyAccount() {
    const navigate = useNavigate();
    const [result, setResult] = useState('');
    const { verifyKey } = useParams();

    useEffect(() => {
        console.log(result);
    }, [result])

    useEffect(() => {
        if (verifyKey) {
            AuthService.getInstance().verifyAccount(verifyKey).then(res => {
                if (res && res.status === HttpStatusCode.Ok && res.data.msgCode) {
                    setResult(res.data.msgCode);
                }
            }).catch(e => {
                setResult(Constant.SYSTEM_ERROR);
            })
        }
    }, [verifyKey])

    return (
        <>
            <div className="container-fluid py-5 row">
                <div className="container col-6">
                    {
                        result != '' && result === Constant.VERIFY_ACCOUNT_SUCCESS &&
                        <div className="card rounded-3 shadow-lg p-4">
                            <div className="card-body">
                                <h1 className="text-success display-4"><i className="bi bi-check-circle-fill"></i> Thành công!</h1>
                                <p className="fs-5 mt-3">Email của bạn đã được xác minh thành công. Bây giờ bạn có thể sử dụng đầy đủ các tính năng của hệ thống.</p>
                                <a onClick={() => { navigate('/auth/login') }} className="pointer btn btn-primary btn-lg mt-4">Đăng nhập ngay</a>
                            </div>
                        </div>
                    }
                    {/* <!-- Thông báo mã xác minh không tồn tại --> */}
                    {
                        result !== '' && result === Constant.VERIFY_CODE_NOT_EXISTS &&
                        <div className="alert alert-danger shadow-lg" role="alert">
                            <h1 className="text-danger display-5"><i className="bi bi-exclamation-triangle-fill"></i> Lỗi!</h1>
                            <p className="fs-5 mt-3">Mã xác minh không tồn tại. Vui lòng kiểm tra lại đường dẫn hoặc đăng ký tải khoản mới.</p>
                            <a onClick={() => { navigate('/auth/register') }} className="pointer btn btn-primary mt-3">Đăng ký lại</a>
                        </div>
                    }
                    {/* <!-- Thông báo mã xác minh đã hết hạn --> */}
                    {
                        result !== '' && result === Constant.VERIFY_CODE_EXPIRED &&
                        <div className="alert alert-warning shadow-lg" role="alert">
                            <h1 className="text-warning display-5"><i className="bi bi-clock-fill"></i> Mã hết hạn!</h1>
                            <p className="fs-5 mt-3">Mã xác minh của bạn đã hết hạn. Vui lòng thực hiện lại chức năng đăng ký.</p>
                            <a onClick={() => { navigate('/auth/register') }} className="pointer btn btn-primary mt-3">Đăng ký lại</a>
                        </div>
                    }
                    {
                        result !== '' && result === Constant.SYSTEM_ERROR &&
                        <div className="alert alert-danger shadow-lg p-4" role="alert">
                            <h1 className="text-danger display-5"><i className="bi bi-x-circle-fill"></i> Lỗi hệ thống</h1>
                            <p className="fs-5 mt-3">Xin lỗi, đã xảy ra lỗi hệ thống. Vui lòng thử lại sau.</p>
                            <button className="btn btn-secondary btn-lg mt-4" onClick={() => { window.location.reload() }}>Thử lại</button>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
