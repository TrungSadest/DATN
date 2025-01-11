import { Dialog } from 'primereact/dialog';
import React, { useEffect, useRef, useState } from 'react'
import AppDialog from '../../components/commons/AppDialog';
import AgentForm from './AccountForm';
import { AccountService } from '../../services/account/AccountService';
import { UserInfoModel } from '../../model/UserInfoModel';
import { HttpStatusCode } from 'axios';
import { SearchModel } from '../../model/SearchModel';
import { Constant } from '../../constants/constant';
import Pagination from '../../components/commons/Pagination';

export default function Account() {
    const [openAdd, setOpenAdd] = useState<boolean>(false);
    const [userInfos, setUserInfos] = useState<UserInfoModel[]>([]);
    const totalElement = useRef(1);
    const [editData, setEditData] = useState<any>(null);
    const [searchModel, setSearchModel] = useState<SearchModel>(new SearchModel('', 1, Constant.ROWS_OF_PAGE));
    const [searchAction, setSearchAction] = useState<SearchModel>(new SearchModel('', 1, Constant.ROWS_OF_PAGE));

    useEffect(() => {
        AccountService.getInstance().getAllAccount(searchAction).then(res => {
            if (res && res.status === HttpStatusCode.Ok && res.data.status === true && res.data.responseData) {
                setUserInfos(res.data.responseData.allUserInfo);
                totalElement.current = res.data.responseData.count;
            }
        }).catch(e => {
            console.log(e);
        })
    }, [searchAction])

    const changeInput = (data: any) => {
        const { value, name } = data.target;
        setSearchModel({
            ...searchModel,
            [name]: value
        })
    }

    const handleSearch = () => {
        setSearchAction(searchModel);
    }

    const handlePageChange = (page: number) => {
        setSearchModel({ ...searchModel, page: page });
        setSearchAction({ ...searchAction, page: page });
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleClose = () => {
        setEditData(null);
        setOpenAdd(false);
    }

    const handleEdit = (editData: UserInfoModel) => {
        setEditData(editData);
        setOpenAdd(true);
    }

    return (
        <>
            <AppDialog onClose={handleClose} open={openAdd} title='Thêm tài khoản' style={{ width: '50%' }}>
                <AgentForm onClose={handleClose} editData={editData} />
            </AppDialog>
            <div className="container-fluid py-5">
                <div className="container">
                    <div className="border-start border-5 border-primary ps-5">
                        <h6 className="text-primary text-uppercase">Quản lý tài khoản</h6>
                        <h1 className="display-5 text-uppercase mb-0">Danh sách tài khoản</h1>
                    </div>
                    <div className='row'>
                        <div className='col-lg-4 col-12 my-3'>
                            <div className="input-group">
                                <input
                                    onChange={changeInput}
                                    value={searchModel.content}
                                    onKeyDown={handleKeyDown}
                                    type="text"
                                    name="content"
                                    className="form-control"
                                    placeholder="Nhập nội dung tìm kiếm..."
                                />
                                <button onClick={handleSearch} className="btn btn-primary">
                                    Tìm kiếm
                                </button>
                            </div>
                        </div>
                        <div className='col-lg-8 col-12 d-flex justify-content-end my-3'>
                            <button onClick={() => { setOpenAdd(true) }} className="btn btn-primary">Thêm</button>
                        </div>
                    </div>
                    <div className='table-responsive'>
                        <table className="table table-striped table-bordered">
                            <thead className="table-primary text-center">
                                <tr>
                                    <th>#</th>
                                    <th>Tên đăng nhập</th>
                                    <th>Họ tên</th>
                                    <th>Email</th>
                                    <th>Số điện thoại</th>
                                    <th>Trạng thái</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    userInfos && userInfos.length > 0 && userInfos.map((user: UserInfoModel, index: number) => {
                                        return (
                                            <tr key={index}>
                                                <td className='text-center'>{index + 1}</td>
                                                <td>{user.userId}</td>
                                                <td>{user.fullName}</td>
                                                <td>{user.email}</td>
                                                <td>{user.phone}</td>
                                                <td><span className="badge bg-success">Active</span></td>
                                                <td className='text-center'>
                                                    <button onClick={() => handleEdit(user)} className="btn btn-primary btn-sm me-2">Sửa</button>
                                                    <button className="btn btn-secondary btn-sm">Chi tiết</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="row">
                        <div className='col-12'>
                            <Pagination
                                currentPage={searchModel.page}
                                count={totalElement.current}
                                onPageChange={handlePageChange}
                                rows={searchModel.limit}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
