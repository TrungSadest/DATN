import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UploadService } from "../../service/UploadService";
import { ProductModel } from "../../model/ProductModel";
import { CategoryModel } from "../../model/CategoryModel";
import { BrandModel } from "../../model/BrandModel";
import { AuthService } from "../../service/AuthService";
import { ProductService } from "../../service/ProductService";

export default function AddProduct(props: any) {
  const [product, setProduct] = useState({
    isDiscount: false,
  });
  const [model, setModel] = useState(new ProductModel("","","","",0,0,false,false,0,0,0,"","","","",""));
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [brands, setBrands] = useState<BrandModel[]>([]);
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
    setModel({
      ...model,
      discount: !model.discount,
    });
  };
  const changeIsSpecial = () => {
    setModel({
      ...model,
      special: !model.special,
    });
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
    AuthService.getInstance()
      .getListCategory()
      .then((res) => {
        setCategories(res.data.responseData);
      })
      .catch((e) => {
        console.log(e);
      });

    ProductService.getInstance()
      .getListBrand()
      .then((res) => {
        console.log("brand");
        console.log(res);
        setBrands(res.data.responseData);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

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
        <div className="col-lg-8">
          <div>
            <h4>Thông tin sản phẩm</h4>
          </div>
          <div>
            <div className="row mb-3">
              <div className="col-lg-6">
                <label htmlFor="" className="form-label font-semibold">
                  Tên sản phẩm
                </label>
                <input
                  onChange={changeInput}
                  type="text"
                  name="productName"
                  id="productName"
                  value={model.productName}
                  className="form-control"
                />
              </div>
              <div className="col-lg-6">
                <label htmlFor="" className="form-label font-semibold">
                  Chọn danh mục
                </label>
                <select
                  onChange={changeInput}
                  name="categoryId"
                  id="categoryId"
                  className="form-select pointer"
                  aria-label="Default select example"
                >
                  <option>Open this select menu</option>
                  {categories.map((category) => (
                    <option value={category.categoryId}>
                      {" "}
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-4">
                <label htmlFor="" className="form-label font-semibold">
                  Đơn giá
                </label>
                <input
                  onChange={changeInput}
                  type="text"
                  name="unitPrice"
                  id="unitPrice"
                  value={model.unitPrice === 0 ? "" : model.unitPrice}
                  className="form-control"
                />
              </div>
              <div className="col-lg-4">
                <label htmlFor="" className="form-label font-semibold">
                  Trọng lượng <i>(gam)</i>
                </label>
                <input
                  onChange={changeInput}
                  type="text"
                  name="weight"
                  id="weight"
                  value={model.weight === 0 ? "" : model.weight}
                  className="form-control"
                />
              </div>
              <div className="col-lg-4">
                <label htmlFor="" className="form-label font-semibold">
                  Chọn nhãn hiệu
                </label>
                <select
                  onChange={changeInput}
                  name="brandId"
                  id="brandId"
                  className="form-select pointer"
                  aria-label="Default select example"
                >
                  <option>Open this select menu</option>
                  {brands.map((brand) => (
                    <option value={brand.brandId}> {brand.brandName}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <div className="form-check form-switch mb-2">
                  <input
                    onChange={() => {
                      changeIsSpecial();
                    }}
                    checked={model.special ?? false}
                    className="pointer form-check-input"
                    type="checkbox"
                  />
                  <label className="form-check-label font-semibold">
                    Sản phẩm đặc biệt
                  </label>
                </div>
                <div className="form-check form-switch">
                  <input
                    onChange={() => {
                      changeIsDiscount();
                    }}
                    checked={model.discount ?? false}
                    className="pointer form-check-input"
                    type="checkbox"
                  />
                  <label className="form-check-label font-semibold">
                    Khuyến mãi
                  </label>
                </div>
                {model && model.discount === true && (
                  <div>
                    <input
                      onChange={changeInput}
                      type="text"
                      name="discountPrice"
                      id="discountPrice"
                      value={model.discountPrice}
                      className="form-control"
                      placeholder="Nhập giá khuyến mãi"
                    />
                  </div>
                )}
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
          </div>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" onClick={saveData}>
              Lưu
            </button>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <button onClick={()=>{props.onClose()}} className="btn btn-danger me-3">Hủy</button>
        <button onClick={handleUpload} className="btn btn-success">Lưu</button>
    </div>
    </>
  );
}
