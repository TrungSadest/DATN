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
  const [visible1, setVisible1] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [model, setModel] = useState(new CategoryModel("", "", true));
  const [error, setError] = useState("");
  useEffect(() => {
    AuthService.getInstance()
      .getListCategory()
      .then((res) => {
        setCategories(res.data.responseData);
      })
      .catch((e) => {
        console.log(e);
      });
    setError("");
  }, [visible]);
  const changeInput = (data: any) => {
    const value = data.target.value;
    const name = data.target.name;
    setModel({
      ...model,
      [name]: value,
    });
  };
  const selectCategory = (data: any) => {
    setModel(data);
    setVisible1(true);
  };
  const validateInput = () => {
    if (!model.categoryName.trim()) {
      setError("Tên danh mục không được để trống.");
      return false;
    }
    return true;
  };

  const add = () => {
    if (validateInput()) {
      AuthService.getInstance()
        .addCategory(model)
        .then((res) => {
          if (res.data.status) {
            toast.success("Thêm thành công");
            setModel(new CategoryModel("", "", true));
          } else {
            toast.error("Danh mục đã tồn tại");
          }
        })
        .catch((e) => {
          console.log(e);
        });
      setVisible(false);
    }
  };
  const update = () => {
    if (validateInput()) {
      AuthService.getInstance()
        .updateupdateCategory(model)
        .then((res) => {
          if (res.data.status) {
            toast.success("Cập nhật thành công");
            setModel(new CategoryModel("", "", true));
          } else {
            toast.error("Danh mục đã tồn tại");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
    setVisible1(false);
  };

  return (
    <>
      <Dialog
        header="Thêm danh mục"
        visible={visible}
        style={{ width: "25vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <form onSubmit={add}>
          <div className="form-group">
            <label htmlFor="categoryName">Tên danh mục</label>
            <input
              onChange={changeInput}
              type="text"
              name="categoryName"
              className={`form-control ${error ? "is-invalid" : ""} mb-2`}
              id="categoryName"
              value={model.categoryName}
            />
            {error && <div className="invalid-feedback">{error}</div>}
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">
              Thêm
            </button>
          </div>
        </form>
      </Dialog>
      <Dialog
        header="Cập nhật"
        visible={visible1}
        style={{ width: "25vw" }}
        onHide={() => {
          if (!visible1) return;
          setVisible1(false);
        }}
      >
        <form onSubmit={update}>
          <div className="form-group">
            <label htmlFor="categoryName">Tên danh mục</label>
            <input
              onChange={changeInput}
              type="text"
              name="categoryName"
              className={`form-control ${error ? "is-invalid" : ""} mb-2`}
              id="categoryName"
              value={model.categoryName}
            />
            {error && <div className="invalid-feedback">{error}</div>}
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">
              Cập nhật
            </button>
          </div>
        </form>
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
                <Button
                  className="p-button-success"
                  onClick={() => {
                    selectCategory(rowData);
                  }}
                >
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
