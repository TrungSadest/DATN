import React from 'react'

export default function LicenseMng() {
    return (
        <>
            <div className="container-fluid py-5">
                <div className="container">
                    <div className="border-start border-5 border-primary ps-5">
                        <h6 className="text-primary text-uppercase">Quản lý giấy phép</h6>
                        <h1 className="display-5 text-uppercase mb-0">Danh sách giấy phép</h1>
                    </div>
                    <div className='d-flex justify-content-end'>
                        <button className="btn btn-primary">Thêm</button>
                    </div>
                    <table className="table table-bordered">
                        <thead className="table-primary text-center">
                            <tr>
                                <th>#</th>
                                <th>Mã License</th>
                                <th>Ngày cấp</th>
                                <th>Ngày hết hạn</th>
                                <th>Trạng thái</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>X-DAS Basic</td>
                                <td className='text-center'>2024-01-01</td>
                                <td className='text-center'>2025-01-01</td>
                                <td><span className="badge bg-success">Còn hiệu lực</span></td>
                                <td>Cá nhân</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>X-DAS Pro</td>
                                <td className='text-center'>2023-12-01</td>
                                <td className='text-center'>2024-12-01</td>
                                <td><span className="badge bg-danger">Hết hạn</span></td>
                                <td>
                                    Doanh nghiệp
                                    {/* <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                        <label className="form-check-label">Toggle Switch</label>
                                    </div> */}
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>X-DAS Enterprise</td>
                                <td className='text-center'>2024-02-15</td>
                                <td className='text-center'>2025-02-15</td>
                                <td><span className="badge bg-warning">Sắp hết hạn</span></td>
                                <td>
                                    <button className="btn btn-warning">
                                        <i className='bi bi-pencil-square'></i> Sửa
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
