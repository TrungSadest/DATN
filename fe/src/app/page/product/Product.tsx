import { Dialog } from "primereact/dialog";
import { useState } from "react";
import AddProduct from "./AddProduct";
import { Button } from "primereact/button";

export default function Product() {
  const [openAdd, setOpenAdd] = useState(false);

const handleClose = (data?: any)=>{
  setOpenAdd(false);
  if (data) {
    // Thực hiện việc tiếp
  }
}

  return (
    <>
      <Dialog
        header="Thêm sản phẩm"
        visible={openAdd}
        style={{ width: "80vw" }}
        onHide={() => {
          if (!openAdd) return;
          setOpenAdd(false);
        }}
      >

        <AddProduct onClose={handleClose} />

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
