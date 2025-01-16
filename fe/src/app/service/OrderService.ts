import axios from "axios";
import { HeadersUtil } from "../util/headersUtil";

export class OrderService {
    private static _orderService: OrderService;

    public static getInstance(): OrderService {
        if (!OrderService._orderService) {
            OrderService._orderService = new OrderService();
        }
        return OrderService._orderService;
    }
    public getListOrder(){
        const url = process.env.REACT_APP_API_URL + "/order/get-all";
        return axios.get(url,{
          headers: HeadersUtil.getHeadersAuth(),
        });
    }
    public getListOrderItems(props: String) {
        const url = `${process.env.REACT_APP_API_URL}/order/get-order-by/${props}`;
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth(),
        });
    }
    public updateOrderStatus(orderId: string, status: string) {
        const url = `${process.env.REACT_APP_API_URL}/order/${orderId}/status`; // Cập nhật URL cho đúng
    
        // Gửi PUT request với body chứa trạng thái mới
        return axios.put(
            url,
            { status }, // Truyền status trong body request
            {
                headers: HeadersUtil.getHeadersAuth(), // Đảm bảo gửi tiêu đề auth nếu cần
            }
        );
    }
}