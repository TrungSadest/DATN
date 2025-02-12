export class CartItemModel {
  cartId: string;
  userId: string;
  productDetailId: string;
  quantity: number;
  createdDate: string;
  createdBy: string;
  updatedDate: string;
  updatedBy: string;
  constructor(
    cartId: string,
    userId: string,
    productDetailId: string,
    quantity: number,
    createdDate: string,
    createdBy: string,
    updatedDate: string,
    updatedBy: string
  ) {
    this.cartId = cartId;
    this.userId = userId;
    this.productDetailId = productDetailId;
    this.quantity = quantity;
    this.createdDate = createdDate;
    this.createdBy = createdBy;
    this.updatedDate = updatedDate;
    this.updatedBy = updatedBy;
  }

  static fromJSON(cartItemModelObject: any): CartItemModel | null {
    let cartItemModel: CartItemModel | null = null;
    if (cartItemModelObject) {
      cartItemModel = new CartItemModel("", "", "", 0, "", "", "", "");
      cartItemModel.cartId = cartItemModelObject.cartId
        ? cartItemModelObject.cartId
        : "";
      cartItemModel.userId = cartItemModelObject.userId
        ? cartItemModelObject.userId
        : "";
      cartItemModel.productDetailId = cartItemModelObject.productDetailId
        ? cartItemModelObject.productDetailId
        : "";
      cartItemModel.quantity = cartItemModelObject.quantity
        ? cartItemModelObject.quantity
        : 0;
      cartItemModel.createdDate = cartItemModelObject.createdDate
        ? cartItemModelObject.createdDate
        : "";
      cartItemModel.createdBy = cartItemModelObject.createdBy
        ? cartItemModelObject.createdBy
        : "";
      cartItemModel.updatedDate = cartItemModelObject.updatedDate
        ? cartItemModelObject.updatedDate
        : "";
      cartItemModel.updatedBy = cartItemModelObject.updatedBy
        ? cartItemModelObject.updatedBy
        : "";
    }
    return cartItemModel;
  }
}
