import axios from 'axios';
import { ApiUrlUtil } from '../utils/apiUrlUtil';
import { UserRoleModel } from '../model/UserRoleModel';
import { CategoryModel } from '../model/CategoryModel';

export class PublicService {
  private static _publicService: PublicService;
  private static _domain = process.env.REACT_APP_API_URL + '/public';

  public static getInstance(): PublicService {
    if (!PublicService._publicService) {
      PublicService._publicService = new PublicService();
    }
    return PublicService._publicService;
  }

  public getVerifyCode(email: string) {
    const param = [{ name: 'email', value: email }]
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + '/public/get-verify-code', param);
    return axios.get(url);
  }

  public verifyEmail(email: string, verificationKey: string) {
    const param = [{ name: 'email', value: email }, { name: 'verifyCode', value: verificationKey }];
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + '/public/verify-email', param);
    return axios.get(url);
  }

  public getCommCode(upCommCd: string) {
    const param = [{ name: 'upCommCd', value: upCommCd }]
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + '/public/get-comm-code', param);
    return axios.get(url);
  }

  public insertUserRole(userRole: UserRoleModel) {
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + '/public/insert-user-role');
    return axios.post(url, userRole);
  }
  public getListProduct() {
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + '/public/product/get-all');
    return axios.get(url);
  }
  public getListCategory() {
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + '/public/category/get-all');
    return axios.get(url);
  }
  public getListBrand() {
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + '/public/brand/get-all');
    return axios.get(url);
  }
  public getListProductByCategory() {
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + '/public/product/get-by-category');
    return axios.get(url);
  }
  public getListProductByBrand() {
    const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + '/public/product/get-by-brand');
    return axios.get(url);
  }
}
