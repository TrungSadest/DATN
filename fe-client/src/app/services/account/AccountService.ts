import axios from 'axios';
import { ApiUrlUtil } from '../../utils/apiUrlUtil';
import { HeadersUtil } from '../../utils/headersUtil';
import { SearchModel } from '../../model/SearchModel';
import { ParamUtil } from '../../utils/paramUtil';

export class AccountService {
  private static _accountservice: AccountService;

  public static getInstance(): AccountService {
    if (!AccountService._accountservice) {
      AccountService._accountservice = new AccountService();
    }
    return AccountService._accountservice;
  }

  public getAllAccount(search: SearchModel) {
    const param = ParamUtil.toRequestParams(search);
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + '/account/get-all', param);
    return axios.get(url, {
      headers: HeadersUtil.getHeadersAuth(),
    });
  }
}
