import axios from "axios";
import { LoginRequest } from "../model/LoginRequest";
import { RegisterRequest } from "../model/RegisterRequest";
import { HeadersUtil } from "../util/headersUtil";
import { CategoryModel } from "../model/CategoryModel";

export class AuthService {  
  private static _authService: AuthService;

  public static getInstance(): AuthService {
    if (!AuthService._authService) {
      AuthService._authService = new AuthService();
    }
    return AuthService._authService;
  }

  public login(request: LoginRequest){
    const url = process.env.REACT_APP_AUTH_URL + "/login";
    return axios.post(url, request);
  }

  public register(request: RegisterRequest){
    const url = process.env.REACT_APP_AUTH_URL + "/register";
    return axios.post(url, request);
  }
  public getListCategory(){
    const url = process.env.REACT_APP_API_URL + "/category/get-all";
    return axios.get(url,{
      headers: HeadersUtil.getHeadersAuth(),
    });
  }
  public addCategory(request: CategoryModel){
    const url = process.env.REACT_APP_API_URL + "/category/add";
    return axios.post(url , request,{
      headers: HeadersUtil.getHeadersAuth(),
    });
  }
  
}
