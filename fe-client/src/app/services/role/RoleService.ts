import axios from 'axios';
import { ApiUrlUtil } from '../../utils/apiUrlUtil';
import { HeadersUtil } from '../../utils/headersUtil';
import { ParamUtil, RequestParam } from '../../utils/paramUtil';
import { LoginReq } from '../../model/LoginReq';
import { SignUpReq } from '../../model/SignUpReq';

export class RoleService {
  private static _roleService: RoleService;

  public static getInstance(): RoleService {
    if (!RoleService._roleService) {
      RoleService._roleService = new RoleService();
    }
    return RoleService._roleService;
  }

  // public login(request: LoginReq) {
  //   const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_AUTH_URL + '/login');
  //   return axios.post(url, request);
  // }

  // public register(request: SignUpReq) {
  //   const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_AUTH_URL + '/register');
  //   return axios.post(url, request);
  // }

  public getAllRoles() {
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + '/role/get-all');
    return axios.get(url, {
      headers: HeadersUtil.getHeadersAuth(),
    });
  }
}
