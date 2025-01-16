import axios from 'axios';
import { ApiUrlUtil } from '../../utils/apiUrlUtil';
import { HeadersUtil } from '../../utils/headersUtil';
import { ParamUtil, RequestParam } from '../../utils/paramUtil';
import { LoginReq } from '../../model/LoginReq';
import { SignUpReq } from '../../model/SignUpReq';

export class AuthService {
  private static _authService: AuthService;

  public static getInstance(): AuthService {
    if (!AuthService._authService) {
      AuthService._authService = new AuthService();
    }
    return AuthService._authService;
  }

  public login(request: LoginReq) {
    const url = process.env.REACT_APP_AUTH_URL + "/login";
    return axios.post(url, request);
  }

  public register(request: SignUpReq) {
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_AUTH_URL + '/register');
    return axios.post(url, request);
  }

  public verifyAccount(verifyKey: string) {
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_AUTH_URL + `/verify-account?verifyKey=${verifyKey}`);
    return axios.get(url);
  }
}
