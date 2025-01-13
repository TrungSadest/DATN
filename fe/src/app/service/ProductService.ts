import axios from "axios";
import { HeadersUtil } from "../util/headersUtil";
import { ProductModel } from "../model/ProductModel";

export class ProductService {
    private static _productService: ProductService;

    public static getInstance(): ProductService {
        if (!ProductService._productService) {
            ProductService._productService = new ProductService();
        }
        return ProductService._productService;
    }

    public getListBrand(){
        const url = process.env.REACT_APP_API_URL + "/brand/get-all";
        return axios.get(url,{
          headers: HeadersUtil.getHeadersAuth(),
        });
    }

    public getListProduct(){
        const url = process.env.REACT_APP_API_URL + "/product/get-all";
        return axios.get(url,{
          headers: HeadersUtil.getHeadersAuth(),
        });
    }

    public addProduct(request: ProductModel){
        const url = process.env.REACT_APP_API_URL + "/product/add";
        return axios.post(url , request,{
          headers: HeadersUtil.getHeadersAuth(),
        });
      }
      public updateProduct(request: ProductModel){
        const url = process.env.REACT_APP_API_URL + "/product/update";
        return axios.put(url , request,{
          headers: HeadersUtil.getHeadersAuth(),
        });
      }
      public getListProductDetail(props: String) {
        const url = `${process.env.REACT_APP_API_URL}/product-detail/get-by/${props}`;
        return axios.get(url, {
            headers: HeadersUtil.getHeadersAuth(),
        });
    }
    
}