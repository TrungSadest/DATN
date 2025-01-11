import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useAppDispatch } from '../../store/hook';
import { SignUpReq } from '../../model/SignUpReq';
import { AuthConstant } from '../../constants/authConstant';
import { ValidationUtil } from '../../utils/validationUtil';
import { showAndHideSpinner } from '../../reducers/spinnerSlice';
import { AuthService } from '../../services/auth/AuthService';
import { HttpStatusCode } from 'axios';
import { RoleService } from '../../services/role/RoleService';
import { RoleModel } from '../../model/RoleModel';
import { toast } from 'react-toastify';
import { PublicService } from '../../services/PublicService';
import { TccoStdModel } from '../../model/TccoStdModel';
import { UserInfoModel } from '../../model/UserInfoModel';

interface Errors {
    fullName: string;
    email: string;
    username: string;
    password: string;
    // confirmPassword: string;
    phone: string;
}

export default function AccountForm({ onClose, editData }: any) {
    const navigate = useNavigate();
    const cookie = new Cookies();
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState<UserInfoModel>();
    const [showPassword, setShowPassword] = useState(false);
    const [roles, setRoles] = useState<RoleModel[]>([]);
    const [userStatus, setUserStatus] = useState<TccoStdModel[]>([])
    const [model, setModel] = useState<SignUpReq>(new SignUpReq('', '', '', '', '', '', '', AuthConstant.ACTIVED));
    const [errors, setErrors] = useState<Errors>({
        fullName: '',
        email: '',
        username: '',
        password: '',
        // confirmPassword: '',
        phone: ''
    });

    useEffect(() => {
        if (editData) {
            setFormData(editData);
            setModel({
                ...model,
                fullName: editData.fullName,
                phone: editData.phone,
                email: editData.email,
                username: editData.userId,
            })
        }
    }, [editData]);

    useEffect(() => {
        getRoles();
        getCommCode();
    }, [])

    const getRoles = () => {
        RoleService.getInstance().getAllRoles().then(res => {
            if (res && res.status === HttpStatusCode.Ok && res.data.status === true && res.data.responseData) {
                setRoles(res.data.responseData);
            }
        }).catch(e => {
            console.log(e);
        })
    }

    const getCommCode = () => {
        PublicService.getInstance().getCommCode('02').then(res => {
            if (res && res.status === HttpStatusCode.Ok && res.data.status === true && res.data.responseData) {
                setUserStatus(res.data.responseData);
            }
        }).catch(e => {
            console.log(e);
        })
    }

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
                            console.log('fullName');
                            newErrors[name as keyof Errors] = 'Họ và tên không hợp lệ.';
                            isValid = false;
                        }
                        break;

                    case 'phone':
                        if (typeof value === 'string' && !ValidationUtil.isPhone(value)) {
                            console.log('phone');
                            newErrors[name as keyof Errors] = 'Số điện thoại không hợp lệ.';
                            isValid = false;
                        }
                        break;

                    case 'email':
                        if (typeof value === 'string' && !ValidationUtil.isEmail(value)) {
                            console.log('email');
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


    const handleCreate = () => {
        dispatch(showAndHideSpinner(true));
        if (!validateForm()) {
            AuthService.getInstance().register(model).then(res => {
                console.log(res);
                if (res && res.status === HttpStatusCode.Ok && res.data.status === true) {
                    toast.success('Tạo tài khoản thành công');
                    onClose();
                } else {
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

            }).finally(() => {
                dispatch(showAndHideSpinner(false));
            })
        } else {
            dispatch(showAndHideSpinner(false));
        }
    }

    const changeShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedStatus = event.target.value;
        setModel((prevModel) => ({
            ...prevModel,
            status: selectedStatus,
        }));
    };
    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="w-100 row">
                    <div className="d-flex flex-column align-items-center col-lg-6">
                        <div className='w-100'>
                            <label htmlFor="fullName" className="form-label fs-5">Họ và tên<span className="text-danger">*</span></label>
                            <input
                                onChange={changeInput}
                                value={model.fullName}
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
                                value={model.phone}
                                type="text"
                                name="phone"
                                disabled={!!editData}
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
                                value={model.email}
                                type="email"
                                name="email"
                                disabled={!!editData}
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
                                value={model.username}
                                type="text"
                                name="username"
                                disabled={!!editData}
                                className={`form-control p-3 ${errors.username !== '' ? 'border-danger' : ''}`}
                                placeholder="Nhập tên tài khoản (tối thiểu 6 ký tự)"
                            />
                            {errors.username !== '' ?
                                <p style={{ color: 'red', margin: '5px 0 0' }}>{errors.username}</p> :
                                <p style={{ color: 'red', margin: '5px 0 0' }}>&nbsp;</p>
                            }
                        </div>
                        <div className='w-100'>
                            <label htmlFor="" className="form-label fs-5">Mật khẩu<span className="text-danger">*</span></label>
                            <div className="input-group">
                                <input
                                    onChange={changeInput}
                                    type={`${showPassword ? 'text' : 'password'}`}
                                    name="password"
                                    className={`form-control p-3 ${errors.password !== '' ? 'border-danger' : ''}`}
                                    placeholder="Mật khẩu của bạn (tối thiểu 8 ký tự)"
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
                        <div className="w-100 row">
                            <label htmlFor="username" className="form-label fs-5">Trạng thái</label>
                            <div className="row">
                                {
                                    userStatus && userStatus.length > 0 && userStatus.map((tcco: TccoStdModel, index: number) => {
                                        console.log(tcco);
                                        return (
                                            <div key={index} className="form-check col-6">
                                                <input onChange={handleStatusChange} value={tcco.commCd ?? ''} checked={tcco.commCd === model.status} className="pointer form-check-input" type="radio" name="status" id="status" />
                                                <label className="form-check-label">
                                                    {tcco.commNm}
                                                </label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            {/* <div className="col-6">
                                <label htmlFor="username" className="form-label fs-5">Vai trò</label>
                                {
                                    roles && roles.length > 0 && roles.map((role: RoleModel, index: number) => (
                                        <div key={index} className="form-check">
                                            <input onChange={handleRoleChange} checked={role.roleId === model.role?.roleId} value={role.roleId} className="pointer form-check-input" type="radio" name="role" id="role" />
                                            <label className="form-check-label">
                                                {role.roleNm}
                                            </label>
                                        </div>
                                    ))
                                }
                            </div> */}
                        </div>
                    </div>
                    <div className="col-12 mt-2 text-center">
                        {/* <label htmlFor="" className="form-label fs-5">&nbsp;</label> */}
                        <button onClick={handleCreate} className="btn btn-primary w-100 py-3 text-uppercase">Lưu thông tin</button>
                    </div>
                </div>
            </div>
        </>
    )
}
