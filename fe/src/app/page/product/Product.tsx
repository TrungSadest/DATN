import { Dialog } from "primereact/dialog";
import { useState } from "react";
import AddProduct from "./AddProduct";
import { Button } from "primereact/button";

export default function Product() {
  const [openAdd, setOpenAdd] = useState(false);
  const footerContent = (
    <div>
        <button className="btn btn-danger me-3">Hủy</button>
        <button className="btn btn-success">Lưu</button>
    </div>
);

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

        <AddProduct/>

      </Dialog>

      <div className="d-flex justify-content-between mb-3">
        <h2>Sản phẩm</h2>
        <button className="btn btn-primary" onClick={() => {setOpenAdd(true)}}>
          {" "}
          Thêm
        </button>
      </div>
      <div className="card"></div>
    </>
  );
}
