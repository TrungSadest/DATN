import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginReq } from '../../model/LoginReq';
import { AuthService } from '../../services/auth/AuthService';
import { Constant } from '../../constants/constant';
import { HttpStatusCode } from 'axios';
import { AuthConstant } from '../../constants/authConstant';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../store/hook';
import { showAndHideSpinner } from '../../reducers/spinnerSlice';

export default function Login() {
    const cookie = new Cookies();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [model, setModel] = useState(new LoginReq('', '', false));
    const [errors, setErrors] = useState({
        username: '',
        password: '',
    });

    useEffect(() => {
        if (cookie.get(AuthConstant.ACCESS_TOKEN) !== undefined && cookie.get(AuthConstant.ACCESS_TOKEN) !== '') {
            navigate('/');
        }
    }, [navigate])

    const changeInput = (data: any) => {
        const { name, value } = data.target;
        setModel({
            ...model,
            [name]: value,
        });

        setErrors({
            ...errors,
            [name]: value.trim() === '' ? 'Không được để trống.' : ''
        });
    };

    const validate = (): boolean => {
        const newErrors = { username: '', password: '' };
        let isValid = true;

        if (model.username.trim() === '') {
            newErrors.username = 'Không được để trống.';
            isValid = false;
        }

        if (model.password.trim() === '') {
            newErrors.password = 'Không được để trống.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleLogin = () => {
        dispatch(showAndHideSpinner(true));
        if (validate()) {
            AuthService.getInstance().login(model).then(res => {
                if (res && res.status === HttpStatusCode.Ok && res.data.status === Constant.OK && res.data.responseData) {
                    const expires = new Date();
                    expires.setDate(expires.getDate() + AuthConstant.EXPIRES_TOKEN)
                    cookie.remove(AuthConstant.ACCESS_TOKEN);
                    cookie.remove(AuthConstant.PUBLIC_KEY);
                    cookie.set(AuthConstant.ACCESS_TOKEN, res.data.responseData, { path: '/', expires: expires });
                    toast.success('Đăng nhập thành công');
                    navigate('/dashboard');
                } else {
                    if (res.data.message) {
                        if (res.data.message === AuthConstant.USER_NOT_ACTIVE) {
                            toast.warn('Tài khoản chưa được kích hoạt. Vui lòng kiểm tra mail của bạn để kích hoạt');
                        }
                        if (res.data.message === AuthConstant.USER_WRONG_LOGIN) {
                            toast.warn('Sai tên đăng nhập hoặc mật khẩu');
                        }
                    }
                }
            }).catch(e => {
                toast.error('Lỗi hệ thống')
            }).finally(() => {
                dispatch(showAndHideSpinner(false));
            })
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // Kiểm tra nếu người dùng nhấn phím Enter
        if (e.key === 'Enter') {
            handleLogin(); // Gọi hàm đăng nhập
        }
    };

    return (
        <>
            <div className="container-fluid py-5">
                <div className="container">
                    <div className="border-start border-5 border-primary ps-5 mb-5">
                        <h6 className="text-primary text-uppercase">Bất động sản</h6>
                        <h1 className="display-5 text-uppercase mb-0">Đăng nhập</h1>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="d-flex flex-column shadow align-items-center bg-light px-4 py-4 col-12 col-lg-8 col-xl-7 col-xxl-5 rounded-3">
                            <div className='mb-3 w-100'>
                                <label htmlFor="" className="form-label fs-3">Tài khoản</label>
                                <input onChange={changeInput} onKeyDown={handleKeyPress} type="text" name='username' className="form-control p-3" placeholder="Nhập tài khoản của bạn" />
                                {errors.username && <p style={{ color: 'red', margin: '5px 0 0' }}>{errors.username}</p>}
                            </div>
                            <div className="mb-4 w-100">
                                <label htmlFor="" className="form-label fs-3">Mật khẩu</label>
                                <input onChange={changeInput} onKeyDown={handleKeyPress} type="password" name='password' className="form-control bg-white p-3" placeholder="Nhập mật khẩu" />
                                {errors.password && <p style={{ color: 'red', margin: '5px 0 0' }}>{errors.password}</p>}
                            </div>
                            {/* <div className="w-100 mb-3">
                                <input className="form-check-input me-2 pointer" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label">
                                    Ghi nhớ tài khoản
                                </label>
                            </div> */}
                            <div className='w-100 mb-2'>
                                <button onClick={handleLogin} className="btn btn-primary w-100 py-3">Đăng nhập</button>
                            </div>
                            <div className='text-end w-100'>
                                <a className='pointer link-primary fw-semibold'>Quên mật khẩu?</a>
                            </div>
                            <div className="divider w-100">
                                <div className="line line-primary"></div>
                                <div className="or border border-primary text-primary">OR</div>
                                <div className="line line-primary"></div>
                            </div>
                            <div className="d-flex mb-3">
                                <a className="btn btn-outline-primary btn-square me-4 text-google rounded-circle" href="#"><i className="bi bi-google"></i></a>
                                <a className="btn btn-outline-primary btn-square me-4 text-facebook rounded-circle" href="#"><i className="bi bi-facebook"></i></a>
                                <a className="btn btn-outline-primary btn-square text-linkedin rounded-circle" href="#"><i className="bi bi-linkedin"></i></a>
                            </div>
                            <div>
                                <span>Bạn chưa có tài khoản?</span>
                                <a onClick={() => { navigate('/auth/register') }} className='pointer fw-semibold ms-2'>Đăng ký</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
