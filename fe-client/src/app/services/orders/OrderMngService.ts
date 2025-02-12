import axios from 'axios';
import { ApiUrlUtil } from '../../utils/apiUrlUtil';
import { HeadersUtil } from '../../utils/headersUtil';
import { ParamUtil, RequestParam } from '../../utils/paramUtil';

export class OrderMngService {
  private static _orderMngService: OrderMngService;

  public static getInstance(): OrderMngService {
    if (!OrderMngService._orderMngService) {
      OrderMngService._orderMngService = new OrderMngService();
    }
    return OrderMngService._orderMngService;
  }

  public searchOrderList(request: any) {
    const params: RequestParam[] = ParamUtil.toRequestParams(request);
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + '/order/mng/searchOrderList.do', params);
    return axios.get(url, {
      headers: HeadersUtil.getHeadersAuth(),
    });
  }

  public getDataSaleInquiry(request: any) {
    const params: RequestParam[] = ParamUtil.toRequestParams(request);
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + '/order/mng/getDataSaleInquiry.do', params);
    return axios.get(url, {
      headers: HeadersUtil.getHeadersAuth(),
    });
  }

  public exportExcel(request: any) {
    const params: RequestParam[] = ParamUtil.toRequestParams(request);
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + '/order/mng/exportExcel', params);
    return axios.get(url, {
      responseType: 'blob',
      headers: HeadersUtil.getHeadersAuth(),
    });
  }

  public getOrderDetail(request: any) {
    const params: RequestParam[] = ParamUtil.toRequestParams(request);
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + '/order/mng/getOrderDetail.do', params);
    return axios.get(url, {
      headers: HeadersUtil.getHeadersAuth(),
    });
  }

  public getOrderItemList(request: any) {
    const params: RequestParam[] = ParamUtil.toRequestParams(request);
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + '/order/mng/getOrderItemList.do', params);
    return axios.get(url, {
      headers: HeadersUtil.getHeadersAuth(),
    });
  }

  public update(request: any) {
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + '/order/mng/update.do');
    return axios.post(url, request, {
      headers: HeadersUtil.getHeadersAuth(),
    });
  }

  public updateOrderProcess(request: any) {
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + '/order/mng/updateOrderProcess.do');
    return axios.post(url, request, {
      headers: HeadersUtil.getHeadersAuth(),
    });
  }

  public printInvoice(request: any) {
    const params: RequestParam[] = ParamUtil.toRequestParams(request);
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + '/order/mng/printInvoice.do', params);
    return axios.get(url, {
      headers: HeadersUtil.getHeadersAuth(),
    });
  }

  public updatePaymentStatus(request: any) {
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + '/order/mng/update-payment-status');
    return axios.post(url, request, {
      headers: HeadersUtil.getHeadersAuth(),
    });
  }

  public insertOrder(request: any) {
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + '/order/mng/insert.do');
    return axios.post(url, request, {
      headers: HeadersUtil.getHeadersAuth(),
    });
  }

  public getOrderHis(request: any) {
    const params: RequestParam[] = ParamUtil.toRequestParams(request);
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + '/order/mng/getOrderHis', params);
    return axios.get(url, {
      headers: HeadersUtil.getHeadersAuth(),
    });
  }
}
