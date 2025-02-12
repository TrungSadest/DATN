import React from 'react'

export default function LicenseHistory() {
    return (
        <>
            <div className="container-fluid py-5">
                <div className="container">
                    <div className="border-start border-5 border-primary ps-5 mb-5">
                        <h6 className="text-primary text-uppercase">Lịch sử mua hàng</h6>
                        <h1 className="display-5 text-uppercase mb-0">Danh sách giấy phép</h1>
                    </div>
                    <table className="table table-bordered table-hover">
                        <thead className="table-primary text-center">
                            <tr>
                                <th>#</th>
                                <th>Tên License</th>
                                <th>Loại License</th>
                                <th>Ngày cấp</th>
                                <th>Ngày hết hạn</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>X-DAS Basic</td>
                                <td>Cá nhân</td>
                                <td className='text-center'>2024-01-01</td>
                                <td className='text-center'>2025-01-01</td>
                                <td><span className="badge bg-success">Còn hiệu lực</span></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>X-DAS Pro</td>
                                <td>Doanh nghiệp</td>
                                <td className='text-center'>2023-12-01</td>
                                <td className='text-center'>2024-12-01</td>
                                <td><span className="badge bg-danger">Hết hạn</span></td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>X-DAS Enterprise</td>
                                <td>Doanh nghiệp</td>
                                <td className='text-center'>2024-02-15</td>
                                <td className='text-center'>2025-02-15</td>
                                <td><span className="badge bg-warning">Sắp hết hạn</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
