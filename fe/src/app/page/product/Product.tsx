import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProductService } from "../../service/ProductService";
import { ProductModel } from "../../model/ProductModel";
import UpdateProduct from "./UpdateProduct";

const Product: React.FC = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [productData, setProductData] = useState(
    new ProductModel(
      "",
      "",
      "",
      "",
      0,
      0,
      false,
      false,
      0,
      0,
      0,
      "",
      "",
      "",
      "",
      ""
    )
  );
  // const footerContent = (
  //   <div>
  //     <button className="btn btn-danger me-3">Hủy</button>
  //     <button className="btn btn-success">Lưu</button>
  //   </div>
  // );
  useEffect(() => {
    ProductService.getInstance()
      .getListProduct()
      .then((res) => {
        setProducts(res.data.responseData);
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [openAdd]);
  const handleSave = (data: any) => {
    setProductData(data);
    ProductService.getInstance()
      .addProduct(data)
      .then((res) => {
        console.log(res);
        setOpenAdd(false);
      })
      .catch((e) => {
        console.log(e);
      });
    console.log(data);
  };
  const handleProductUpdate = (data: any) => {
    console.log("sản phẩm mới từ update Product:", data);
    setProductData(data);
  };
  const handleSelectProduct = (data: any) => {
    setProductData(data);
    setOpenUpdate(true);
  };

  return (
    <>
      <Dialog
        header="Thêm sản phẩm"
        visible={openAdd}
        style={{ width: "80vw" }}
        // footer={footerContent}
        onHide={() => {
          if (!openAdd) return;
          setOpenAdd(false);
        }}
      >
        <AddProduct onSave={handleSave} />
      </Dialog>
      <Dialog
        header="Cập nhật sản phẩm"
        visible={openUpdate}
        style={{ width: "80vw" }}
        // footer={footerContent}
        onHide={() => {
          if (!openUpdate) return;
          setOpenUpdate(false);
        }}
      >
        <UpdateProduct
          product={productData}
          onUpdateProduct={handleProductUpdate}
        />
      </Dialog>

      <div className="d-flex justify-content-between mb-3">
        <h2>Sản phẩm</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            setOpenAdd(true);
          }}
        >
          {" "}
          Thêm
        </button>
      </div>
      <div className="card">
        <DataTable
          value={products}
          paginator
          rows={5}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column
            header="STT"
            body={(rowData, options) => options.rowIndex + 1}
          ></Column>
          <Column
            field="thumbnail"
            header="Ảnh"
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="productName"
            header="Tên sản phẩm"
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="categoryId"
            header="Danh mục"
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="brandId"
            header="Thương hiệu"
            style={{ width: "25%" }}
          ></Column>
          <Column
            header="Action"
            body={(rowData) => (
              <>
                <Button
                  className="p-button-success"
                  onClick={() => {
                    handleSelectProduct(rowData);
                  }}
                >
                  Cập nhật
                </Button>
              </>
            )}
            style={{ width: "25%" }}
          ></Column>
        </DataTable>
      </div>
    </>
  );
};
export default Product;
