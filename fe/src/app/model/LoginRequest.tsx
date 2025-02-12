export class LoginRequest {
  username: string;
  password: string;
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  static fromJSON(loginRequestObject: any): LoginRequest | null {
    let loginRequest: LoginRequest | null = null;
    if (loginRequestObject) {
      loginRequest = new LoginRequest("", "");
      loginRequest.username = loginRequestObject.username
        ? loginRequestObject.username
        : "";
      loginRequest.password = loginRequestObject.password
        ? loginRequestObject.password
        : "";
    }
    return loginRequest;
  }
}
