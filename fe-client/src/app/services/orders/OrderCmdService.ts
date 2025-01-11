import axios from 'axios';
import { ApiUrlUtil } from '../../utils/apiUrlUtil';
import { HeadersUtil } from '../../utils/headersUtil';
import { ParamUtil, RequestParam } from '../../utils/paramUtil';

export class OrderCmdService {
  private static _orderCmdService: OrderCmdService;

  public static getInstance(): OrderCmdService {
    if (!OrderCmdService._orderCmdService) {
      OrderCmdService._orderCmdService = new OrderCmdService();
    }
    return OrderCmdService._orderCmdService;
  }

  public searchOrderCmdList(request: any) {
    const params: RequestParam[] = ParamUtil.toRequestParams(request);
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + '/order/cmd/searchOrderCmdList.do', params);
    return axios.get(url, {
      headers: HeadersUtil.getHeadersAuth(),
    });
  }

  public getOrderCmdDetail(request: any) {
    const params: RequestParam[] = ParamUtil.toRequestParams(request);
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + '/order/cmd/getOrderCmdDetail.do', params);
    return axios.get(url, {
      headers: HeadersUtil.getHeadersAuth(),
    });
  }

  public insert(request: any) {
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/order/cmd/insert.do");
    return axios.post(url, request, {
      headers: HeadersUtil.getHeadersAuth()
    })
  }

  public handleRequest(request: any) {
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/order/cmd/handleRequest.do");
    return axios.post(url, request, {
      headers: HeadersUtil.getHeadersAuth()
    })
  }

  public getCommandExchangeData(request: any) {
    const params: RequestParam[] = ParamUtil.toRequestParams(request);
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + '/order/cmd/getCommandExchangeData.do', params);
    return axios.get(url, {
      headers: HeadersUtil.getHeadersAuth(),
    });
  }

  public handleExchangeRequest(request: any) {
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/order/cmd/handleExchangeRequest.do");
    return axios.post(url, request, {
      headers: HeadersUtil.getHeadersAuth()
    })
  }

  public handleMultiRequest(request: any) {
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/order/cmd/handleMultiRequest.do");
    return axios.post(url, request, {
      headers: HeadersUtil.getHeadersAuth()
    })
  }

  public getCalculateShippingCosts(request: any, userUid: string) {
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + "/setts/shipping/costs/calculate-shipping-costs-user?userUid=" + userUid);
    return axios.post(url, request, {
      headers: HeadersUtil.getHeadersAuth()
    })
  }
}
