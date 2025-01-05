import { CategoryModel } from "./CategoryModel";

export class ProductModel {
  productId: string;
  productName: string;
  description: string;
  categoryId: string;
  discountPrice: number;
  unitPrice: number;
  discount: boolean;
  special: boolean;
  materialId: number;
  brandId: number;
  weight: number;
  createdDate: string;
  createdBy: string;
  updatedDate: string;
  updatedBy: string;
  thumbnail: string;
  constructor(productId : string, productName : string, description : string, categoryId : string, discountPrice : number, unitPrice : number, isDiscount : boolean, isSpecial : boolean, materialId : number, brandId : number, weight : number, createdDate : string, createdBy : string, updatedDate : string, updatedBy : string, thumbnail : string) {
    this.productId = productId;
this.productName = productName;
this.description = description;
this.categoryId = categoryId;
this.discountPrice = discountPrice;
this.unitPrice = unitPrice;
this.discount = isDiscount;
this.special = isSpecial;
this.materialId = materialId;
this.brandId = brandId;
this.weight = weight;
this.createdDate = createdDate;
this.createdBy = createdBy;
this.updatedDate = updatedDate;
this.updatedBy = updatedBy;
this.thumbnail = thumbnail;
    }; 

    static fromJSON(productModelObject : any) : ProductModel | null{ 
      let productModel : ProductModel | null = null;
      if(productModelObject){ 
        productModel = new ProductModel("","","","",0,0,false,false,0,0,0,"","","","","");
        productModel.productId = productModelObject.productId ?  productModelObject.productId : "" ; 
productModel.productName = productModelObject.productName ?  productModelObject.productName : "" ; 
productModel.description = productModelObject.description ?  productModelObject.description : "" ; 
productModel.categoryId = productModelObject.categoryId ?  productModelObject.categoryId : "" ; 
productModel.discountPrice = productModelObject.discountPrice ?  productModelObject.discountPrice : 0 ; 
productModel.unitPrice = productModelObject.unitPrice ?  productModelObject.unitPrice : 0 ; 
productModel.discount = productModelObject.isDiscount ?  productModelObject.isDiscount : false ; 
productModel.special = productModelObject.isSpecial ?  productModelObject.isSpecial : false ; 
productModel.materialId = productModelObject.materialId ?  productModelObject.materialId : 0 ; 
productModel.brandId = productModelObject.brandId ?  productModelObject.brandId : 0 ; 
productModel.weight = productModelObject.weight ?  productModelObject.weight : 0 ; 
productModel.createdDate = productModelObject.createdDate ?  productModelObject.createdDate : "" ; 
productModel.createdBy = productModelObject.createdBy ?  productModelObject.createdBy : "" ; 
productModel.updatedDate = productModelObject.updatedDate ?  productModelObject.updatedDate : "" ; 
productModel.updatedBy = productModelObject.updatedBy ?  productModelObject.updatedBy : "" ; 
productModel.thumbnail = productModelObject.thumbnail ?  productModelObject.thumbnail : "" ; 
      }
      return productModel ;
    } 
}
