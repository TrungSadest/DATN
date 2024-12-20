import { CategoryModel } from "./CategoryModel";

export class ProductModel {
  productId: string;
  productName: string;
  description: string;
  categoryId: string;
  discountPrice: number;
  unitPrice: number;
  materialId: number;
  brandId: number;
  weight: number;
  thumbnail: string;
  constructor(
    productId: string,
    productName: string,
    description: string,
    categoryId: string,
    discountPrice: number,
    unitPrice: number,
    materialId: number,
    brandId: number,
    weight: number,
    thumbnail: string
  ) {
    this.productId = productId;
    this.productName = productName;
    this.description = description;
    this.categoryId = categoryId;
    this.discountPrice = discountPrice;
    this.unitPrice = unitPrice;
    this.materialId = materialId;
    this.brandId = brandId;
    this.weight = weight;
    this.thumbnail = thumbnail;
  }

  static fromJSON(productModelObject: any): ProductModel | null {
    let productModel: ProductModel | null = null;
    if (productModelObject) {
      productModel = new ProductModel("", "", "", "", 0, 0, 0, 0, 0, "");
      productModel.productId = productModelObject.productId
        ? productModelObject.productId
        : "";
      productModel.productName = productModelObject.productName
        ? productModelObject.productName
        : "";
      productModel.description = productModelObject.description
        ? productModelObject.description
        : "";
      productModel.categoryId = productModelObject.categoryId
        ? productModelObject.categoryId
        : "";
      productModel.discountPrice = productModelObject.discountPrice
        ? productModelObject.discountPrice
        : 0;
      productModel.unitPrice = productModelObject.unitPrice
        ? productModelObject.unitPrice
        : 0;
      productModel.materialId = productModelObject.materialId
        ? productModelObject.materialId
        : 0;
      productModel.brandId = productModelObject.brandId
        ? productModelObject.brandId
        : 0;
      productModel.weight = productModelObject.weight
        ? productModelObject.weight
        : 0;
      productModel.thumbnail = productModelObject.thumbnail
        ? productModelObject.thumbnail
        : "";
    }
    return productModel;
  }
}
