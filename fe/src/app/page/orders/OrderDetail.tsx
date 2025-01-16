import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { OrderService } from "../../service/OrderService";
import { OrderItemModel } from "../../model/OrderItemModel";
import { OrderModel } from "../../model/OrderModel";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";

export default function OrderDetail(props: any) {
  const location = useLocation();
  const { order } = location.state as { order: any };
  const [model, setModel] = useState<OrderModel>(order);
  const [orderItems, setOrderItems] = useState<OrderItemModel[]>([]);

  useEffect(() => {
    OrderService.getInstance()
      .getListOrderItems(model.orderId)
      .then((res) => {
        setOrderItems(res.data.responseData);
        // console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [model]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const updateOrderStatus = (newStatus: string) => {   
    OrderService.getInstance()
      .updateOrderStatus(model.orderId, newStatus) // Thứ tự đúng: orderId, newStatus
      .then((res) => {
        if(res.data.status){
          console.log("Cập nhật trạng thái thành công", res);
          setModel(res.data.responseData);
          alert("Trạng thái đã được cập nhật!");
        }
        else {
          setModel(res.data.responseData);
          alert("Đơn hàng đã bị hủy lúc!" + res.data.responseData.updatedDate);
        }
          
        
      })
      .catch((err) => {
        console.error("Lỗi khi cập nhật trạng thái:", err);
        alert("Cập nhật trạng thái thất bại!");
      });
  };

  const handleConfirmStatus = () => {
    let nextStatus = "";
    switch (model.status) {
      case "1":
        nextStatus = "2";
        break;
      case "2":
        nextStatus = "3";
        break;
      case "3":
        nextStatus = "4";
        break;
      case "4":
        nextStatus = "5";
        break;
      case "5":
        nextStatus = "6";
        break;
      default:
        alert("Không thể thay đổi trạng thái!");
        return;
    }
    updateOrderStatus(nextStatus);
  };

  const handleCancel = () => {
    if (window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?")) {
      updateOrderStatus("-1");
    }
  };

  const StatusProgressBar = ({ status }: { status: string }) => {
    const steps = [
      { label: "Chờ xác nhận", code: "2" },
      { label: "Đang chuẩn bị hàng", code: "3" },
      { label: "Đang giao hàng", code: "4" },
      { label: "Giao hàng thành công", code: "5" },
      { label: "Hoàn thành", code: "6" },
    ];

    // Xác định currentIndex
    const currentIndex = steps.findIndex(
      (step) => step.code === String(status)
    );

    if (currentIndex === -1) {
      console.error("Status không hợp lệ:", status);
      return (
        <div           
            className={`status-step active`}
          >
            <div className="cancel-icon">Đã hủy</div>
            <div className="status-label">{model.updatedDate}</div>
          </div>
      )
    }

    return (
      <div className="status-progress-bar">
        {steps.map((step, index) => (
          <div
            key={step.code}
            className={`status-step ${index <= currentIndex ? "active" : ""}`}
          >
            <div className="status-icon">{index + 1}</div>
            <div className="status-label">{step.label}</div>
          </div>
        ))}
      </div>
    );
  };
  console.log(model);
  return (
    <>
      <div>
        <h4>Theo dõi đơn hàng</h4>
        <StatusProgressBar status={model.status} />
        <div style={{ margin: "20px 0" }}>
          {model.status !== "6" && model.status !== "-1" && (
            <>
              <Button
                label="Hủy"
                icon="pi pi-times"
                className="p-button-danger"
                onClick={handleCancel}
                style={{ marginRight: "10px" }}
              />
              <Button
                label="Xác nhận"
                icon="pi pi-check"
                className="p-button-success"
                onClick={handleConfirmStatus}
              />
            </>
          )}
        </div>
        <h4>Thông tin hóa đơn: {model.orderId}</h4>
        <p>nguoi tao: {order.user.fullName}</p>
        <p>So dien thoai : {order.user.phoneNumber}</p>
        <p>Ngay tao: {order.createdDate}</p>
        <p></p>
        <h4>Thông tin sản phẩm</h4>
        <div className="card">
          <DataTable value={orderItems} tableStyle={{ minWidth: "50rem" }}>
            <Column
              header="STT"
              body={(rowData, options) => options.rowIndex + 1}
            ></Column>
            <Column field="orderId" header="Mã Sản phẩm"></Column>
            <Column field="quantity" header="Số lượng"></Column>
            <Column
              field="unitPrice"
              header="Đơn giá"
              body={(rowData) =>
                rowData.discountPrice && rowData.discountPrice > 0
                  ? formatCurrency(rowData.discountPrice)
                  : formatCurrency(rowData.unitPrice)
              }
            />
            <Column
              field="totalPrice"
              header="Tổng tiền"
              body={(rowData) => formatCurrency(rowData.totalPrice)}
            ></Column>
          </DataTable>
        </div>
      </div>
    </>
  );
}
