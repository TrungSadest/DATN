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
}