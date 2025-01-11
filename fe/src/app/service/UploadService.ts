import axios from "axios";
import { LoginRequest } from "../model/LoginRequest";
import { RegisterRequest } from "../model/RegisterRequest";
import { HeadersUtil } from "../util/headersUtil";
import { CategoryModel } from "../model/CategoryModel";

export class UploadService {  
  private static _uploadService: UploadService;

  public static getInstance(): UploadService {
    if (!UploadService._uploadService) {
      UploadService._uploadService = new UploadService();
    }
    return UploadService._uploadService;
  }

//   public login(request: LoginRequest){
//     const url = process.env.REACT_APP_AUTH_URL + "/login";
//     return axios.post(url, request);
//   }

//   public register(request: RegisterRequest){
//     const url = process.env.REACT_APP_AUTH_URL + "/register";
//     return axios.post(url, request);
//   }
//   public getListCategory(){
//     const url = process.env.REACT_APP_API_URL + "/category/get-all";
//     return axios.get(url,{
//       headers: HeadersUtil.getHeadersAuth(),
//     });
//   }
//   public addCategory(request: CategoryModel){
//     const url = process.env.REACT_APP_API_URL + "/category/add";
//     return axios.post(url , request,{
//       headers: HeadersUtil.getHeadersAuth(),
//     });
//   }
  public uploadImage(formData: any){
    const url = process.env.REACT_APP_API_URL + "/upload/image";
    return axios.post(url , formData,{
        headers: {
            ...HeadersUtil.getHeadersAuth(),
            "Content-Type": "multipart/form-data",
          },
    });
  }
  
}
