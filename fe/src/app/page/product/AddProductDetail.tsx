import React, { useEffect, useState } from "react";
import { ProductDetailModel } from "../../model/ProductDetailModel";
import { ColorModel } from "../../model/ColorModel";
import { SizeModel } from "../../model/SizeModel";
import { UploadService } from "../../service/UploadService";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import { ProductService } from "../../service/ProductService";
import { generateImageUrl } from "../../util/imageUtil";

export default function AddProductDetail(props: any) {
  const [model, setModel] = useState(
    new ProductDetailModel("", "", 0, 0, 0, "", "")
  );
  const [colors, setColors] = useState<ColorModel[]>([]);
  const [sizes, setSizes] = useState<SizeModel[]>([]);
  const [image, setImage] = useState<string | null>(null); // Lưu URL của ảnh
  const [file, setFile] = useState<File | null>(null); // Lưu file ảnh

  useEffect(() => {
    if (file != null) {
      handleUpload();
    }
  }, [file]);

  useEffect(() => {
    setModel({
      ...model,
      imageUrl: image ?? "",
    });
  }, [image]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile); // Lưu file ảnh
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setFile(null); // Xóa file ảnh
  };

  const changeInput = (data: any) => {
    const value = data.target.value;
    const name = data.target.name;
    setModel({
      ...model,
      [name]: value,
    });
  };

  const saveData = () => {
    props.onSave(model);
  };

  useEffect(() => {
    ProductService.getInstance()
      .getListColor()
      .then((res) => {
        setColors(res.data.responseData);
      })
      .catch((e) => {
        console.log(e);
      });

    ProductService.getInstance()
      .getListSize()
      .then((res) => {
        console.log(res);
        setSizes(res.data.responseData);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleUpload = () => {
    if (!file) {
      toast.warn("Vui lòng chọn một ảnh.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    UploadService.getInstance()
      .uploadImage(formData)
      .then((res) => {
        console.log(res.data);
        if (res && res.status === HttpStatusCode.Ok && res.data.responseData) {
          if (res.data.responseData.length > 0) {
            setImage(res.data.responseData[0]);
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <div className="row">
        <div className="col-lg-4 d-flex flex-column align-items-center justify-content-center">
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
                src={generateImageUrl(image)}
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
        <div className="col-lg-8">
          <div>
            <h4>Thông tin sản phẩm chi tiết</h4>
          </div>
          <div>
            <div className="row mb-3">
              <div className="col-lg-6">
                <label htmlFor="" className="form-label font-semibold">
                  Chọn Màu sắc
                </label>
                <select
                  onChange={changeInput}
                  name="colorId"
                  id="colorId"
                  className="form-select pointer"
                  aria-label="Default select example"
                >
                  {colors.map((color) => (
                    <option value={color.colorId}> {color.colorName}</option>
                  ))}
                </select>
              </div>
              <div className="col-lg-6">
                <label htmlFor="" className="form-label font-semibold">
                  Chọn Kích thước
                </label>
                <select
                  onChange={changeInput}
                  name="sizeId"
                  id="sizeId"
                  className="form-select pointer"
                  aria-label="Default select example"
                >
                  {sizes.map((size) => (
                    <option value={size.sizeId}> {size.sizeName}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-4">
                <label htmlFor="" className="form-label font-semibold">
                  Số lượng
                </label>
                <input
                  onChange={changeInput}
                  type="text"
                  name="quantity"
                  id="quantity"
                  value={model.quantity === 0 ? "" : model.quantity}
                  className="form-control"
                />
              </div>
              <div className="col-lg-8">
                <div>
                  <label htmlFor="" className="form-label font-semibold">
                    Mô tả sản phẩm
                  </label>
                  <textarea
                    onChange={changeInput}
                    name="description"
                    value={model.description}
                    className="form-control"
                    id="description"
                    style={{ height: "100px" }}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="row"></div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <button
          onClick={() => {
            props.onClose();
          }}
          className="btn btn-danger me-3"
        >
          Hủy
        </button>
        <button onClick={saveData} className="btn btn-success">
          Lưu
        </button>
      </div>
    </>
  );
}
