import { useEffect, useState } from "react";
import { ProductModel } from "../../model/ProductModel";
import { CategoryModel } from "../../model/CategoryModel";
import { AuthService } from "../../service/AuthService";
import { BrandModel } from "../../model/BrandModel";
import { ProductService } from "../../service/ProductService";

interface ProductProps {
  product: ProductModel;
  onUpdateProduct: (product: ProductModel) => void; 
}

export default function UpdateProduct({
  product,
  onUpdateProduct,
}: ProductProps) {
  const [model, setModel] = useState<ProductModel>(product);
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [brands, setBrands] = useState<BrandModel[]>([]);

  const changeIsDiscount = () => {
    setModel({
      ...model,
      isDiscount: !model.isDiscount,
    });
  };
  const changeIsSpecial = () => {
    setModel({
      ...model,
      isSpecial: !model.isSpecial,
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
  const handleUpdate = () => {
    onUpdateProduct(model);
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
  }, []);
  useEffect(() => {
    ProductService.getInstance()
      .getListBrand()
      .then((res) => {
        setBrands(res.data.responseData);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
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
                <input
                  onChange={changeInput}
                  type="text"
                  name="productName"
                  id="productName"
                  value={model.productName}
                  className="form-control"
                />
              </div>
              <div className="col-6">
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
                  {categories.map((category) => (
                    <option
                      value={category.categoryId}
                      selected={category.categoryId === model.categoryId}
                    >
                      {" "}
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-4">
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
              <div className="col-4">
                <label htmlFor="" className="form-label font-semibold">
                  Trọng lượng
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
              <div className="col-4">
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
                  {brands.map((brand) => (
                    <option
                      value={brand.brandId}
                      selected={brand.brandId === model.brandId}
                    >
                      {" "}
                      {brand.brandName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <div className="form-check form-switch mb-2">
                  <input
                    name="isSpecial"
                    onClick={() => {
                      changeIsSpecial();
                    }}
                    checked={model.isSpecial ?? false}
                    className="pointer form-check-input"
                    type="checkbox"
                  />
                  <label className="form-check-label font-semibold">
                    Sản phẩm đặc biệt
                  </label>
                </div>
                <div className="form-check form-switch">
                  <input
                    name="isDiscount"
                    onClick={() => {
                      changeIsDiscount();
                    }}
                    onChange={() => {}}
                    checked={model.isDiscount ?? false}
                    className="pointer form-check-input"
                    type="checkbox"
                  />
                  <label className="form-check-label font-semibold">
                    Khuyến mãi
                  </label>
                </div>
                {model && model.isDiscount === true && (
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
              <div className="col-8">
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
            <button className="btn btn-primary mt-5" onClick={handleUpdate}>
              Lưu
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
