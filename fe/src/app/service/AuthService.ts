import axios from "axios";
import { LoginRequest } from "../model/LoginRequest";

export class AuthService {
  private static _authService: AuthService;

  public static getInstance(): AuthService {
    if (!AuthService._authService) {
      AuthService._authService = new AuthService();
    }
    return AuthService._authService;
  }

  public static login(request: LoginRequest){
    const url = process.env.REACT_APP_AUTH_URL + "/login";
    return axios.post(url, request);
  }
}
