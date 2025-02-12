export class RegisterRequest {
  username: string;
  password: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  address: string;

  constructor(
    username: string,
    password: string,
    email: string,
    fullName: string,
    phoneNumber: string,
    address: string
  ) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
    this.address = address;
  }

  static fromJSON(registerRequestObject: any): RegisterRequest | null {
    let registerRequest: RegisterRequest | null = null;
    if (registerRequestObject) {
      registerRequest = new RegisterRequest("", "", "", "", "", "");
      registerRequest.username = registerRequestObject.username
        ? registerRequestObject.username
        : "";
      registerRequest.password = registerRequestObject.password
        ? registerRequestObject.password
        : "";
      registerRequest.email = registerRequestObject.email
        ? registerRequestObject.email
        : "";
      registerRequest.fullName = registerRequestObject.fullName
        ? registerRequestObject.fullName
        : "";
      registerRequest.phoneNumber = registerRequestObject.phoneNumber
        ? registerRequestObject.phoneNumber
        : "";
      registerRequest.address = registerRequestObject.address
        ? registerRequestObject.address
        : "";
    }
    return registerRequest;
  }
}
