import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";

import { Tag } from "primereact/tag";
import { OrderService } from "../../service/OrderService";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const Order: React.FC = () => {
  const navigate = useNavigate();
  const [model, setModel] = useState<[]>([]);
  useEffect(() => {
    OrderService.getInstance()
      .getListOrder()
      .then((res) => {
        setModel(res.data.responseData);
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const getStatus = (order: any) => {
    switch (order.status) {
      case "1":
        return "Đã thanh toán";
      case "2":
        return "Chờ xác nhận";
      case "-1":
        return "Đã hủy";
      default:
        return null;
    }
  };

  const getSeverity = (order: any) => {
    switch (order.status) {
      case "1":
        return "success";
      case "2":
        return "info";

      case "-1":
        return "danger";
      default:
        return null;
    }
  };

  const statusBodyTemplate = (order: any) => {
    return <Tag value={getStatus(order)} severity={getSeverity(order)}></Tag>;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const viewDetail = (order: any) => {
    navigate("detail", { state: { order } });
  };
  return (
    <>
      <h3>Hóa đơn</h3>
      <div className="card">
        <DataTable value={model} tableStyle={{ minWidth: "50rem" }}>
          <Column field="orderId" header="Mã hóa đơn"></Column>
          <Column field="user.fullName" header="Khách hàng"></Column>
          <Column field="user.phoneNumber" header="SDT"></Column>
          <Column field="createdDate" header="Ngày tạo"></Column>
          <Column header="Trạng thái" body={statusBodyTemplate}></Column>
          <Column
            field="totalPrice"
            header="Tổng tiền"
            body={(rowData) => formatCurrency(rowData.totalPrice)}
          ></Column>
          <Column
            header="Action"
            body={(rowData) => (
              <>
                <div className="d-flex ">
                  <Button className="p-button-success" onClick={() => {viewDetail(rowData)}}>
                    <i className="bi bi-info-circle"></i>
                  </Button>
                </div>
              </>
            )}
          ></Column>
        </DataTable>
      </div>
    </>
  );
};
export default Order;
