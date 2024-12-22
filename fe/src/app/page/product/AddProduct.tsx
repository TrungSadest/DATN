import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [product, setProduct] = useState({
    isDiscount: false,
  });
  const changeIsDiscount = () => {
    setProduct({
      ...product,
      isDiscount: !product.isDiscount,
    });
  };

  return (
    <>
      <div className="row">
        <div className="col-4 d-flex flex-column align-items-center justify-content-center">
          <h4>Ảnh sản phẩm</h4>
          <div
            style={{ height: "300px", width: "300px" }}
            className="bg-primary"
          ></div>
        </div>
        <div className="col-8">
          <div>
            <h4>Thông tin sản phẩm</h4>
          </div>
          <div>
            <div className="row mb-3">
              <div className="col-6">
                <label htmlFor="" className="form-label font-semibold">
                  Tên sản phẩm
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-6">
                <label htmlFor="" className="form-label font-semibold">
                  Chọn danh mục
                </label>
                <select
                  className="form-select pointer"
                  aria-label="Default select example"
                >
                  <option selected>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-4">
                <label htmlFor="" className="form-label font-semibold">
                  Đơn giá
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-4">
                <label htmlFor="" className="form-label font-semibold">
                  Trọng lượng
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-4">
                <label htmlFor="" className="form-label font-semibold">
                  Chọn nhãn hiệu
                </label>
                <select
                  className="form-select pointer"
                  aria-label="Default select example"
                >
                  <option selected>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <div className="form-check form-switch mb-2">
                  <input className="pointer form-check-input" type="checkbox" />
                  <label className="form-check-label font-semibold">Sản phẩm đặc biệt</label>
                </div>
                <div className="form-check form-switch">
                  <input
                    onClick={() => {
                      changeIsDiscount();
                    }}
                    onChange={() => {}}
                    checked={product.isDiscount ?? false}
                    className="pointer form-check-input"
                    type="checkbox"
                  />
                  <label className="form-check-label font-semibold">Khuyến mãi</label>
                </div>
                {product && product.isDiscount === true && (
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nhập giá khuyến mãi"
                    />
                  </div>
                )}
              </div>
              <div className="col-8">
                <div>
                  <label htmlFor="" className="form-label font-semibold">
                    Mô tả sản phẩm
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    style={{ height: "100px" }}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
