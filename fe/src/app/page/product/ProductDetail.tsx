import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { generateImageUrl } from '../../util/imageUtil';
import { Button } from 'primereact/button';
import { ProductDetailModel } from '../../model/ProductDetailModel';
import { ProductService } from '../../service/ProductService';
import { Dialog } from 'primereact/dialog';
import AddProductDetail from './AddProductDetail';
import { toast } from 'react-toastify';

const ProductDetail: React.FC = () => {
    const location = useLocation();
    const state = location.state as { id: string , name: string};
    const [openAdd, setOpenAdd] = useState(false);
    const [closeAdd, setCloseAdd] = useState();
    const [model, setModel] = useState<ProductDetailModel[]>([]);
    const [productDetail, setProductDetail] = useState<ProductDetailModel>();
    const navigate = useNavigate();
    const handleClose = (data?: any) => {
      setOpenAdd(false);
      if (data) {
        // Thực hiện việc tiếp
      }
    };
    useEffect(() => {
        ProductService.getInstance()
          .getListProductDetail(state.id)
          .then((res) => {
            setModel(res.data.responseData);
            console.log(res);
          })
          .catch((e) => {
            console.log(e);
          });
      }, [openAdd]);

    const handleNavigate = () => {
        navigate("/product");
    };

    const handleSave = (data: any) => {
      const newProductDetail = { ...data, productId: state.id };
      setProductDetail(newProductDetail);   
        ProductService.getInstance()
          .addProductDetail(newProductDetail)
          .then((res) => {
            console.log(res);
            toast.success("Thêm sản phẩm thành công");
            setOpenAdd(false);
          })
          .catch((e) => {
            console.log(e);
          });
        console.log(data);
      };
  return (
    <>
    <Dialog
            header="Thêm sản phẩm chi tiết"
            visible={openAdd}
            style={{ width: "80vw" }}
            onHide={() => {
              if (!openAdd) return;
              setOpenAdd(false);
            }}
          >
            <AddProductDetail onSave={handleSave} onClose={handleClose} />
          </Dialog>
    <div className="d-flex justify-content-between mb-3">
        <h2>Sản phẩm chi tiết</h2>
        <h2>{state.name}</h2>
        <div className="">
        <button
          className="btn btn-primary"
          onClick={() => {
            handleNavigate()
          }}
        >
          {" "}
          Quay lại
        </button><button
          className="btn btn-primary"
          onClick={() => {
            setOpenAdd(true);
          }}
        >
          {" "}
          Thêm
        </button>
        </div>      
      </div>
      <div className="card">
              <DataTable
                value={model}
                paginator
                rows={5}
                tableStyle={{ minWidth: "50rem" }}
              >
                <Column
                  header="STT"
                  body={(rowData, options) => options.rowIndex + 1}
                ></Column>
                <Column
                  field="imageUrl"
                  header="Ảnh"
                  style={{ width: "25%" }}
                  body={(rowData, options) => (
                    <img
                      style={{ width: "70px" }}
                      src={generateImageUrl(rowData.imageUrl ?? "")}
                      alt=""
                    />
                  )}
                ></Column>
                <Column
                  field="color.colorName"
                  header="Màu sắc"
                  style={{ width: "25%" }}
                ></Column>
                <Column
                  field="size.sizeName"
                  header="Kích thước"
                  style={{ width: "25%" }}
                ></Column>
                <Column
                  field="quantity"
                  header="Số lượng"
                  style={{ width: "25%" }}
                ></Column>
                <Column
                  header="Action"
                  body={(rowData) => (
                    <>
                      <div className="d-flex ">
                      <Button
                        className="p-button-success"
                        onClick={() => {
                          
                        }}
                      >
                        <i className="bi bi-info-circle"></i>
                      </Button>
                      <Button
                        className="p-button-success"
                        onClick={() => {
                          
                        }}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </Button>
                      </div>
                    </>
                  )}
                  style={{ width: "25%" }}
                ></Column>
              </DataTable>
            </div>
    </>
  );
};
export default ProductDetail;
