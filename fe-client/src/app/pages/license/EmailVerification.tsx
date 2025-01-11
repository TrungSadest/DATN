import React, { useEffect, useState } from 'react'
import { Constant } from '../../constants/constant';
import { ValidationUtil } from '../../utils/validationUtil';
import { PublicService } from '../../services/PublicService';
import { HttpStatusCode } from 'axios';
import { toast } from 'react-toastify';

interface Errors {
    email: string;
}

export default function EmailVerification() {
    const [model, setModel] = useState({
        email: '',
        verificationKey: ''
    })
    const [isCooldown, setIsCooldown] = useState(false);
    const [countdown, setCountdown] = useState(Constant.COUNTDOWN_TIME); // Thời gian đếm ngược
    const [errors, setErrors] = useState<Errors>({
        email: ''
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
        window.scrollTo(0, 0); // Cuộn lên vị trí x=0, y=0 khi component render
    }, []);

    const changeInput = (data: any) => {
        const { value, name } = data.target;
        setModel({
            ...model,
            [name]: value
        });

        let newErrors: Errors = { ...errors };
        if (name in newErrors) {
            newErrors[name as keyof Errors] = value.trim() === '' ? 'Không được để trống.' : '';
            if (name === 'email' && !ValidationUtil.isEmail(value) && value.trim() !== '') {
                newErrors[name as keyof Errors] = 'Email không hợp lệ';
            }
        }
        setErrors(newErrors);
    }

    const getVerificationKey = () => {
        console.log(model);
        if (model.email === null || model.email === '' || !ValidationUtil.isEmail(model.email)) {
            return
        }
        setIsCooldown(true);
        setCountdown(Constant.COUNTDOWN_TIME);
        // Giả sử bạn gọi API để gửi mã xác thực
        PublicService.getInstance().getVerifyCode(model.email).then(res => {
            console.log(res);
        }).catch(e => {
            console.log(e);

        })
    }

    const verifyEmail = () => {
        PublicService.getInstance().verifyEmail(model.email, model.verificationKey).then(res => {
            console.log(res);
            if (res && res.status === HttpStatusCode.Ok && res.data.status === true) {
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        }).catch(e => {
            console.log(e);
            toast.error('Lỗi hệ thống');
        })
    }

    return (
        <>
            <div className="container-fluid py-5">
                <div className="container">
                    <div className="border-start border-5 border-primary ps-5 mb-5">
                        <h6 className="text-primary text-uppercase">
                            Mua giấy phép
                        </h6>
                        <div className="display-4 text-dark mb-0">
                            <h1 className="d-flex display-4 text-dark mb-0">
                                Gói standard:
                                <div></div>
                                <small className="align-top"
                                    style={{ fontSize: '28px', lineHeight: '45px' }}> $</small>99<small
                                        className="align-bottom" style={{ fontSize: '26px', lineHeight: '40px' }}>/
                                    Mo</small>
                            </h1>
                        </div>
                    </div>
                    <div className="bg-light px-4 py-4">
                        <div className='row'>
                            {/* <h5 className="text-uppercase display-6">Newsletter</h5> */}
                            <div className='col-lg-6 mb-3'>
                                <label htmlFor="" className="form-label fs-3">Email</label>
                                <div className="input-group">
                                    <input onChange={changeInput} name='email' type="text" className="form-control p-3" placeholder="Nhập email của bạn" />
                                    {/* <button onClick={getVerificationKey} className="btn btn-primary">Lấy mã</button> */}
                                    <button
                                        onClick={getVerificationKey}
                                        className="btn btn-primary"
                                        disabled={isCooldown}
                                    >
                                        {isCooldown ? `Chờ ${countdown}s` : 'Lấy mã'}
                                    </button>
                                </div>
                                {errors.email !== '' ?
                                    <p style={{ color: 'red', margin: '5px 0 0' }}>{errors.email}</p> :
                                    <p style={{ color: 'red', margin: '5px 0 0' }}>&nbsp;</p>
                                }
                            </div>
                            <div className="col-lg-6 mb-3">
                                <label htmlFor="" className="form-label fs-3">Mã xác thực</label>
                                <input onChange={changeInput} name='verificationKey' type="email" className="form-control bg-white p-3" placeholder="Nhập mã xác thực" />
                                <p style={{ color: 'red', margin: '5px 0 0' }}>&nbsp;</p>
                            </div>
                            <div>
                                <button onClick={verifyEmail} className="btn btn-primary w-100 py-3">Xác nhận</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
