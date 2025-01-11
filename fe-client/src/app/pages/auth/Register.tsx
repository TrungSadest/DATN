import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie';
import { AuthConstant } from '../../constants/authConstant';
import { SignUpReq } from '../../model/SignUpReq';
import { ValidationUtil } from '../../utils/validationUtil';
import { AuthService } from '../../services/auth/AuthService';
import { HttpStatusCode } from 'axios';
import { Dialog } from 'primereact/dialog';
import { useAppDispatch } from '../../store/hook';
import { showAndHideSpinner } from '../../reducers/spinnerSlice';
import { UserRoleModel } from '../../model/UserRoleModel';
import { UserService } from '../../services/user/UserService';
import { PublicService } from '../../services/PublicService';
import { toast } from 'react-toastify';
import { Constant } from '../../constants/constant';

interface Errors {
    fullName: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    phone: string;
    referrerUid: string;
}

export default function Register() {
    const navigate = useNavigate();
    const cookie = new Cookies();
    const dispatch = useAppDispatch();
    const [openSucceed, setOpenSucceed] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [model, setModel] = useState<SignUpReq>(new SignUpReq('', '', '', '', '', '', '', null));
    const [isCooldown, setIsCooldown] = useState(false);
    const [countdown, setCountdown] = useState(Constant.COUNTDOWN_TIME); // Thời gian đếm ngược
    const [errors, setErrors] = useState<Errors>({
        fullName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        phone: '',
        referrerUid: ''
    });

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isCooldown && countdown > 0) {
            timer = setInterval(() => {
                setCountdown(prevCountdown => prevCountdown - 1);
            }, 1000);
        } else if (countdown === 0) {
            setIsCooldown(false); // Hết thời gian đếm ngược, cho phép lấy mã lại
        }

        // Dọn dẹp setInterval khi component unmount hoặc countdown thay đổi
        return () => clearInterval(timer);
    }, [isCooldown, countdown]);

    useEffect(() => {
        // console.log(errors);
        // console.log(model.password);

    }, [model.password])

    useEffect(() => {
        if (cookie.get(AuthConstant.ACCESS_TOKEN) !== undefined && cookie.get(AuthConstant.ACCESS_TOKEN) !== '') {
            navigate('/');
        }
    }, [navigate])

    const changeInput = (data: any) => {
        const { name, value } = data.target;
        // Cập nhật giá trị trong model
        setModel((prevModel) => ({
            ...prevModel,
            [name]: value,
        }));
        // Tạo đối tượng errors mới
        let newErrors: Errors = { ...errors };
        // Kiểm tra xem name có phải là khóa hợp lệ trong Errors
        if (name in newErrors) {
            // Cập nhật lỗi cho trường hợp rỗng
            newErrors[name as keyof Errors] = value.trim() === '' ? 'Không được để trống.' : '';
            // Kiểm tra lỗi cho từng trường hợp đặc biệt
            if (name === 'fullName' && !ValidationUtil.isFullName(value) && value.trim() !== '') {
                newErrors[name as keyof Errors] = 'Họ và tên không hợp lệ';
            }
            if (name === 'phone' && !ValidationUtil.isPhone(value) && value.trim() !== '') {
                newErrors[name as keyof Errors] = 'Số điện thoại không hợp lệ';
            }
            if (name === 'email' && !ValidationUtil.isEmail(value) && value.trim() !== '') {
                newErrors[name as keyof Errors] = 'Email không hợp lệ';
            }
            if (name === 'confirmPassword' && value !== model.password) {
                newErrors[name as keyof Errors] = 'Mật khẩu và xác nhận mật khẩu không trùng khớp';
            }
            if (name === 'password') {
                if (value !== model.confirmPassword && model.confirmPassword.trim() !== '') {
                    newErrors.confirmPassword = 'Mật khẩu và xác nhận mật khẩu không trùng khớp';
                } else {
                    newErrors.confirmPassword = '';
                }
            }
        }
        // Chỉ gọi setErrors một lần
        setErrors(newErrors);
    }

    const validateForm = (): boolean => {
        let newErrors: Errors = { ...errors };
        let isValid = true; // Giả sử là hợp lệ

        // Duyệt qua tất cả các trường trong model
        Object.keys(model).forEach((name) => {
            const value = model[name as keyof typeof model];

            // Kiểm tra giá trị rỗng hoặc không hợp lệ
            if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) {
                newErrors[name as keyof Errors] = 'Không được để trống.';
                isValid = false;
            } else {
                // Kiểm tra từng trường cụ thể
                switch (name) {
                    case 'fullName':
                        if (typeof value === 'string' && !ValidationUtil.isFullName(value)) {
                            newErrors[name as keyof Errors] = 'Họ và tên không hợp lệ.';
                            isValid = false;
                        }
                        break;

                    case 'phone':
                        if (typeof value === 'string' && !ValidationUtil.isPhone(value)) {
                            newErrors[name as keyof Errors] = 'Số điện thoại không hợp lệ.';
                            isValid = false;
                        }
                        break;

                    case 'email':
                        if (typeof value === 'string' && !ValidationUtil.isEmail(value)) {
                            newErrors[name as keyof Errors] = 'Email không hợp lệ.';
                            isValid = false;
                        }
                        break;

                    default:
                        break;
                }
            }
        });

        // Cập nhật state errors
        setErrors(newErrors);

        // Trả về boolean (true nếu hợp lệ, false nếu có lỗi)
        return isValid;
    };


    const handleRegister = () => {
        dispatch(showAndHideSpinner(true));
        if (!validateForm()) {
            AuthService.getInstance().register(model).then(res => {
                console.log(res);
                if (res && res.status === HttpStatusCode.Ok && res.data.status === true) {
                    setOpenSucceed(true);
                    dispatch(showAndHideSpinner(false));
                } else {
                    dispatch(showAndHideSpinner(false));
                    if (res.data.errorsMessage && res.data.errorsMessage.length > 0) {
                        const newErrors = { ...errors };

                        res.data.errorsMessage.forEach((msgCode: any) => {
                            if (msgCode === AuthConstant.PHONE_EXISTS) {
                                newErrors.phone = 'Số điện thoại đã tồn tại';
                            } else if (msgCode === AuthConstant.EMAIL_EXISTS) {
                                newErrors.email = 'Email đã tồn tại';
                            } else if (msgCode === AuthConstant.USERNAME_EXISTS) {
                                newErrors.username = 'Tên đăng nhập đã tồn tại';
                            }
                        });

                        setErrors(newErrors);
                    }
                }
            }).catch(e => {
                console.log(e);
                dispatch(showAndHideSpinner(false));
            })
        } else {
            dispatch(showAndHideSpinner(false));
        }
    }

    const changeShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const closeSucced = () => {
        setOpenSucceed(false);
        navigate('/auth/login');
    }

    const checkReferrer = () => {
        setIsCooldown(true);
        setCountdown(Constant.COUNTDOWN_TIME);
    }

    return (
        <>
            <Dialog
                header="Đăng ký thành công!"
                visible={openSucceed}
                style={{ width: '50vw' }}
                onHide={() => closeSucced()}
            >
                <div className="text-center">
                    <i className="pi pi-check-circle" style={{ fontSize: '3em', color: 'green' }}></i>
                    <h3 className="p-mt-3">Cảm ơn bạn đã đăng ký tài khoản!</h3>
                    <p>Cảm ơn bạn đã đăng ký tài khoản. Vui lòng kiểm tra hộp thư email của bạn để xác minh tài khoản.</p>
                    <p className="text-muted">Nếu không tìm thấy email trong hộp thư đến, hãy kiểm tra thư mục <strong>Spam</strong>.</p>
                    <button onClick={closeSucced} className='pointer btn btn-success'>Đồng ý</button>
                </div>
            </Dialog>
            <div className="container-fluid py-5">
                <div className="container">
                    <div className="border-start border-5 border-primary ps-5 mb-5">
                        <h6 className="text-primary text-uppercase">Bất động sản</h6>
                        <h1 className="display-5 text-uppercase mb-0">Đăng ký</h1>
                    </div>
                    <div className="d-flex justify-content-center shadow">
                        <div className="w-100 row bg-light rounded-3 px-4 py-4">
                            <div className="d-flex flex-column align-items-center col-lg-6">
                                <div className='w-100'>
                                    <label htmlFor="fullName" className="form-label fs-5">Họ và tên<span className="text-danger">*</span></label>
                                    <input
                                        onChange={changeInput}
                                        type="text"
                                        name="fullName"
                                        className={`form-control p-3 ${errors.fullName !== '' ? 'border-danger' : ''}`}
                                        placeholder="Nhập đầy đủ họ và tên"
                                    />
                                    {errors.fullName !== '' ?
                                        <p style={{ color: 'red', margin: '5px 0 0' }}>{errors.fullName}</p> :
                                        <p style={{ color: 'red', margin: '5px 0 0' }}>&nbsp;</p>
                                    }
                                </div>
                                <div className="w-100">
                                    <label htmlFor="phone" className="form-label fs-5">Số điện thoại<span className="text-danger">*</span></label>
                                    <input
                                        onChange={changeInput}
                                        type="text"
                                        name="phone"
                                        className={`form-control p-3 ${errors.phone !== '' ? 'border-danger' : ''}`}
                                        placeholder="Nhập số điện thoại hợp lệ"
                                    />
                                    {errors.phone !== '' ?
                                        <p style={{ color: 'red', margin: '5px 0 0' }}>{errors.phone}</p> :
                                        <p style={{ color: 'red', margin: '5px 0 0' }}>&nbsp;</p>
                                    }
                                </div>
                                <div className="w-100">
                                    <label htmlFor="email" className="form-label fs-5">Email<span className="text-danger">*</span></label>
                                    <input
                                        onChange={changeInput}
                                        type="email"
                                        name="email"
                                        className={`form-control p-3 ${errors.email !== '' ? 'border-danger' : ''}`}
                                        placeholder="Nhập địa chỉ email của bạn"
                                    />
                                    {errors.email !== '' ?
                                        <p style={{ color: 'red', margin: '5px 0 0' }}>{errors.email}</p> :
                                        <p style={{ color: 'red', margin: '5px 0 0' }}>&nbsp;</p>
                                    }
                                </div>
                                {/* <div className="w-100">
                                    <label htmlFor="address" className="form-label fs-5">Địa chỉ</label>
                                    <input
                                        type="text"
                                        name="address"
                                        className={`form-control p-3 ${errors.email !== '' ? 'border-danger':''}`}
                                        placeholder="Nhập địa chỉ cụ thể"
                                    />
                                </div> */}
                            </div>

                            <div className="d-flex flex-column align-items-center col-lg-6">
                                <div className="w-100">
                                    <label htmlFor="username" className="form-label fs-5">Tên đăng nhập<span className="text-danger">*</span></label>
                                    <input
                                        onChange={changeInput}
                                        type="text"
                                        name="username"
                                        className={`form-control p-3 ${errors.username !== '' ? 'border-danger' : ''}`}
                                        placeholder="Nhập tên tài khoản (tối thiểu 6 ký tự)"
                                    />
                                    {errors.username !== '' ?
                                        <p style={{ color: 'red', margin: '5px 0 0' }}>{errors.username}</p> :
                                        <p style={{ color: 'red', margin: '5px 0 0' }}>&nbsp;</p>
                                    }
                                </div>
                                <div className='w-100'>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <label htmlFor="" className="form-label fs-5">Mật khẩu<span className="text-danger">*</span></label>
                                            <div className="input-group">
                                                <input
                                                    onChange={changeInput}
                                                    type={`${showPassword ? 'text' : 'password'}`}
                                                    name="password"
                                                    className={`form-control p-3 ${errors.password !== '' ? 'border-danger' : ''}`}
                                                    placeholder="Tối thiểu 8 ký tự"
                                                />
                                                <button onClick={changeShowPassword} style={{ width: '58px' }} className="btn btn-primary">
                                                    {
                                                        showPassword ? <i className="bi bi-eye-slash-fill fs-3"></i> :
                                                            <i className="bi bi-eye-fill fs-3"></i>
                                                    }
                                                </button>
                                            </div>
                                            {errors.password !== '' ?
                                                <p style={{ color: 'red', margin: '5px 0 0' }}>{errors.password}</p> :
                                                <p style={{ color: 'red', margin: '5px 0 0' }}>&nbsp;</p>
                                            }
                                        </div>
                                        <div className="col-lg-6">
                                            <label htmlFor="" className="form-label fs-5">Xác nhận mật khẩu<span className="text-danger">*</span></label>
                                            <div className="input-group">
                                                <input
                                                    onChange={changeInput}
                                                    type={`${showPassword ? 'text' : 'password'}`}
                                                    name="confirmPassword"
                                                    className={`form-control p-3 ${errors.confirmPassword !== '' ? 'border-danger' : ''}`}
                                                    placeholder="Nhập lại mật khẩu"
                                                />
                                                <button onClick={changeShowPassword} style={{ width: '58px' }} className="btn btn-primary">
                                                    {
                                                        showPassword ? <i className="bi bi-eye-slash-fill fs-3"></i> :
                                                            <i className="bi bi-eye-fill fs-3"></i>
                                                    }
                                                </button>
                                            </div>
                                            {errors.confirmPassword !== '' ?
                                                <p style={{ color: 'red', margin: '5px 0 0' }}>{errors.confirmPassword}</p> :
                                                <p style={{ color: 'red', margin: '5px 0 0' }}>&nbsp;</p>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className='w-100'>
                                    <label htmlFor="" className="form-label fs-5">Mã người giới thiệu</label>
                                    <div className="input-group">
                                        <input
                                            onChange={changeInput}
                                            type='text'
                                            name="password"
                                            className={`form-control p-3 ${errors.password !== '' ? 'border-danger' : ''}`}
                                            placeholder="Nhập mã người giới thiệu"
                                        />
                                        <button
                                            onClick={checkReferrer}
                                            className="btn btn-primary"
                                            disabled={isCooldown}
                                        >
                                            {isCooldown ? `Chờ ${countdown}s` : 'Kiểm tra'}
                                        </button>
                                    </div>
                                    {errors.password !== '' ?
                                        <p style={{ color: 'red', margin: '5px 0 0' }}>{errors.password}</p> :
                                        <p style={{ color: 'red', margin: '5px 0 0' }}>&nbsp;</p>
                                    }
                                </div>

                            </div>
                            <div className="col-12 mt-2 text-center">
                                {/* <label htmlFor="" className="form-label fs-5">&nbsp;</label> */}
                                <button onClick={handleRegister} className="btn btn-primary w-100 py-3">Đăng ký</button>
                            </div>
                            <div className="col-12 divider w-100">
                                <div className="line line-primary"></div>
                                <div className="or border border-primary text-primary">OR</div>
                                <div className="line line-primary"></div>
                            </div>
                            <div className="col-12 mt-2 text-center">
                                <span>Bạn đã có tài khoản?</span>
                                <a onClick={() => { navigate('/auth/login') }} className='pointer fw-semibold ms-2'>Đăng nhập</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
