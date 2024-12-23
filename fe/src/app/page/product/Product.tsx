import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProductService } from "../../service/ProductService";
import { ProductModel } from "../../model/ProductModel";

export default function Product() {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [productData, setProductData] = useState(null);
  const footerContent = (
    <div>
      <button className="btn btn-danger me-3">Hủy</button>
      <button className="btn btn-success">Lưu</button>
    </div>
  );
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
  }, []);
  const handleSave = (data: any) => {
    setProductData(data);
    ProductService.getInstance()
    .addProduct(data)
    .then((res) => {
      console.log(res);
      setOpenAdd(false); 
    })
    .catch((e)=>{
      console.log(e);
    });
    
    console.log(data);
  };
  return (
    <>
      <Dialog
        header="Thêm sản phẩm"
        visible={openAdd}
        style={{ width: "80vw" }}
        footer={footerContent}
        onHide={() => {
          if (!openAdd) return;
          setOpenAdd(false);
        }}
      >
        <AddProduct onSave={handleSave} />
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
            field="productId"
            header="ID"
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="productName"
            header="Name"
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="categoryId"
            header="category"
            style={{ width: "25%" }}
          ></Column>
          <Column
            header="Action"
            body={(rowData) => (
              <>
                <Button className="p-button-success" onClick={() => {}}>
                  Cập nhật
                </Button>
                <Button className="p-button-danger">delete</Button>
              </>
            )}
            style={{ width: "25%" }}
          ></Column>
        </DataTable>
      </div>
    </>
  );
}
