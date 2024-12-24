export class ProductDetailModel {
  productDetailId: string;
  productId: string;
  corlorId: number;
  sizeId: number;
  quantity: number;
  description: string;
  imageUrl: string;
  constructor(
    productDetailId: string,
    productId: string,
    corlorId: number,
    sizeId: number,
    quantity: number,
    description: string,
    imageUrl: string
  ) {
    this.productDetailId = productDetailId;
    this.productId = productId;
    this.corlorId = corlorId;
    this.sizeId = sizeId;
    this.quantity = quantity;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  static fromJSON(productDetailModelObject: any): ProductDetailModel | null {
    let productDetailModel: ProductDetailModel | null = null;
    if (productDetailModelObject) {
      productDetailModel = new ProductDetailModel("", "", 0, 0, 0, "", "");
      productDetailModel.productDetailId =
        productDetailModelObject.productDetailId
          ? productDetailModelObject.productDetailId
          : "";
      productDetailModel.productId = productDetailModelObject.productId
        ? productDetailModelObject.productId
        : "";
      productDetailModel.corlorId = productDetailModelObject.corlorId
        ? productDetailModelObject.corlorId
        : 0;
      productDetailModel.sizeId = productDetailModelObject.sizeId
        ? productDetailModelObject.sizeId
        : 0;
      productDetailModel.quantity = productDetailModelObject.quantity
        ? productDetailModelObject.quantity
        : 0;
      productDetailModel.description = productDetailModelObject.description
        ? productDetailModelObject.description
        : "";
      productDetailModel.imageUrl = productDetailModelObject.imageUrl
        ? productDetailModelObject.imageUrl
        : "";
    }
    return productDetailModel;
  }
}
