import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { AuthService } from "../../service/AuthService";
import { CategoryModel } from "../../model/CategoryModel";
import { Dialog } from "primereact/dialog";
import { toast } from "react-toastify";

export default function Category() {
  const [visible, setVisible] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [model, setModel] = useState(
      new CategoryModel("", "", true)
    );
  useEffect(() => {
    AuthService.getInstance()
      .getListCategory()
      .then((res) => {
        setCategories(res.data.responseData);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [visible]);
  const changeInput = (data: any) => {
   const value = data.target.value;
   const name = data.target.name;
   setModel({
     ...model,
     [name]: value,
   });
 };
  const add = () => {  
   AuthService.getInstance().addCategory(model).then((res)=>{
      if (res.data.status){
         toast.success("Thêm thành công");
         setModel(new CategoryModel("", "", true))
      }
      else{
         toast.error("Danh mục đã tồn tại")
      }     
      }).catch((e) => {
      console.log(e);
      });
      setVisible(false);
  };
  return (
    <>
      <Dialog
        header="Header"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <label className="form-label">Tên Danh Mục</label>
        <input
          onChange={changeInput}
          type="text"
          name="categoryName"
          className="form-control"
          id="categoryName"
        />
        <button className="btn btn-primary justify-content-center" onClick={add}>Thêm</button>
      </Dialog>
      <div className="d-flex justify-content-between mb-3">
        <h2>Danh Mục</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            setVisible(true);
          }}
        >
          {" "}
          Thêm
        </button>
      </div>
      <div className="card">
        <DataTable
          value={categories}
          paginator
          rows={5}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column
            field="categoryId"
            header="ID"
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="categoryName"
            header="Name"
            style={{ width: "25%" }}
          ></Column>
          <Column
            header="Action"
            body={(rowData) => (
              <>
                <Button className="p-button-success">update</Button>
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
