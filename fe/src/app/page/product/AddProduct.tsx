import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UploadService } from "../../service/UploadService";

export default function AddProduct({onClose}: any) {
  const [product, setProduct] = useState({
    isDiscount: false,
  });
  const [image, setImage] = useState<string | null>(null); // Lưu URL của ảnh
  const [file, setFile] = useState<File | null>(null); // Lưu file ảnh

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      const imageUrl = URL.createObjectURL(selectedFile); // Tạo URL để hiển thị ảnh
      setImage(imageUrl);
      setFile(selectedFile); // Lưu file ảnh
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setFile(null); // Xóa file ảnh
  };
  const changeIsDiscount = () => {
    setProduct({
      ...product,
      isDiscount: !product.isDiscount,
    });
  };

  const handleUpload = ()=>{
    if (!file) {
      toast.warn("Vui lòng chọn một ảnh.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    UploadService.getInstance().uploadImage(formData).then(res=>{
      console.log(res);
    }).catch(e=>{
      console.log(e);
    })
  }

  return (
    <>
      <div className="row">
        {/* <div className="col-4 d-flex flex-column align-items-center justify-content-center">
          <h4>Ảnh sản phẩm</h4>
          <div
            style={{ height: "300px", width: "300px" }}
            className="bg-primary"
          >
          </div>
        </div> */}
        <div className="col-4 d-flex flex-column align-items-center justify-content-center">
          <h4>Ảnh sản phẩm</h4>
          <div
            style={{
              height: "300px",
              width: "300px",
              border: "1px dashed #d3d3d3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              borderRadius: "8px",
              position: "relative",
            }}
          >
            {image ? (
              <img
                src={image}
                alt="Ảnh sản phẩm"
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
              />
            ) : (
              <span style={{ color: "#d3d3d3" }}>Chưa có ảnh</span>
            )}
          </div>

          <div className="mt-2">
            {!image ? (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "block" }}
              />
            ) : (
              <button
                onClick={handleRemoveImage}
                className="btn btn-danger"
                style={{ marginTop: "10px" }}
              >
                Xóa ảnh
              </button>
            )}
          </div>
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
                  <label className="form-check-label font-semibold">
                    Sản phẩm đặc biệt
                  </label>
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
                  <label className="form-check-label font-semibold">
                    Khuyến mãi
                  </label>
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
      <div className="d-flex justify-content-end">
        <button onClick={()=>{onClose()}} className="btn btn-danger me-3">Hủy</button>
        <button onClick={handleUpload} className="btn btn-success">Lưu</button>
    </div>
    </>
  );
}
